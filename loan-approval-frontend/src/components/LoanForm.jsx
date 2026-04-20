// src/components/LoanForm.jsx
import { useState } from 'react';
import axios from 'axios';
import StepIndicator from './StepIndicator';
import ResultCard from './ResultCard';

const STEPS = ['Personal Info', 'Financial Details', 'Loan Purpose', 'Review'];

const FIELD = (label, key, type = 'number', opts = null) => ({ label, key, type, opts });

const STEP_FIELDS = [
  [
    FIELD('Age', 'person_age'),
    FIELD('Annual Income ($)', 'person_income'),
    FIELD('Employment Experience (years)', 'person_emp_exp'),
    FIELD('Credit Score', 'credit_score'),
    FIELD('Credit History Length (years)', 'cb_person_cred_hist_length'),
    FIELD('Gender', 'person_gender_male', 'select', [
      { label: 'Male', value: 1 },
      { label: 'Female', value: 0 },
    ]),
    FIELD('Home Ownership', 'home_ownership', 'select', [
      { label: 'Rent', value: 'RENT' },
      { label: 'Own', value: 'OWN' },
      { label: 'Other', value: 'OTHER' },
      { label: 'Mortgage', value: 'MORTGAGE' },
    ]),
    FIELD('Education', 'education', 'select', [
      { label: 'High School', value: 'High School' },
      { label: 'Bachelor\'s', value: 'Bachelor' },
      { label: 'Master\'s', value: 'Master' },
      { label: 'Doctorate', value: 'Doctorate' },
    ]),
    FIELD('Previous Loan Defaults', 'previous_loan_defaults_on_file', 'select', [
      { label: 'No', value: 0 },
      { label: 'Yes', value: 1 },
    ]),
  ],
  [
    FIELD('Loan Amount ($)', 'loan_amnt'),
    FIELD('Interest Rate (%)', 'loan_int_rate'),
    FIELD('Loan % of Income', 'loan_percent_income'),
  ],
  [
    FIELD('Loan Purpose', 'loan_intent', 'select', [
      { label: 'Education', value: 'EDUCATION' },
      { label: 'Home Improvement', value: 'HOMEIMPROVEMENT' },
      { label: 'Medical', value: 'MEDICAL' },
      { label: 'Personal', value: 'PERSONAL' },
      { label: 'Venture', value: 'VENTURE' },
      { label: 'Debt Consolidation', value: 'DEBTCONSOLIDATION' },
    ]),
  ],
];

function buildPayload(form) {
  const homeMap = { RENT: 'person_home_ownership_RENT', OWN: 'person_home_ownership_OWN', OTHER: 'person_home_ownership_OTHER' };
  const intentMap = {
    EDUCATION: 'loan_intent_EDUCATION', HOMEIMPROVEMENT: 'loan_intent_HOMEIMPROVEMENT',
    MEDICAL: 'loan_intent_MEDICAL', PERSONAL: 'loan_intent_PERSONAL', VENTURE: 'loan_intent_VENTURE'
  };
  const eduMap = {
    Bachelor: 'person_education_Bachelor', Doctorate: 'person_education_Doctorate',
    'High School': 'person_education_High School', Master: 'person_education_Master'
  };

  const payload = {
    person_age: +form.person_age,
    person_income: +form.person_income,
    person_emp_exp: +form.person_emp_exp,
    loan_amnt: +form.loan_amnt,
    loan_int_rate: +form.loan_int_rate,
    loan_percent_income: +form.loan_percent_income,
    cb_person_cred_hist_length: +form.cb_person_cred_hist_length,
    credit_score: +form.credit_score,
    previous_loan_defaults_on_file: +form.previous_loan_defaults_on_file,
    person_gender_male: +form.person_gender_male,
    person_home_ownership_OTHER: 0,
    person_home_ownership_OWN: 0,
    person_home_ownership_RENT: 0,
    loan_intent_EDUCATION: 0, loan_intent_HOMEIMPROVEMENT: 0,
    loan_intent_MEDICAL: 0, loan_intent_PERSONAL: 0, loan_intent_VENTURE: 0,
    person_education_Bachelor: 0, person_education_Doctorate: 0,
    'person_education_High School': 0, person_education_Master: 0,
  };

  if (homeMap[form.home_ownership]) payload[homeMap[form.home_ownership]] = 1;
  if (intentMap[form.loan_intent]) payload[intentMap[form.loan_intent]] = 1;
  if (eduMap[form.education]) payload[eduMap[form.education]] = 1;

  return payload;
}

