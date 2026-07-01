# Architecture Overview

## 1. ภาพรวมสถาปัตยกรรม
ระบบประปาหมู่บ้านเป็น Web Application แบบ 3 ชั้น (3-tier architecture) ประกอบด้วย:
- Frontend: เว็บแอปพลิเคชันสำหรับผู้ใช้น้ำและผู้ดูแลระบบ
- Backend: API server สำหรับจัดการธุรกิจโลจิกและการตรวจสอบสิทธิ์
- Database: ฐานข้อมูลเชิงสัมพันธ์สำหรับข้อมูลสมาชิก ค่าน้ำ ใบแจ้งหนี้ การชำระเงิน ข่าวสาร และคำร้องแจ้งปัญหา

ระบบนี้รองรับการทำงานบน Mobile และ PC และแยกสิทธิ์การใช้งานให้ชัดเจนระหว่าง "ผู้ใช้น้ำ" และ "ผู้ดูแลระบบ" เพื่อความปลอดภัยและการจัดการข้อมูลที่เหมาะสม

## 2. โครงสร้างระบบ

### 2.1 Frontend
- UI Component ตามหน้าที่: Login, Register, Dashboard, Bill History, Complaint, News, Profile, Admin Management
- โครงสร้างโฟลเดอร์ตัวอย่าง:
  - `src/components/`
  - `src/pages/`
  - `src/services/`
  - `src/routes/`
- ใช้การออกแบบให้ Responsive เพื่อรองรับ Mobile/PC
- ประเภทผู้ใช้กำหนดเส้นทางและเมนูต่างกัน
- ตัวอย่าง library: React หรือ Vue, React Router / Vue Router, CSS/SCSS

### 2.2 Backend
- API Server รับคำขอจาก Frontend และสื่อสารกับฐานข้อมูล
- โครงสร้างโฟลเดอร์ตัวอย่าง:
  - `src/controllers/`
  - `src/routes/`
  - `src/services/`
  - `src/models/`
  - `src/middlewares/`
- ฟังก์ชันหลัก:
  - Authentication / Authorization
  - User management
  - Meter reading และการคำนวณค่าน้ำ
  - Billing generation
  - Payment logging
  - News management
  - Complaint submission
- RESTful API เช่น `/api/auth`, `/api/users`, `/api/meters`, `/api/bills`, `/api/payments`, `/api/news`, `/api/complaints`

### 2.3 Database
- ใช้ฐานข้อมูลเชิงสัมพันธ์ เช่น PostgreSQL หรือ MySQL
- ตารางหลัก:
  - `users`
  - `meters`
  - `bills`
  - `payments`
  - `news`
  - `complaints`
- เก็บ password hash เท่านั้น
- แยกบทบาทผู้ใช้ด้วย field `role` เช่น `customer` และ `admin`

## 3. Data Flow

### 3.1 Flow สำหรับผู้ใช้น้ำ
1. ผู้ใช้สมัครสมาชิกและลงทะเบียนเลขมิเตอร์
2. ผู้ใช้เข้าสู่ระบบด้วย email/username และ password
3. Frontend เรียก API เพื่อดึงข้อมูลค่าน้ำปัจจุบันและประวัติการใช้น้ำ
4. ผู้ใช้ส่งคำร้องแจ้งปัญหา หรือดูข่าวสาร
5. เมื่อแก้ไขข้อมูลส่วนตัว Frontend ส่งข้อมูลไปยัง backend เพื่ออัปเดตฐานข้อมูล

### 3.2 Flow สำหรับผู้ดูแลระบบ
1. ผู้ดูแลเข้าสู่ระบบด้วยสิทธิ์ admin
2. Admin ดูรายการสมาชิกและข้อมูลเลขมิเตอร์ได้
3. Admin บันทึกเลขมิเตอร์ใหม่หรืออัปเดตข้อมูลเลขมิเตอร์
4. ระบบคำนวณค่าน้ำอัตโนมัติจากความต่างเลขมิเตอร์
5. ระบบสร้างใบแจ้งหนี้และบันทึกการชำระเงิน
6. Admin จัดการข่าวสารและตรวจสอบคำร้องแจ้งปัญหา
7. Admin ดูรายงานสรุปการใช้งานและรายรับ

