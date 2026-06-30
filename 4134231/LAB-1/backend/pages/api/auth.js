const users = [
  { id: 1, email: 'admin@example.com', role: 'admin', password: 'admin123' },
  { id: 2, email: 'resident@example.com', role: 'resident', password: 'resident123' },
];

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body || {};
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.status(200).json({
    id: user.id,
    email: user.email,
    role: user.role,
    token: 'demo-token',
  });
}
