// src/App.jsx
import Header from './components/Header';
import LoanForm from './components/LoanForm';
import './App.css';

export default function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      <main style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 40, lineHeight: 1.2, marginBottom: 12
          }}>
            Loan Approval <span style={{
              background: 'linear-gradient(90deg, #4f8ef7, #38d9a9)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>Predictor</span>
          </h1>
          <p style={{ color: '#8892a4', fontSize: 16, lineHeight: 1.7 }}>
            Fill in your financial profile across three quick steps. Our AI model will
            instantly evaluate your loan eligibility and provide a confidence score.
          </p>
        </div>
        <LoanForm />
      </main>
    </div>
  );
}