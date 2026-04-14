// src/components/ResultCard.jsx
export default function ResultCard({ result, onReset }) {
  const approved = result?.prediction === 1;  // ✅ matches loan_status: 1
  const prob = result?.probability ?? result?.confidence ?? null;

  return (
    <div style={{
      background: approved
        ? 'linear-gradient(135deg, rgba(56,217,169,0.12), rgba(79,142,247,0.08))'
        : 'linear-gradient(135deg, rgba(252,92,125,0.12), rgba(255,140,60,0.08))',
      border: `1px solid ${approved ? 'rgba(56,217,169,0.3)' : 'rgba(252,92,125,0.3)'}`,
      borderRadius: 20, padding: 40, textAlign: 'center'
    }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>
        {approved ? '✅' : '❌'}
      </div>
      <h2 style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: 32, marginBottom: 10,
        color: approved ? '#38d9a9' : '#fc5c7d'
      }}>
        {approved ? 'Loan Approved' : 'Loan Declined'}
      </h2>
      <p style={{ color: '#8892a4', marginBottom: 24, fontSize: 15 }}>
        {approved
          ? 'Based on your profile, this loan is likely to be approved.'
          : 'Based on your profile, this loan application may not be approved at this time.'}
      </p>
      {prob !== null && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 12, color: '#8892a4', marginBottom: 8 }}>
            CONFIDENCE SCORE
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.05)', borderRadius: 100,
            height: 10, overflow: 'hidden', maxWidth: 300, margin: '0 auto 8px'
          }}>
            <div style={{
              height: '100%', borderRadius: 100,
              width: `${Math.round(prob * 100)}%`,
              background: approved
                ? 'linear-gradient(90deg, #38d9a9, #4f8ef7)'
                : 'linear-gradient(90deg, #fc5c7d, #ff8c3c)',
              transition: 'width 1s ease'
            }} />
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: '#e8eaf0' }}>
            {Math.round(prob * 100)}%
          </div>
        </div>
      )}
      <button onClick={onReset} style={{
        background: 'rgba(79,142,247,0.15)', border: '1px solid rgba(79,142,247,0.4)',
        color: '#4f8ef7', borderRadius: 10, padding: '12px 28px',
        fontSize: 14, fontWeight: 500, transition: 'all 0.2s'
      }}>
        Check Another Application
      </button>
    </div>
  );
}