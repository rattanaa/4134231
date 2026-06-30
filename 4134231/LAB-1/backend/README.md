# backend

This folder contains a separate Next.js backend scaffold for the Village Water system.

## Run

1. Install dependencies

```bash
cd backend
npm install
```

2. Start development server

```bash
npm run dev
```

The backend will run on `http://localhost:4000`.

## API routes

- `GET /api/hello`
- `POST /api/auth` — login demo credentials
- `GET /api/profile` — fetch resident profile
- `PUT /api/profile` — update profile data
- `GET /api/meters` — fetch meter readings
- `POST /api/meters` — create a new meter reading
- `GET /api/reports` — sample admin report

## Notes

- This is a starter scaffold only, using in-memory sample responses.
- Extend with database, authentication, and production config as needed.
