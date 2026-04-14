// src/components/Header.jsx
export default function Header() {
  return (
    <header style={{
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '20px 40px',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: 'linear-gradient(135deg, #4f8ef7, #38d9a9)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18
      }}>💳</div>
      <div>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: '#e8eaf0' }}>
          LoanSense AI
        </div>
        <div style={{ fontSize: 11, color: '#8892a4', marginTop: 1 }}>
          Intelligent loan approval prediction
        </div>
      </div>
    </header>
  );
}