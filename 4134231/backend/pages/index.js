export default function Home() {
  return (
    <main style={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem',
    }}>
      <div>
        <h1>Backend API scaffold</h1>
        <p>This Next.js backend app runs on port 4000 and provides API routes for the village water system.</p>
      </div>
    </main>
  );
}
