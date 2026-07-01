# Task List for Village Water Supply Web App

## 1. ภาพรวมโครงการ
สร้าง Web Application ระบบประปาหมู่บ้านที่รองรับทั้ง Mobile และ PC โดยมีผู้ใช้งาน 2 กลุ่ม:
- ผู้ใช้น้ำทั่วไป
- ผู้ดูแลระบบ

ระบบต้องมีฟีเจอร์หลักทั้งการสมัครสมาชิก, เข้าสู่ระบบ, ดูค่าน้ำ, ประวัติการใช้น้ำ, แจ้งปัญหา, ข่าวสาร, แก้ไขข้อมูลส่วนตัว, และฟังก์ชันสำหรับผู้ดูแลระบบ เช่น จัดการสมาชิก, บันทึกเลขมิเตอร์, คำนวณค่าน้ำอัตโนมัติ, ออกใบแจ้งหนี้, บันทึกการชำระเงิน, จัดการข่าวสาร และดูรายงานสรุป

## 2. งานหลัก (Tasks)

### 2.1 งาน frontend
- ออกแบบ UI responsive สำหรับ Mobile และ Desktop
- สร้างหน้าจอหลัก:
  - Login
  - Register
  - Dashboard ผู้ใช้น้ำ
  - ประวัติการใช้น้ำ
  - แจ้งปัญหา
  - ข่าวประชาสัมพันธ์
  - โปรไฟล์ / แก้ไขข้อมูลส่วนตัว
  - หน้าแอดมิน: จัดการสมาชิก, บันทึกเลขมิเตอร์, ใบแจ้งหนี้, การชำระเงิน, ข่าวสาร, รายงาน
- สร้างระบบ route แยกตามบทบาทผู้ใช้
- กำหนด component structure เช่น `src/components/`, `src/pages/`, `src/services/`, `src/routes/`
- ใช้ naming convention: PascalCase สำหรับ component, camelCase สำหรับฟังก์ชันและ state
- ตรวจสอบ input ฝั่ง client ทั้งฟอร์มสมัครสมาชิก, ฟอร์มแจ้งปัญหา, ฟอร์มแก้ไขข้อมูล

### 2.2 งาน backend
- สร้าง RESTful API สำหรับ resource หลัก:
  - `/api/auth`
  - `/api/users`
  - `/api/meters`
  - `/api/bills`
  - `/api/payments`
  - `/api/news`
  - `/api/complaints`
- ออกแบบโครงสร้างโฟลเดอร์เบื้องต้น: `src/controllers/`, `src/routes/`, `src/services/`, `src/models/`, `src/middlewares/`
- พัฒนาการยืนยันตัวตนและสิทธิ์:
  - Auth (JWT หรือ session)
  - Authorization ระหว่าง `customer` กับ `admin`
- พัฒนาการจัดการผู้ใช้และสมาชิก
- พัฒนาฟังก์ชันบันทึกเลขมิเตอร์และคำนวณค่าน้ำ
- สร้างใบแจ้งหนี้และบันทึกการชำระเงิน
- ฟังก์ชันจัดการข่าวสารและคำร้องแจ้งปัญหา
- ตรวจสอบข้อมูลฝั่ง server, ป้องกัน SQL Injection และ unauthorized access

### 2.3 งานฐานข้อมูล
- ออกแบบ schema สำหรับตารางหลัก:
  - `users`
  - `meters`
  - `bills`
  - `payments`
  - `news`
  - `complaints`
- เก็บ password hash เท่านั้น
- ใช้ `role` แยกสิทธิ์ user เป็น `customer` และ `admin`
- ออกแบบความสัมพันธ์ข้อมูลให้ support รายงานและการ query

## 3. งาน non-functional
- ทำระบบ responsive และใช้งานง่ายทั้งมือถือและเดสก์ท็อป
- เพิ่มความปลอดภัยสำหรับข้อมูลผู้ใช้และรหัสผ่าน
- ปรับ UX ให้ราบรื่นและเข้าใจง่าย
- ใช้หลัก single responsibility เพื่อแยก logic ใน component/module
- ตั้ง convention code style เช่น ESLint/Prettier และ commit message

## 4. งานจาก SRS และเอกสารประกอบ
- ฟอร์มสมัครสมาชิกเก็บข้อมูลชื่อ-นามสกุล, ที่อยู่, เบอร์โทร, เลขมิเตอร์, รหัสผ่าน
- หน้า Login สำหรับผู้ใช้น้ำและผู้ดูแลระบบ
- หน้าแสดงค่าน้ำประจำเดือนและประวัติการใช้น้ำ
- ระบบแจ้งปัญหาและข่าวสาร
- หน้าแก้ไขข้อมูลส่วนตัว
- ฟังก์ชันผู้ดูแลระบบ: จัดการสมาชิก, บันทึกเลขมิเตอร์, คำนวณค่าน้ำอัตโนมัติ, ออกใบแจ้งหนี้, บันทึกการชำระเงิน, จัดการข่าวสาร, รายงานสรุป

## 5. เทคนิคที่แนะนำ
- Frontend: React หรือ Vue + TypeScript
- Backend: Node.js + Express หรือ NestJS
- Database: PostgreSQL หรือ MySQL
- Auth: JWT หรือ session-based auth
- Tooling: ESLint, Prettier, unit/integration tests

## 6. คำสั่งพัฒนาและ build
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm test`

ถ้าแยกระบบ frontend/backend:
- `cd frontend && npm install`
- `cd frontend && npm run dev`
- `cd backend && npm install`
- `cd backend && npm run dev`

## 7. ผลลัพธ์ที่คาดหวัง
- ระบบ Web App ประปาหมู่บ้านที่ใช้งานได้ทั้งผู้ใช้น้ำและผู้ดูแล
- UI responsive และแบ่งสิทธิ์ชัดเจน
- API และฐานข้อมูลออกแบบตามข้อกำหนด
- ข้อมูลสำคัญเก็บอย่างปลอดภัยและตรวจสอบ input ทั้ง client/server



