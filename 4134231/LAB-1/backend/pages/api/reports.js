export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const report = {
    totalUsers: 125,
    totalMeters: 118,
    totalReadingsThisMonth: 112,
    totalRevenue: 45230,
  };

  res.status(200).json(report);
}