export default function LoanForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
  setLoading(true); setError('');
  try {
    const payload = buildPayload(form);
    
    // ✅ Wrap in "data" key to match your API
    const res = await axios.post('https://loan-approval-prediction-system-1-8yrl.onrender.com', {
      data: payload
    });

    // ✅ Map loan_status to the result
    setResult({ prediction: res.data.loan_status });
    setStep(4);
  } catch (e) {
    setError('Could not reach the prediction API. Make sure your backend is running.');
  } finally { setLoading(false); }
};

  const fields = STEP_FIELDS[step] || [];

  if (step === 4) return (
    <ResultCard result={result} onReset={() => { setStep(0); setForm({}); setResult(null); }} />
  );

  const cardStyle = {
    background: '#111827',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20, padding: 28, marginBottom: 16
  };

  return (
    <div>
      <StepIndicator current={step} steps={STEPS} />

      {step < 3 ? (
        <div style={cardStyle}>
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, marginBottom: 20 }}>
            {STEPS[step]}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {fields.map(({ label, key, type, opts }) => (
              <div key={key}>
                <label>{label}</label>
                {type === 'select' ? (
                  <select value={form[key] ?? ''} onChange={e => update(key, e.target.value)}>
                    <option value=''>Select...</option>
                    {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                ) : (
                  <input
                    type='number' placeholder={`Enter ${label.toLowerCase()}`}
                    value={form[key] ?? ''}
                    onChange={e => update(key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={cardStyle}>
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, marginBottom: 20 }}>
            Review Your Application
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
            {Object.entries(form).map(([k, v]) => (
              <div key={k} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                fontSize: 14
              }}>
                <span style={{ color: '#8892a4', textTransform: 'capitalize' }}>
                  {k.replace(/_/g, ' ')}
                </span>
                <span style={{ fontWeight: 500 }}>{String(v)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div style={{ color: '#fc5c7d', fontSize: 13, marginBottom: 12, padding: '10px 14px', background: 'rgba(252,92,125,0.1)', borderRadius: 8 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)} style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
            color: '#8892a4', borderRadius: 10, padding: '12px 24px', fontSize: 14
          }}>
            Back
          </button>
        )}
        {step < 2 && (
          <button onClick={() => setStep(s => s + 1)} style={{
            background: 'linear-gradient(135deg, #4f8ef7, #38d9a9)',
            border: 'none', color: '#fff', borderRadius: 10,
            padding: '12px 28px', fontSize: 14, fontWeight: 600
          }}>
            Continue →
          </button>
        )}
        {step === 2 && (
          <button onClick={() => setStep(3)} style={{
            background: 'linear-gradient(135deg, #4f8ef7, #38d9a9)',
            border: 'none', color: '#fff', borderRadius: 10,
            padding: '12px 28px', fontSize: 14, fontWeight: 600
          }}>
            Review Application
          </button>
        )}
        {step === 3 && (
          <button onClick={handleSubmit} disabled={loading} style={{
            background: loading ? '#1a2236' : 'linear-gradient(135deg, #4f8ef7, #38d9a9)',
            border: 'none', color: loading ? '#8892a4' : '#fff', borderRadius: 10,
            padding: '12px 32px', fontSize: 14, fontWeight: 600
          }}>
            {loading ? 'Analyzing...' : 'Submit & Predict'}
          </button>
        )}
      </div>
    </div>
  );
}