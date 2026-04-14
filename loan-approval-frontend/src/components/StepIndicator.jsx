// src/components/StepIndicator.jsx
export default function StepIndicator({ current, steps }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ flex: 1 }}>
          <div style={{
            height: 3, borderRadius: 4,
            background: i <= current
              ? 'linear-gradient(90deg, #4f8ef7, #38d9a9)'
              : 'rgba(255,255,255,0.08)',
            transition: 'background 0.4s'
          }} />
          <div style={{
            fontSize: 11, marginTop: 6, fontWeight: 500,
            color: i === current ? '#e8eaf0' : '#8892a4'
          }}>{s}</div>
        </div>
      ))}
    </div>
  );
}