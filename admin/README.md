# Shree Maa Baglamukhi Peeth — Admin (Next.js 14)

Production-style admin dashboard with **SQLite + Prisma**, **JWT (httpOnly cookie)**, **REST API routes**, and a **dark / gold** UI matching the temple brand.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS  
- Prisma ORM + SQLite (`prisma/dev.db`)  
- Auth: **jose** (HS256 JWT) + **bcrypt** password hashing  
- Validation: **Zod**  
- Toasts: **Sonner**  
- Charts: **Recharts**  

## Default admin (after seed)

| Field    | Value               |
|----------|---------------------|
| Email    | `admin@baglamukhi.com` |
| Password | `Admin@123`         |

Change the password from **Admin profile** after first login.

## Environment

Copy `.env.example` to `.env` and adjust:

```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="long-random-string-at-least-32-chars"
JWT_EXPIRES_IN="7d"
ALLOW_ORIGIN="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3001"
```

- **ALLOW_ORIGIN**: your CRA / Vite marketing site origin (for CORS on public APIs).  
- **NEXT_PUBLIC_APP_URL**: public URL of this admin app (used to decide whether auth cookies are `Secure` in production). Use `https://…` when TLS is enabled.  
- **AUTH_COOKIE_SECURE** (optional): set to `false` if you run production over **HTTP** (e.g. `http://43.x.x.x:3001`); otherwise the browser may refuse the login cookie. Set to `true` to force `Secure` cookies behind HTTPS.  
- Dev server runs on **port 3001** (see `package.json` scripts) so it can run beside the existing `frontend` on **3000**.

## Install & database

```bash
cd admin
npm install
npx prisma migrate dev
npx prisma db seed
```

- **migrate dev**: creates/updates SQLite schema.  
- **seed**: default admin + sample packages + singleton settings rows.

## Run

```bash
npm run dev
```

Open **http://localhost:3001/admin/login**

Production:

```bash
npm run build
npm start
```

## API overview

Public (CORS-enabled for `ALLOW_ORIGIN`; no auth unless noted):

| Method | Path | Notes |
|--------|------|--------|
| POST | `/api/admin/login` | JSON `{ email, password }`, sets `admin_token` cookie |
| POST | `/api/admin/logout` | Clears cookie |
| GET | `/api/admin/me` | Requires cookie |
| GET | `/api/admin/stats` | Dashboard stats |
| PATCH | `/api/admin/profile` | Update name / password |
| GET | `/api/packages` | List puja/havan packages |
| POST | `/api/bookings` | Create booking (`userName`, `email`, `phone`, `packageId`, `bookingDate`, optional `address`) |
| GET | `/api/bookings` | Admin: list + `?search=&status=&page=` |
| GET/PUT/DELETE | `/api/bookings/[id]` | Admin |
| POST | `/api/packages` | Admin: create |
| GET/PUT/DELETE | `/api/packages/[id]` | GET public, PUT/DELETE admin |
| GET | `/api/messages` | Admin |
| POST | `/api/messages` | Public contact form |
| PATCH/DELETE | `/api/messages/[id]` | Admin |
| GET | `/api/gallery` | Public list |
| POST | `/api/gallery` | Admin |
| PUT/DELETE | `/api/gallery/[id]` | Admin |
| GET | `/api/settings/contact` | Public |
| PUT | `/api/settings/contact` | Admin |
| GET | `/api/settings/social` | Public |
| PUT | `/api/settings/social` | Admin |
| GET | `/api/settings/website` | Public |
| PUT | `/api/settings/website` | Admin |
| GET | `/api/donations` | Admin |
| POST | `/api/donations` | Public (record donation) |
| POST | `/api/upload` | Admin, `multipart/form-data` field `file` → returns `{ url }` under `/uploads/...` |

## Integrating the existing CRA `frontend`

1. Point API calls to `http://localhost:3001` (or your deployed admin URL).  
2. **Bookings**: POST JSON aligned with `bookingCreateSchema` (`userName`, not `devotee_name`).  
3. **Packages**: replace mock `/api/pujas` with `GET http://localhost:3001/api/packages` and map fields (`panditName` vs `priest`, etc.) or add a thin BFF.  
4. **Gallery / contact / footer**: consume `GET /api/settings/*` and `/api/gallery`.  
5. Use `fetch(..., { credentials: 'omit' })` for public POST from another origin; CORS is configured via middleware using `ALLOW_ORIGIN`.

## Folder layout

```
admin/
  prisma/
    schema.prisma
    seed.ts
    migrations/
  public/uploads/     # uploaded images (gitignored files, .gitkeep kept)
  src/
    app/
      admin/          # dashboard UI
      api/            # route handlers
    components/
    lib/              # prisma, jwt, auth, validations, cors
    middleware.ts
```

## Security notes

- Rotate **JWT_SECRET** in production.  
- Use **HTTPS** and `secure` cookies in production.  
- Restrict `ALLOW_ORIGIN` to your real marketing domain.  
- The default admin password must be changed after first deploy.
