const meterReadings = [
  { id: 1, meterId: 1, date: '2026-06-01', value: 1250, recordedBy: 'admin' },
  { id: 2, meterId: 1, date: '2026-07-01', value: 1320, recordedBy: 'admin' },
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(meterReadings);
  }

  if (req.method === 'POST') {
    const newReading = req.body;
    newReading.id = meterReadings.length + 1;
    meterReadings.push(newReading);
    return res.status(201).json(newReading);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
