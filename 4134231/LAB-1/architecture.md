# Architecture Overview

## Purpose
ให้ภาพรวมสถาปัตยกรรมซอฟต์แวร์สำหรับเว็บแอปตรวจเช็คค่าน้ำประปาหมู่บ้าน (จาก SRS)

## High-level Components
- **Frontend:** Responsive SPA (มือถือ/เดสก์ท็อป) — แสดงแดชบอร์ดผู้ใช้น้ำ, หน้าโปรไฟล์, หน้า Admin
- **Backend API:** REST/GraphQL สำหรับการยืนยันตัวตน, จัดการผู้ใช้, มิเตอร์, บันทึกการอ่าน, ใบแจ้งหนี้, รายงาน
- **Database:** RDBMS (Postgres/MySQL) เก็บ `Users`, `Addresses`, `Meters`, `Readings`, `Bills`, `Exports`
- **Auth & RBAC:** Local auth (hash+salt, bcrypt/argon2) + session/JWT; roles: `resident`, `admin`
- **Storage:** Object storage (S3 หรือ S3-compatible) สำหรับไฟล์ส่งออก (PDF/CSV) และสำรองข้อมูล
- **Background Jobs / Scheduler:** งานรายเดือน/รายวัน เช่น สร้างบิล, ส่งอีเมล, สำรองข้อมูล
- **Notification Service:** อีเมล/แจ้งเตือนในแอปเมื่อมีบิลใหม่ (optional)
- **Monitoring & Logging:** Centralized logs, basic metrics, uptime alerts

## Data Model (ย่อ)
- Users(id, name, email, phone, role, hashed_password)
- Addresses(id, user_id, house_no, village, district, province)
- Meters(id, address_id, meter_no, status)
- Readings(id, meter_id, reading_date, value, recorded_by)
- Bills(id, user_id, period_start, period_end, amount, status)

## API Surface (ตัวอย่าง)
- POST /auth/login
- GET /users/:id/profile
- PUT /users/:id/profile
- GET /meters/:id/readings?from=&to=
- POST /meters/:id/readings
- GET /admin/reports?from=&to=&format=csv|pdf

## Non-functional Considerations
- **Performance:** หน้าโหลด <3s (NFR) — ใช้ CDN, asset bundling, HTTP caching
- **Security:** HTTPS enforced, input validation, rate limiting, password hashing (bcrypt/argon2)
- **Backups:** สำรองฐานข้อมูลรายวัน และทดสอบกู้คืนเป็นระยะ
- **Scalability:** Docker + orchestration (Kubernetes) หรือ PaaS; แยก DB, API, static assets
- **Availability:** ใช้ health checks, auto-restart, และสำรอง DB snapshot

## Deployment Recommendations
- Containerize (Docker) ทั้ง frontend และ backend
- CI/CD pipeline สำหรับ build → test → deploy
- Staging environment ก่อนขึ้น production

## Operational Notes
- Daily cron job: export data backup + rotate logs
- Admin can export CSV/PDF for reporting
- Audit log สำหรับการเปลี่ยนแปลงข้อมูลสำคัญ

## Tech Stack Suggestions (ตัวอย่าง)
- Frontend: React/Vue + TypeScript
- Backend: Node.js (Express/Nest) หรือ Laravel (PHP)
- DB: PostgreSQL
- Worker: BullMQ / Sidekiq / Laravel Queue
- Storage: AWS S3 หรือ MinIO

## Diagram & Next Steps
- แนะนำสร้าง diagram (Mermaid/Draw.io) แสดง data flow: User → Frontend → API → DB / Worker → Storage
- ต่อไป: สร้าง API spec (OpenAPI), ER diagram, และ CI pipeline

---
Generated from `CLAUDE.md` (SRS summary).