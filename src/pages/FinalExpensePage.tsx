import React, { useState } from "react";
import ReactDOM from "react-dom";
import { funeralCostsByState } from "./funeralCostsByState";
import { getNationalQuote, getCashValueTable } from "./csvQuoteUtils";

const sellingPoints = [
  "No medical exam required – easy approval",
  "Flexible coverage amounts to fit your needs",
  "Protects your family from financial burden"
];

const states = funeralCostsByState.map(f => f.state).sort();

const FinalExpensePage: React.FC = () => {
  // Simple form state (expand as needed)
  const [form, setForm] = useState({ name: "", age: "", state: "", coverage: "", health: "", email: "" });
  const [selectedState, setSelectedState] = useState("");
  const [burialType, setBurialType] = useState("");

  // Add state for quote slider section
  const [quoteGender, setQuoteGender] = useState<'male' | 'female'>('male');
  const [quoteAge, setQuoteAge] = useState(60);
  const [quoteCoverage, setQuoteCoverage] = useState(10000);

  // Add state for health tier (default: select1)
  const [healthTier, setHealthTier] = useState<'select1' | 'select2' | 'select3'>('select1');

  // Health questionnaire state
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);
  const [q4, setQ4] = useState<string | null>(null);
  const [q5, setQ5] = useState<string | null>(null);

  // Auto-classify health tier based on answers
  React.useEffect(() => {
    if (!selectedState || !burialType) return;
    if ([q1, q2, q3].includes("yes")) {
      setHealthTier("select3");
    } else if (q4 === "yes" || q5 === "yes") {
      setHealthTier("select2");
    } else if ([q1, q2, q3, q4, q5].every(q => q === "no")) {
      setHealthTier("select1");
    }
  }, [q1, q2, q3, q4, q5, selectedState, burialType]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle state and burial/cremation selection
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setForm({ ...form, state: e.target.value });
  };
  const handleBurialTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBurialType(e.target.value);
  };

  // Handle form submission (placeholder)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement submission logic (API call, show confirmation, etc.)
    alert("Thank you! We'll be in touch with your personalized quote.");
  };

  // Get average cost for selected state and type
  const costData = funeralCostsByState.find(f => f.state === selectedState);
  let costRange: string | undefined = undefined;
  if (costData && burialType) {
    const [min, max] = burialType === "burial" ? costData.burial : costData.cremation;
    costRange = `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  }

  let costBoxText = "Select your state and burial or cremation to see the average cost.";
  if (costRange) {
    costBoxText = `Average ${burialType.charAt(0).toUpperCase() + burialType.slice(1)} Cost in ${selectedState}: ${costRange}`;
  }

  // Get quote for Michigan only (demo)
  const quote = selectedState
    ? getNationalQuote(quoteGender, quoteAge, quoteCoverage, healthTier)
    : null;

  // Get cash value table for selected tier
  const cashValueTable = getCashValueTable(healthTier);

  // Modal state
  const [showSecureModal, setShowSecureModal] = useState(false);
  const [secureForm, setSecureForm] = useState({ name: "", contact: "", account: "", routing: "", agree: false });
  const [secureSubmitted, setSecureSubmitted] = useState(false);

  const handleSecureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSecureForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };
  const handleSecureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSecureSubmitted(true);
    // TODO: Integrate payment/ACH processing here
  };

  // Refund policy modal state
  const [showRefundModal, setShowRefundModal] = useState(false);

  // Add state for quote sharing modal
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [sharePhone, setSharePhone] = useState("");
  const [shareSuccess, setShareSuccess] = useState(false);

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300 relative overflow-x-hidden py-12 px-2">
      {/* Subtle background shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <svg width="100%" height="100%" className="absolute top-0 left-0 opacity-10" style={{zIndex:0}}>
          <circle cx="80%" cy="20%" r="180" fill="#3b82f6" />
          <circle cx="20%" cy="80%" r="120" fill="#60a5fa" />
        </svg>
      </div>
      {/* Page Header - now above the card */}
      <div className="w-full flex flex-col items-center justify-center mb-8 mt-2">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 bg-clip-text text-transparent drop-shadow-lg text-center">Final Expense Plans</h1>
        <p className="text-lg md:text-xl text-gray-700 font-medium text-center max-w-2xl">Affordable, easy-to-get coverage to protect your loved ones from funeral costs and final expenses.</p>
      </div>
      {/* Main Card - much wider, now floats below header */}
      <div className="relative z-10 w-full max-w-6xl rounded-3xl shadow-2xl bg-white/80 backdrop-blur-lg border border-blue-100 p-8 md:p-12 flex flex-col items-center">
        {/* State and Burial/Cremation Selection Row */}
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-center">
            <div className="relative w-full md:w-1/2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12 6v6l4 2"/></svg>
              </span>
              <select
                className="pl-10 pr-3 py-3 rounded-lg border border-blue-200 w-full bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg shadow-sm"
                value={selectedState}
                onChange={handleStateChange}
                required
              >
                <option value="">Select Your State</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="relative w-full md:w-1/2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg>
              </span>
              <select
                className="pl-10 pr-3 py-3 rounded-lg border border-blue-200 w-full bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg shadow-sm"
                value={burialType}
                onChange={handleBurialTypeChange}
                required
              >
                <option value="">Burial or Cremation?</option>
                <option value="burial">Burial</option>
                <option value="cremation">Cremation</option>
              </select>
            </div>
          </div>
          <div className={`rounded-xl px-6 py-4 font-semibold shadow text-center w-full mt-2 transition-colors duration-300 ${selectedState && burialType ? 'bg-red-100 text-red-900' : 'bg-green-100 text-green-900'}`}>
            <span>
              {costBoxText}
              {costRange && <sup className="ml-1 text-xs align-super">*</sup>}
            </span>
          </div>
          {/* Data source footnote */}
          <div className="w-full flex justify-end mt-0 mb-0" style={{marginTop: 0, marginBottom: 0}}>
            <span className="text-xs text-gray-500 italic">
              * Source: National Funeral Directors Association, 2024. Ranges are approximate and may vary by provider.
            </span>
          </div>
          {/* Callout above questionnaire */}
          {selectedState && burialType && (
            <div className="w-full flex justify-center my-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 shadow-lg rounded-2xl px-8 py-6 flex items-start gap-4 max-w-2xl mx-auto transition-transform duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer">
                <div className="flex-shrink-0 mt-1">
                  {/* Shield with checkmark icon (same as header) */}
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="shieldGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#2563eb" />
                        <stop offset="1" stopColor="#60a5fa" />
                      </linearGradient>
                    </defs>
                    <path d="M16 4L27 8V15C27 23 16 28 16 28C16 28 5 23 5 15V8L16 4Z" fill="url(#shieldGradient)" stroke="#1e40af" strokeWidth="2"/>
                    <path d="M12 16.5L15 19.5L20 13.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-blue-700 text-lg mb-1">Don't worry!</div>
                  <div className="text-blue-800 font-medium">
                    Millions of families are protecting their loved ones from financial burden with a Final Expense plan.
                    <div className="mt-2 font-semibold">Just answer a few questions to get started!</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Health Questionnaire */}
          {selectedState && burialType && (
            <>
              <div className="w-full bg-white/90 rounded-2xl shadow-lg p-2 flex flex-col gap-2 border border-blue-100 mt-2">
                <h2 className="text-2xl font-extrabold text-blue-700 flex items-center gap-2">
                  <span role="img" aria-label="stethoscope">🩺</span> Quick Health Questionnaire
                </h2>
                <p className="text-gray-700 mt-0">  Answer these questions to help us find the best plan for you. Your answers are private and only used to match you to the right coverage.</p>
                <div className="space-y-2">
                  {/* Q1 (tobacco) */}
                  <div className="p-5 rounded-xl bg-blue-50 shadow flex flex-col gap-2">
                    <div className="font-bold text-lg text-blue-800">
                      1. Have you used tobacco in the past 12 months?
                    </div>
                    <div className="flex gap-6 mt-2">
                      <label className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition border-2 ${q5 === 'yes' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-blue-200 hover:bg-blue-100'}`}>
                        <input type="radio" name="q5" value="yes" checked={q5 === "yes"} onChange={() => setQ5("yes")} className="accent-blue-600 w-5 h-5" />
                        Yes
                      </label>
                      <label className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition border-2 ${q5 === 'no' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-blue-200 hover:bg-blue-100'}`}>
                        <input type="radio" name="q5" value="no" checked={q5 === "no"} onChange={() => setQ5("no")} className="accent-blue-600 w-5 h-5" />
                        No
                      </label>
                    </div>
                  </div>
                  {/* Q2 (oxygen/wheelchair/nursing home) */}
                  <div className="p-5 rounded-xl bg-blue-50 shadow flex flex-col gap-2">
                    <div className="font-bold text-lg text-blue-800">
                      2. Do you currently use oxygen, a wheelchair, or reside in a nursing home?
                    </div>
                    <div className="flex gap-6 mt-2">
                      <label className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition border-2 ${q3 === 'yes' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-blue-200 hover:bg-blue-100'}`}>
                        <input type="radio" name="q3" value="yes" checked={q3 === "yes"} onChange={() => setQ3("yes")} className="accent-blue-600 w-5 h-5" />
                        Yes
                      </label>
                      <label className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition border-2 ${q3 === 'no' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-blue-200 hover:bg-blue-100'}`}>
                        <input type="radio" name="q3" value="no" checked={q3 === "no"} onChange={() => setQ3("no")} className="accent-blue-600 w-5 h-5" />
                        No
                      </label>
                    </div>
                  </div>
                  {/* Q3 (hospitalized overnight) */}
                  <div className="p-5 rounded-xl bg-blue-50 shadow flex flex-col gap-2">
                    <div className="font-bold text-lg text-blue-800">
                      3. In the past 2 years, have you been hospitalized overnight for any reason?
                    </div>
                    <div className="flex gap-6 mt-2">
                      <label className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition border-2 ${q2 === 'yes' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-blue-200 hover:bg-blue-100'}`}>
                        <input type="radio" name="q2" value="yes" checked={q2 === "yes"} onChange={() => setQ2("yes")} className="accent-blue-600 w-5 h-5" />
                        Yes
                      </label>
                      <label className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition border-2 ${q2 === 'no' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-blue-200 hover:bg-blue-100'}`}>
                        <input type="radio" name="q2" value="no" checked={q2 === "no"} onChange={() => setQ2("no")} className="accent-blue-600 w-5 h-5" />
                        No
                      </label>
                    </div>
                  </div>
                  {/* Q4 (well controlled conditions) */}
                  <div className="p-5 rounded-xl bg-blue-50 shadow flex flex-col gap-2">
                    <div className="font-bold text-lg text-blue-800">
                      4. Do you have any of the following conditions, but they are well controlled (e.g., with medication): high blood pressure, high cholesterol, type 2 diabetes (non-insulin)?
                    </div>
                    <div className="flex gap-6 mt-2">
                      <label className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition border-2 ${q4 === 'yes' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-blue-200 hover:bg-blue-100'}`}>
                        <input type="radio" name="q4" value="yes" checked={q4 === "yes"} onChange={() => setQ4("yes")} className="accent-blue-600 w-5 h-5" />
                        Yes
                      </label>
                      <label className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition border-2 ${q4 === 'no' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-blue-200 hover:bg-blue-100'}`}>
                        <input type="radio" name="q4" value="no" checked={q4 === "no"} onChange={() => setQ4("no")} className="accent-blue-600 w-5 h-5" />
                        No
                      </label>
                    </div>
                  </div>
                  {/* Q5 (diagnosed/treated for serious conditions) */}
                  <div className="p-5 rounded-xl bg-blue-50 shadow flex flex-col gap-2">
                    <div className="font-bold text-lg text-blue-800">
                      5. In the past 2 years, have you been diagnosed with, treated for, or advised to have treatment for any of the following: cancer (other than basal cell skin cancer), heart attack, stroke, congestive heart failure, COPD/emphysema, kidney failure, HIV/AIDS?
                    </div>
                    <div className="flex gap-6 mt-2">
                      <label className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition border-2 ${q1 === 'yes' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-blue-200 hover:bg-blue-100'}`}>
                        <input type="radio" name="q1" value="yes" checked={q1 === "yes"} onChange={() => setQ1("yes")} className="accent-blue-600 w-5 h-5" />
                        Yes
                      </label>
                      <label className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition border-2 ${q1 === 'no' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-blue-200 hover:bg-blue-100'}`}>
                        <input type="radio" name="q1" value="no" checked={q1 === "no"} onChange={() => setQ1("no")} className="accent-blue-600 w-5 h-5" />
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* Health Tier Result Box */}
              <div className="w-full flex justify-center my-4">
                <div className={`flex flex-col items-center px-8 py-4 rounded-2xl shadow border text-lg font-semibold ${healthTier === 'select1' ? 'bg-blue-50 text-blue-700 border-blue-200' : healthTier === 'select2' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                  <span>Your Health Tier: <span className="font-bold">{healthTier.replace('select', 'Select ')}</span></span>
                  <span className="text-sm font-normal mt-1 text-gray-500">This helps us match you to the most accurate rate.</span>
                </div>
              </div>
              {/* --- SLIDER SECTION: Now below the questionnaire --- */}
              <div className="w-full bg-white rounded-2xl shadow-lg p-8 mb-8 flex flex-col md:flex-row gap-8 items-center justify-between border border-blue-100 mt-6">
                <div className="flex flex-col gap-4 w-full md:w-2/3">
                  <div className="flex gap-6 items-center">
                    <label className="font-semibold text-blue-700">Gender:</label>
                    <label className="inline-flex items-center gap-1">
                      <input type="radio" name="gender" value="male" checked={quoteGender === 'male'} onChange={() => setQuoteGender('male')} className="accent-blue-700" />
                      Male
                    </label>
                    <label className="inline-flex items-center gap-1">
                      <input type="radio" name="gender" value="female" checked={quoteGender === 'female'} onChange={() => setQuoteGender('female')} className="accent-pink-600" />
                      Female
                    </label>
                  </div>
                  <div className="flex gap-6 items-center">
                    <label className="font-semibold text-blue-700" htmlFor="age-slider">Age:</label>
                    <input
                      id="age-slider"
                      type="range"
                      min={60}
                      max={80}
                      value={quoteAge}
                      onChange={e => setQuoteAge(Number(e.target.value))}
                      className="w-48 accent-blue-700"
                    />
                    <span className="font-bold text-lg text-blue-900 w-10 text-center">{quoteAge}</span>
                  </div>
                  <div className="flex gap-6 items-center">
                    <label className="font-semibold text-blue-700" htmlFor="coverage-slider">Coverage:</label>
                    <input
                      id="coverage-slider"
                      type="range"
                      min={5000}
                      max={20000}
                      step={1000}
                      value={quoteCoverage}
                      onChange={e => setQuoteCoverage(Number(e.target.value))}
                      className="w-48 accent-blue-700"
                    />
                    <span className="font-bold text-lg text-blue-900 w-20 text-center">${quoteCoverage.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-6 items-center">
                    <label className="font-semibold text-blue-700">Health Tier:</label>
                    <label className="inline-flex items-center gap-1">
                      <input type="radio" name="tier" value="select1" checked={healthTier === 'select1'} onChange={() => setHealthTier('select1')} className="accent-blue-700" />
                      Select 1
                    </label>
                    <label className="inline-flex items-center gap-1">
                      <input type="radio" name="tier" value="select2" checked={healthTier === 'select2'} onChange={() => setHealthTier('select2')} className="accent-green-600" />
                      Select 2
                    </label>
                    <label className="inline-flex items-center gap-1">
                      <input type="radio" name="tier" value="select3" checked={healthTier === 'select3'} onChange={() => setHealthTier('select3')} className="accent-yellow-600" />
                      Select 3
                    </label>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full md:w-1/3">
                  <div
                    className="bg-blue-600 text-white rounded-2xl px-10 py-6 shadow-xl text-center text-3xl font-extrabold tracking-tight min-h-[64px] flex flex-col items-center justify-center w-full transition-transform duration-150 hover:scale-105 cursor-pointer"
                    onClick={() => window.location.href = 'tel:5037645097'}
                    role="button"
                    tabIndex={0}
                    style={{ outline: 'none' }}
                  >
                    {selectedState && burialType && quote ? (
                      <>
                        <div className="flex items-baseline justify-center gap-2 w-full">
                          <span>${quote}</span>
                          <span className="text-base font-medium">/month</span>
                        </div>
                        <span className="text-xs text-white font-medium mt-2">Click to Secure</span>
                      </>
                    ) : (
                      <span className="text-lg font-semibold text-blue-100">Input info above to get your rate!</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 mt-2">* Final rates may vary based on official medical underwriting.</span>
                  {/* Share Quote Button */}
                  {selectedState && burialType && quote && (
                    <button
                      type="button"
                      className="mt-6 bg-blue-50 border border-gray-200 text-gray-800 px-3 py-1.5 rounded-md font-semibold text-sm shadow-sm hover:bg-blue-100 transition"
                      style={{ width: 'auto', minWidth: 'unset', fontSize: '0.95rem', padding: '0.4rem 1rem' }}
                      onClick={() => setShowShareModal(true)}
                    >
                      Send me my quote
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </form>
      </div>
      {showShareModal && ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative flex flex-col gap-6">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-blue-700 text-2xl" onClick={() => { setShowShareModal(false); setShareSuccess(false); setShareEmail(""); setSharePhone(""); }}>&times;</button>
            {!shareSuccess ? (
              <>
                <h2 className="text-2xl font-extrabold text-blue-700 mb-2">Send Your Quote</h2>
                <p className="text-gray-700 mb-2">Enter your email and/or phone number to receive your personalized quote.</p>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={async e => {
                    e.preventDefault();
                    const res = await fetch('/api/send-quote', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        email: shareEmail,
                        phone: sharePhone,
                        quote,
                        state: selectedState,
                        burialType,
                        gender: quoteGender,
                        age: quoteAge,
                        coverage: quoteCoverage,
                        healthTier,
                      }),
                    });
                    if (res.ok) setShareSuccess(true);
                    else alert('Failed to send quote');
                  }}
                >
                  <input
                    className="p-3 rounded border border-blue-200 focus:ring-2 focus:ring-blue-400"
                    type="email"
                    placeholder="Email"
                    value={shareEmail}
                    onChange={e => setShareEmail(e.target.value)}
                    required
                  />
                  <input
                    className="p-3 rounded border border-blue-200 focus:ring-2 focus:ring-blue-400"
                    type="tel"
                    placeholder="Phone"
                    value={sharePhone}
                    onChange={e => setSharePhone(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-800 transition mt-2"
                  >
                    Send My Quote
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-2xl font-extrabold text-blue-700">Quote Sent!</h2>
                <p className="text-gray-700 text-center">Check your email and/or phone for your personalized quote. We'll be in touch soon!</p>
                <button className="mt-2 px-6 py-2 rounded-lg bg-blue-700 text-white font-bold hover:bg-blue-800" onClick={() => { setShowShareModal(false); setShareSuccess(false); setShareEmail(""); setSharePhone(""); }}>Close</button>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default FinalExpensePage; 