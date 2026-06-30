const profile = {
  id: 2,
  name: 'ผู้ใช้น้ำ ตัวอย่าง',
  email: 'resident@example.com',
  phone: '0812345678',
  address: '123 หมู่ 2 ตำบลตัวอย่าง อำเภอตัวอย่าง จังหวัดตัวอย่าง',
  role: 'resident',
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(profile);
  }

  if (req.method === 'PUT') {
    const data = req.body || {};
    return res.status(200).json({ ...profile, ...data });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
