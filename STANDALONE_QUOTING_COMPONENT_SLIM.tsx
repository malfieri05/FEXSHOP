import React, { useState } from "react";
import { getNationalQuote, getCashValueTable } from "./csvQuoteUtils";

// Streamlined Final Expense Insurance Quoting Component
// Copy this file to your new project along with csvQuoteUtils.ts

const FinalExpenseQuotingTool: React.FC = () => {
  // Form state
  const [form, setForm] = useState({ name: "", age: "", state: "", coverage: "", health: "", email: "" });

  // Quote slider state
  const [quoteGender, setQuoteGender] = useState<'male' | 'female'>('male');
  const [quoteAge, setQuoteAge] = useState(50);
  const [quoteCoverage, setQuoteCoverage] = useState(5000);
  const [healthTier, setHealthTier] = useState<'select1' | 'select2' | 'select3'>('select1');

  // Health questionnaire state
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);
  const [q4, setQ4] = useState<string | null>(null);
  const [q5, setQ5] = useState<string | null>(null);

  // Auto-classify health tier based on answers
  React.useEffect(() => {
    if ([q1, q2, q3, q4, q5].every(q => q === "yes")) {
      setHealthTier("select3");
    } else if ([q1, q2, q3, q4, q5].filter(q => q === "yes").length >= 3) {
      setHealthTier("select2");
    } else if ([q1, q2, q3, q4, q5].every(q => q === "no")) {
      setHealthTier("select1");
    }
  }, [q1, q2, q3, q4, q5]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    setSubmitSuccess(false);

    try {
      // Update this URL to your backend endpoint
      const response = await fetch('YOUR_BACKEND_URL/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          age: form.age,
          state: form.state,
          coverage: form.coverage,
          health: form.health,
          email: form.email,
          healthTier,
          healthAnswers: { q1, q2, q3, q4, q5 },
          quoteData: {
            gender: quoteGender,
            age: quoteAge,
            coverage: quoteCoverage,
            monthlyRate: quote
          }
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        // Reset form
        setForm({ name: "", age: "", state: "", coverage: "", health: "", email: "" });
        setHealthTier('select1');
        setQ1(null);
        setQ2(null);
        setQ3(null);
        setQ4(null);
        setQ5(null);
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get quote
  const quote = getNationalQuote(quoteGender, quoteAge, quoteCoverage, healthTier);

  // Modal state
  const [showSecureQuoteModal, setShowSecureQuoteModal] = useState(false);

  const handleSecureQuoteClick = () => {
    setShowSecureQuoteModal(true);
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300 relative overflow-x-hidden py-12 px-2">
      {/* Background shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <svg width="100%" height="100%" className="absolute top-0 left-0 opacity-10" style={{zIndex:0}}>
          <circle cx="80%" cy="20%" r="180" fill="#3b82f6" />
          <circle cx="20%" cy="80%" r="120" fill="#60a5fa" />
        </svg>
      </div>

      {/* Page Header */}
      <div className="w-full flex flex-col items-center justify-center mb-8 mt-2">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 bg-clip-text text-transparent drop-shadow-lg text-center">
          Final Expense Plans
        </h1>
        <p className="text-lg md:text-xl text-gray-700 font-medium text-center max-w-2xl">
          Instant Quote. No SSN required. No spam calls.
        </p>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto">
        {/* Health Questionnaire */}
        <div className="bg-white/90 rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
            Quick Health Questionnaire
          </h2>
          <p className="text-gray-700 mb-4 text-center">
            Answer these questions to help us find the best plan for you.
          </p>

          {/* Question 1 */}
          <div className="p-4 rounded-xl bg-blue-50 shadow mb-4">
            <div className="font-bold text-lg text-blue-800 text-center mb-3">
              1. Have you used tobacco in the past 12 months?
            </div>
            <div className="flex justify-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition border-2 hover:bg-blue-100">
                <input type="radio" name="q5" value="yes" checked={q5 === "yes"} onChange={() => setQ5("yes")} className="accent-blue-600" />
                Yes
              </label>
              <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition border-2 hover:bg-blue-100">
                <input type="radio" name="q5" value="no" checked={q5 === "no"} onChange={() => setQ5("no")} className="accent-blue-600" />
                No
              </label>
            </div>
          </div>

          {/* Question 2 */}
          <div className="p-4 rounded-xl bg-blue-50 shadow mb-4">
            <div className="font-bold text-lg text-blue-800 text-center mb-3">
              2. Do you currently use oxygen, a wheelchair, or reside in a nursing home?
            </div>
            <div className="flex justify-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition border-2 hover:bg-blue-100">
                <input type="radio" name="q3" value="yes" checked={q3 === "yes"} onChange={() => setQ3("yes")} className="accent-blue-600" />
                Yes
              </label>
              <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition border-2 hover:bg-blue-100">
                <input type="radio" name="q3" value="no" checked={q3 === "no"} onChange={() => setQ3("no")} className="accent-blue-600" />
                No
              </label>
            </div>
          </div>

          {/* Question 3 */}
          <div className="p-4 rounded-xl bg-blue-50 shadow mb-4">
            <div className="font-bold text-lg text-blue-800 text-center mb-3">
              3. Have you been hospitalized overnight in the past 2 years?
            </div>
            <div className="flex justify-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition border-2 hover:bg-blue-100">
                <input type="radio" name="q2" value="yes" checked={q2 === "yes"} onChange={() => setQ2("yes")} className="accent-blue-600" />
                Yes
              </label>
              <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition border-2 hover:bg-blue-100">
                <input type="radio" name="q2" value="no" checked={q2 === "no"} onChange={() => setQ2("no")} className="accent-blue-600" />
                No
              </label>
            </div>
          </div>

          {/* Question 4 */}
          <div className="p-4 rounded-xl bg-blue-50 shadow mb-4">
            <div className="font-bold text-lg text-blue-800 text-center mb-3">
              4. Do you have any of the following conditions, but they are well controlled: high blood pressure, high cholesterol, type 2 diabetes (non-insulin)?
            </div>
            <div className="flex justify-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition border-2 hover:bg-blue-100">
                <input type="radio" name="q4" value="yes" checked={q4 === "yes"} onChange={() => setQ4("yes")} className="accent-blue-600" />
                Yes
              </label>
              <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition border-2 hover:bg-blue-100">
                <input type="radio" name="q4" value="no" checked={q4 === "no"} onChange={() => setQ4("no")} className="accent-blue-600" />
                No
              </label>
            </div>
          </div>

          {/* Question 5 */}
          <div className="p-4 rounded-xl bg-blue-50 shadow mb-4">
            <div className="font-bold text-lg text-blue-800 text-center mb-3">
              5. In the past 2 years, have you been diagnosed with, treated for, or advised to have treatment for: cancer, heart attack, stroke, congestive heart failure, COPD/emphysema, kidney failure, HIV/AIDS?
            </div>
            <div className="flex justify-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition border-2 hover:bg-blue-100">
                <input type="radio" name="q1" value="yes" checked={q1 === "yes"} onChange={() => setQ1("yes")} className="accent-blue-600" />
                Yes
              </label>
              <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition border-2 hover:bg-blue-100">
                <input type="radio" name="q1" value="no" checked={q1 === "no"} onChange={() => setQ1("no")} className="accent-blue-600" />
                No
              </label>
            </div>
          </div>

          {/* Health Tier Result */}
          <div className="text-center">
            <div className={`inline-block px-6 py-3 rounded-xl font-bold text-lg ${
              healthTier === 'select1' ? 'bg-blue-100 text-blue-700' : 
              healthTier === 'select2' ? 'bg-green-100 text-green-700' : 
              'bg-yellow-100 text-yellow-700'
            }`}>
              Your Health Tier: {healthTier.replace('select', 'Select ')}
            </div>
          </div>
        </div>

        {/* Quote Sliders */}
        <div className="bg-white/90 rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            Customize Your Quote
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Sliders */}
            <div className="space-y-6">
              {/* Age Slider */}
              <div className="text-center">
                <label className="font-semibold text-blue-700 text-lg mb-2 block">Age: {quoteAge}</label>
                <input
                  type="range"
                  min={60}
                  max={80}
                  value={quoteAge}
                  onChange={e => setQuoteAge(Number(e.target.value))}
                  className="w-full accent-blue-700"
                />
              </div>

              {/* Coverage Slider */}
              <div className="text-center">
                <label className="font-semibold text-blue-700 text-lg mb-2 block">
                  Coverage: ${quoteCoverage.toLocaleString()}
                </label>
                                  <input
                    type="range"
                    min={5000}
                    max={40000}
                    step={1000}
                    value={quoteCoverage}
                    onChange={e => setQuoteCoverage(Number(e.target.value))}
                    className="w-full accent-blue-700"
                  />
              </div>

              {/* Gender Selection */}
              <div className="text-center">
                <label className="font-semibold text-blue-700 text-lg mb-2 block">Gender:</label>
                <div className="flex justify-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value="male" checked={quoteGender === 'male'} onChange={() => setQuoteGender('male')} className="accent-blue-700" />
                    Male
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value="female" checked={quoteGender === 'female'} onChange={() => setQuoteGender('female')} className="accent-blue-700" />
                    Female
                  </label>
                </div>
              </div>
            </div>

            {/* Quote Display */}
            <div className="flex items-center justify-center">
              <div
                className="bg-blue-600 text-white rounded-2xl px-8 py-8 shadow-xl text-center cursor-pointer transition-transform duration-150 hover:scale-105"
                onClick={handleSecureQuoteClick}
              >
                {quote ? (
                  <>
                    <div className="text-4xl font-bold mb-2">${quote}</div>
                    <div className="text-lg">/month</div>
                    <div className="text-sm mt-2">Click to Secure</div>
                  </>
                ) : (
                  <div className="text-xl font-semibold">Complete questionnaire to get your rate!</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        {quote && (
          <div className="bg-white/90 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
              Get Your Quote
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Get My Quote'}
              </button>
            </form>

            {submitSuccess && (
              <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-center">
                Quote sent successfully! Check your email.
              </div>
            )}

            {submitError && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-center">
                Error sending quote. Please try again.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Secure Quote Modal */}
      {showSecureQuoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Secure Your Quote</h3>
            <p className="text-gray-600 mb-6">
              Call us now to lock in your rate and get started with your final expense plan.
            </p>
            <a
              href="tel:5037645097"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-blue-700 transition"
            >
              (503) 764-5097
            </a>
            <button
              onClick={() => setShowSecureQuoteModal(false)}
              className="block w-full mt-4 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FinalExpenseQuotingTool; 