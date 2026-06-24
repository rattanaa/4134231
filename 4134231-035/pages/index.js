import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Village Water</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={{ padding: '2rem', fontFamily: 'system-ui, Arial' }}>
        <h1>เว็บจัดการค่าน้ำหมู่บ้าน</h1>
        <p>สวัสดี — โปรเจกต์ถูกปรับให้ใช้ Next.js แล้ว</p>
        <ul>
          <li><a href="/profile">หน้าโปรไฟล์ (ตัวอย่าง)</a></li>
        </ul>
      </main>
    </>
  )
}
