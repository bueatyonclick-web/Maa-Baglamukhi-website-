from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import requests

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

mongo_url = os.environ.get("MONGO_URL")
db_name = os.environ.get("DB_NAME")

client = None
db = None

# If MongoDB isn't configured/running, fall back to an in-memory store so the app can still run locally.
_memory = {
    "bookings": [],
    "donations": [],
    "prayer_requests": [],
    "contacts": [],
    "newsletter": [],
    "diyas": [],
    "chat_messages": [],
}

if mongo_url and db_name:
    try:
        client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=2000)
        db = client[db_name]
    except Exception as e:
        logger.warning(f"MongoDB not available, using in-memory store. ({e})")
        client = None
        db = None

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", os.environ.get("GOOGLE_API_KEY", ""))
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")

app = FastAPI(title="Shree Maa Baglamukhi Temple API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class PujaBookingCreate(BaseModel):
    devotee_name: str
    email: EmailStr
    phone: str
    puja_type: str
    booking_date: str  # ISO date string YYYY-MM-DD
    gotra: Optional[str] = ""
    special_request: Optional[str] = ""


class PujaBooking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    devotee_name: str
    email: str
    phone: str
    puja_type: str
    booking_date: str
    gotra: Optional[str] = ""
    special_request: Optional[str] = ""
    status: str = "confirmed"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    reference: str = Field(default_factory=lambda: "MBN-" + uuid.uuid4().hex[:8].upper())


class DonationCreate(BaseModel):
    donor_name: str
    email: EmailStr
    phone: Optional[str] = ""
    cause: str
    amount: float
    message: Optional[str] = ""
    is_anonymous: bool = False


class Donation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    donor_name: str
    email: str
    phone: Optional[str] = ""
    cause: str
    amount: float
    message: Optional[str] = ""
    is_anonymous: bool = False
    status: str = "received"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    receipt: str = Field(default_factory=lambda: "MBN-D-" + uuid.uuid4().hex[:8].upper())


class PrayerRequestCreate(BaseModel):
    name: str
    email: Optional[str] = ""
    prayer: str


class PrayerRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: Optional[str] = ""
    prayer: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    subject: Optional[str] = ""
    message: str


class NewsletterCreate(BaseModel):
    email: EmailStr


class DiyaOfferingCreate(BaseModel):
    devotee_name: Optional[str] = "Anonymous Devotee"
    wish: Optional[str] = ""


class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    session_id: str
    reply: str


def _extract_gemini_text(payload: dict) -> str:
    candidates = payload.get("candidates", [])
    for cand in candidates:
        content = cand.get("content", {})
        parts = content.get("parts", [])
        text_parts = [p.get("text", "") for p in parts if p.get("text")]
        if text_parts:
            return "\n".join(text_parts).strip()
    return ""


def _gemini_generate(user_message: str) -> str:
    if not GEMINI_API_KEY:
        raise HTTPException(500, "Gemini API key not configured on server")

    system = (
        "You are Pandit ji, a wise and warm spiritual guide from Shree Maa Baglamukhi Siddha Peeth, Nalkheda. "
        "Answer in a very user-friendly, helpful style like a modern assistant while preserving devotional warmth. "
        "When relevant, provide practical steps and clear bullet points. Keep answers concise but complete. "
        "If facts can change (dates, travel, current events), verify using web-search grounding before responding. "
        "Never invent facts. If uncertain, clearly say what to verify. "
        "End with a short blessing such as 'Jai Maa Baglamukhi 🕉️'."
    )

    model_candidates = [
        GEMINI_MODEL,
        "gemini-2.5-flash",
        "gemini-2.0-flash",
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
    ]
    model_candidates = list(dict.fromkeys(model_candidates))
    body = {
        "system_instruction": {"parts": [{"text": system}]},
        "contents": [
            {
                "role": "user",
                "parts": [{"text": user_message}],
            }
        ],
        # Use Google search grounding when supported by the selected Gemini model.
        "tools": [{"google_search": {}}],
        "generationConfig": {
            "temperature": 0.5,
            "maxOutputTokens": 650,
        },
    }

    last_error = None
    data = None
    for model_name in model_candidates:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={GEMINI_API_KEY}"
        try:
            resp = requests.post(url, json=body, timeout=45)
            # Some models may reject google_search tool. Retry once without tools.
            if resp.status_code >= 400:
                fallback_body = dict(body)
                fallback_body.pop("tools", None)
                resp = requests.post(url, json=fallback_body, timeout=45)
            if resp.status_code == 404:
                last_error = f"Model not found: {model_name}"
                continue
            resp.raise_for_status()
            data = resp.json()
            break
        except requests.RequestException as e:
            last_error = str(e)

    if data is None:
        raise HTTPException(502, f"Failed to reach Gemini API: {last_error}")

    text = _extract_gemini_text(data)
    if not text:
        raise HTTPException(502, "Gemini returned an empty response")
    return text


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Jai Maa Baglamukhi 🕉️", "temple": "Shree Maa Baglamukhi Siddha Peeth Nalkheda"}


@api_router.get("/pujas")
async def list_pujas():
    return {
        "pujas": [
            {"id": "shatru-nashak", "name": "Shatru Nashak Maha Puja", "duration": "3 hours", "price": 5100, "description": "Destroys enemies, removes negative forces, brings victory.", "priest": "Pt. Ramesh Shastri"},
            {"id": "graha-shanti", "name": "Graha Shanti Puja", "duration": "2 hours", "price": 3100, "description": "Pacifies malefic planetary influences in your birth chart.", "priest": "Pt. Vinod Pandey"},
            {"id": "baglamukhi-havan", "name": "Baglamukhi Mahatantra Havan", "duration": "4 hours", "price": 7100, "description": "Ancient tantric havan for ultimate protection & success.", "priest": "Acharya Mahesh Tiwari"},
            {"id": "mantra-jaap", "name": "Sava Lakh Mantra Jaap", "duration": "5 days", "price": 11100, "description": "1.25 lakh recitations for major life transformation.", "priest": "Pt. Suresh Joshi"},
            {"id": "vip-darshan", "name": "VIP Darshan & Aarti", "duration": "1 hour", "price": 2100, "description": "Personal darshan and aarti with priest blessings.", "priest": "Temple Pujari"},
            {"id": "kanya-pujan", "name": "Kanya Pujan", "duration": "2 hours", "price": 4100, "description": "Worship of nine sacred kanyas — auspicious & purifying.", "priest": "Pt. Ramesh Shastri"},
        ]
    }


@api_router.post("/bookings", response_model=PujaBooking)
async def create_booking(payload: PujaBookingCreate):
    booking = PujaBooking(**payload.model_dump())
    if db is not None:
        await db.bookings.insert_one(booking.model_dump())
    else:
        _memory["bookings"].append(booking.model_dump())
    return booking


@api_router.get("/bookings/{booking_id}", response_model=PujaBooking)
async def get_booking(booking_id: str):
    if db is not None:
        doc = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    else:
        doc = next((b for b in _memory["bookings"] if b.get("id") == booking_id), None)
    if not doc:
        raise HTTPException(404, "Booking not found")
    return PujaBooking(**doc)


@api_router.post("/donations", response_model=Donation)
async def create_donation(payload: DonationCreate):
    donation = Donation(**payload.model_dump())
    if db is not None:
        await db.donations.insert_one(donation.model_dump())
    else:
        _memory["donations"].append(donation.model_dump())
    return donation


@api_router.get("/donations/recent")
async def recent_donations():
    if db is not None:
        cursor = db.donations.find({}, {"_id": 0}).sort("created_at", -1).limit(8)
        items = await cursor.to_list(8)
    else:
        items = list(reversed(_memory["donations"]))[:8]
    for d in items:
        if d.get("is_anonymous"):
            d["donor_name"] = "Anonymous Devotee"
    return {"donations": items}


@api_router.post("/prayer-requests", response_model=PrayerRequest)
async def create_prayer(payload: PrayerRequestCreate):
    pr = PrayerRequest(**payload.model_dump())
    if db is not None:
        await db.prayer_requests.insert_one(pr.model_dump())
    else:
        _memory["prayer_requests"].append(pr.model_dump())
    return pr


@api_router.post("/contact")
async def create_contact(payload: ContactCreate):
    doc = payload.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    if db is not None:
        await db.contacts.insert_one(doc)
    else:
        _memory["contacts"].append(doc)
    return {"success": True, "id": doc["id"], "message": "Pranam! Your message has reached the temple."}


@api_router.post("/newsletter")
async def newsletter(payload: NewsletterCreate):
    if db is not None:
        existing = await db.newsletter.find_one({"email": payload.email}, {"_id": 0})
    else:
        existing = next((n for n in _memory["newsletter"] if n.get("email") == payload.email), None)
    if existing:
        return {"success": True, "already_subscribed": True}
    new_doc = {
        "id": str(uuid.uuid4()),
        "email": payload.email,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    if db is not None:
        await db.newsletter.insert_one(new_doc)
    else:
        _memory["newsletter"].append(new_doc)
    return {"success": True, "already_subscribed": False}


@api_router.post("/diya-offering")
async def diya_offering(payload: DiyaOfferingCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "devotee_name": payload.devotee_name or "Anonymous Devotee",
        "wish": payload.wish or "",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    if db is not None:
        await db.diyas.insert_one(doc)
        count = await db.diyas.count_documents({})
    else:
        _memory["diyas"].append(doc)
        count = len(_memory["diyas"])
    return {"success": True, "total_diyas_lit": count + 100023, "id": doc["id"]}


@api_router.get("/temple-stats")
async def temple_stats():
    if db is not None:
        diyas = await db.diyas.count_documents({})
        bookings = await db.bookings.count_documents({})
        prayers = await db.prayer_requests.count_documents({})
    else:
        diyas = len(_memory["diyas"])
        bookings = len(_memory["bookings"])
        prayers = len(_memory["prayer_requests"])
    return {
        "diyas_lit": diyas + 100023,
        "devotees_today": 4827 + bookings,
        "live_viewers": 312,
        "prayers_offered": prayers + 56021,
    }


@api_router.get("/festivals")
async def festivals():
    return {"festivals": [
        {"id": "navratri", "name": "Shardiya Navratri", "date": "2026-10-12", "description": "Nine sacred nights of Maa Baglamukhi worship with grand aartis."},
        {"id": "jayanti", "name": "Baglamukhi Jayanti", "date": "2026-05-23", "description": "Celebrating the divine appearance of Maa Baglamukhi."},
        {"id": "diwali", "name": "Maha Deepotsav", "date": "2026-11-08", "description": "Temple lit with 1.25 lakh diyas — a divine spectacle."},
        {"id": "purnima", "name": "Sharad Purnima Aarti", "date": "2026-10-26", "description": "Special midnight aarti under the silver moonlight."},
    ]}


@api_router.post("/chat", response_model=ChatResponse)
async def chat_with_pandit(payload: ChatRequest):
    try:
        reply = _gemini_generate(payload.message)
        # Persist messages
        docs = [
            {"id": str(uuid.uuid4()), "session_id": payload.session_id, "role": "user",
             "content": payload.message, "created_at": datetime.now(timezone.utc).isoformat()},
            {"id": str(uuid.uuid4()), "session_id": payload.session_id, "role": "assistant",
             "content": reply, "created_at": datetime.now(timezone.utc).isoformat()},
        ]
        if db is not None:
            await db.chat_messages.insert_many(docs)
        else:
            _memory["chat_messages"].extend(docs)
        return ChatResponse(session_id=payload.session_id, reply=reply)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"chat error: {e}")
        raise HTTPException(500, "Pandit ji is in dhyana. Please try again in a moment.")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    if client is not None:
        client.close()
