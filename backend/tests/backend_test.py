"""Backend API tests for Shree Maa Baglamukhi Temple API"""
import os
import time
import pytest
import requests

BASE = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE:
    # Try frontend .env
    from pathlib import Path
    env_path = Path("/app/frontend/.env")
    for line in env_path.read_text().splitlines():
        if line.startswith("REACT_APP_BACKEND_URL="):
            BASE = line.split("=", 1)[1].strip()
BASE = BASE.rstrip("/")
API = f"{BASE}/api"


# ---------- Root / Pujas / Festivals / Stats ----------
def test_root():
    r = requests.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert "message" in data and "Baglamukhi" in data["message"]


def test_list_pujas():
    r = requests.get(f"{API}/pujas")
    assert r.status_code == 200
    pujas = r.json().get("pujas", [])
    assert len(pujas) == 6
    assert all("price" in p and "name" in p for p in pujas)


def test_festivals():
    r = requests.get(f"{API}/festivals")
    assert r.status_code == 200
    fests = r.json().get("festivals", [])
    assert len(fests) == 4
    for f in fests:
        assert "date" in f and "name" in f


def test_temple_stats():
    r = requests.get(f"{API}/temple-stats")
    assert r.status_code == 200
    data = r.json()
    for k in ("diyas_lit", "devotees_today", "live_viewers", "prayers_offered"):
        assert k in data and isinstance(data[k], int)


# ---------- Bookings ----------
def test_create_and_get_booking():
    payload = {
        "devotee_name": "TEST_Devotee",
        "email": "test_devotee@example.com",
        "phone": "9999999999",
        "puja_type": "shatru-nashak",
        "booking_date": "2026-02-15",
        "gotra": "Kashyap",
        "special_request": "Blessings",
    }
    r = requests.post(f"{API}/bookings", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["reference"].startswith("MBN-")
    assert data["booking_date"] == "2026-02-15"
    assert data["devotee_name"] == "TEST_Devotee"
    bid = data["id"]

    g = requests.get(f"{API}/bookings/{bid}")
    assert g.status_code == 200
    gd = g.json()
    assert gd["id"] == bid
    assert gd["puja_type"] == "shatru-nashak"


def test_get_booking_404():
    r = requests.get(f"{API}/bookings/nonexistent-id-xyz")
    assert r.status_code == 404


# ---------- Donations ----------
def test_create_donation_and_recent():
    payload = {
        "donor_name": "TEST_Donor",
        "email": "test_donor@example.com",
        "phone": "9000000000",
        "cause": "Temple Renovation",
        "amount": 501.0,
        "message": "For Maa",
        "is_anonymous": False,
    }
    r = requests.post(f"{API}/donations", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["receipt"].startswith("MBN-D-")
    assert data["amount"] == 501.0

    # Anonymous donation
    anon = {**payload, "donor_name": "TEST_Secret", "is_anonymous": True, "amount": 251.0}
    requests.post(f"{API}/donations", json=anon)

    rec = requests.get(f"{API}/donations/recent")
    assert rec.status_code == 200
    items = rec.json().get("donations", [])
    assert len(items) >= 1
    for d in items:
        if d.get("is_anonymous"):
            assert d["donor_name"] == "Anonymous Devotee"


# ---------- Diya offering & stats ----------
def test_diya_offering_increments():
    before = requests.get(f"{API}/temple-stats").json()["diyas_lit"]
    r = requests.post(f"{API}/diya-offering", json={"devotee_name": "TEST_Diya", "wish": "peace"})
    assert r.status_code == 200
    data = r.json()
    assert data["success"] is True
    assert data["total_diyas_lit"] >= before + 1


# ---------- Prayer requests ----------
def test_prayer_request():
    r = requests.post(f"{API}/prayer-requests", json={"name": "TEST_Pray", "email": "p@e.com", "prayer": "Bless me"})
    assert r.status_code == 200
    data = r.json()
    assert "id" in data and data["name"] == "TEST_Pray"


# ---------- Newsletter ----------
def test_newsletter_subscribe_and_duplicate():
    email = f"test_news_{int(time.time())}@example.com"
    r1 = requests.post(f"{API}/newsletter", json={"email": email})
    assert r1.status_code == 200
    d1 = r1.json()
    assert d1["success"] is True and d1["already_subscribed"] is False
    r2 = requests.post(f"{API}/newsletter", json={"email": email})
    assert r2.status_code == 200
    assert r2.json()["already_subscribed"] is True


# ---------- Contact ----------
def test_contact_message():
    payload = {
        "name": "TEST_Contact",
        "email": "test_contact@example.com",
        "phone": "9111111111",
        "subject": "Query",
        "message": "Pranam ji",
    }
    r = requests.post(f"{API}/contact", json=payload)
    assert r.status_code == 200
    data = r.json()
    assert data["success"] is True and "id" in data


# ---------- Chat (Claude Sonnet 4.5 via Emergent LLM) ----------
def test_chat_pandit():
    r = requests.post(f"{API}/chat", json={"session_id": "test-session-001", "message": "Pranam Pandit ji, who is Maa Baglamukhi?"}, timeout=60)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["session_id"] == "test-session-001"
    assert isinstance(data["reply"], str) and len(data["reply"]) > 20
