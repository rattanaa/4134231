# Architecture

## Overview
เว็บแอปถูกพัฒนาด้วย HTML, CSS และ JavaScript แบบ Static Web Application

## Components
- Frontend: HTML สำหรับโครงสร้างหน้าเว็บ
- Styling: CSS สำหรับการจัดหน้าและรูปแบบการแสดงผล
- Logic: JavaScript สำหรับการ authenticate, แสดงข้อมูล, และอัปเดตที่อยู่
- Storage: LocalStorage ในเบราว์เซอร์เพื่อเก็บข้อมูลผู้ใช้และที่อยู่

## Flow
1. ผู้ใช้เข้าสู่ระบบ
2. ระบบตรวจสอบข้อมูลจาก LocalStorage
3. ถ้าถูกต้องจะแสดงหน้า Dashboard
4. ผู้ใช้สามารถแก้ไขที่อยู่และข้อมูลจะถูกบันทึกกลับไปยัง LocalStorage