### 3.3 Data flow diagram (แนวคิด)
- User -> Frontend -> Backend -> Database
- Admin -> Frontend -> Backend -> Database
- Authentication middleware ตรวจสอบ token/session ก่อนเข้าถึง API
- Validation layer ตรวจสอบ input ทั้ง client-side และ server-side

## 4. การตัดสินใจด้านดีไซน์หลัก

### 4.1 ใช้สถาปัตยกรรมแบบแยกหน้าเว็บและ API
- ช่วยให้พัฒนาหน้า UI ได้เร็วขึ้นและแยกความรับผิดชอบระหว่าง Frontend กับ Backend
- สามารถใช้ Frontend framework ที่ทันสมัย เช่น React/Vue ได้ง่าย

### 4.2 ใช้ฐานข้อมูลเชิงสัมพันธ์
- ข้อมูลสมาชิก, มิเตอร์, ใบแจ้งหนี้, การชำระเงิน มีความสัมพันธ์แบบตาราง
- รองรับการ query รายงานและการสรุปยอดได้สะดวก
- ควรออกแบบ schema ให้ normalize แต่ยังคง performance ที่เหมาะสม

### 4.3 แยกสิทธิ์ผู้ใช้อย่างชัดเจน
- `role` ในตารางผู้ใช้ช่วยให้จัดการ authorization ได้ง่าย
- API บางรายการเฉพาะ admin เช่น `POST /api/news`, `PUT /api/users/:id`, `GET /api/reports`
- ผู้ใช้งานทั่วไปเข้าถึงเฉพาะข้อมูลของตัวเองเท่านั้น

### 4.4 ความปลอดภัยและการตรวจสอบข้อมูล
- รหัสผ่านต้อง hash ก่อนเก็บ (เช่น bcrypt)
- ใช้ JWT หรือ session-based auth พร้อม HTTP-only cookie หรือ Authorization header
- ตรวจสอบข้อมูล entry ทั้งฝั่ง frontend และ backend
- ป้องกัน SQL Injection, XSS, และ unauthorized access

### 4.5 User experience และ responsive design
- ออกแบบ UI ให้ใช้งานง่ายบนมือถือด้วย layout แบบ stack/list
- หน้าแสดงค่าน้ำต้องแสดงผลชัดเจน เช่น ยอดค่าน้ำประจำเดือน, ที่ผ่านมา, สถานะชำระเงิน
- หน้าแจ้งปัญหาและข่าวสารต้องอ่านง่าย และมีการตอบกลับ/สถานะ

## 5. โครงสร้างฐานข้อมูลเบื้องต้น

### users
- id
- fullname
- address
- phone
- email
- password_hash
- role (`customer` / `admin`)
- meter_id
- created_at
- updated_at

### meters
- id
- user_id
- meter_number
- current_reading
- previous_reading
- last_updated

### bills
- id
- user_id
- meter_id
- period_start
- period_end
- usage_amount
- amount_due
- status (`pending`, `paid`, `overdue`)
- issued_date
- due_date

### payments
- id
- bill_id
- user_id
- amount_paid
- payment_date
- payment_method
- receipt_number

### news
- id
- title
- content
- published_date
- author_id
- status (`draft`, `published`)

### complaints
- id
- user_id
- subject
- description
- status (`new`, `in_progress`, `resolved`)
- submitted_at
- updated_at

## 6. ข้อเสนอแนะด้านเทคโนโลยี
- Frontend: React หรือ Vue + TypeScript
- Backend: Node.js + Express หรือ NestJS
- Database: PostgreSQL หรือ MySQL
- Auth: JWT พร้อม password hashing
- Tooling: ESLint, Prettier, และ unit/integration tests

## 7. การใช้งานและการพัฒนา
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm test`

หากแยกระบบเป็น frontend/backend แล้วให้แยกคำสั่งเช่น:
- `cd frontend && npm install`
- `cd frontend && npm run dev`
- `cd backend && npm install`
- `cd backend && npm run dev`

## 8. แนวทางการพัฒนาในอนาคต
- เพิ่มระบบแจ้งเตือนค่าน้ำใกล้ครบกำหนดชำระ
- ขยายฟังก์ชันรายงานสรุปเป็นกราฟและ dashboard
- เพิ่ม API สำหรับ mobile app native
- เพิ่ม audit log สำหรับการแก้ไขข้อมูลสำคัญ
