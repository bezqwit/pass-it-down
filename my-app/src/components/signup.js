import { useState } from 'react';
import './Auth.css';

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    school: '',
    email: '',
    verificationCode: '',
    name: '',
    year: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSchoolSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Send verification code logic here
    console.log('Sending code to:', formData.email);
    setStep(3);
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    // Verify code logic here
    console.log('Verifying code:', formData.verificationCode);
    setStep(4);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    // Complete signup logic here
    console.log('Complete signup:', formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <div className="progress-bar">
          <div className="progress-step" data-active={step >= 1}>1</div>
          <div className="progress-line" data-active={step >= 2}></div>
          <div className="progress-step" data-active={step >= 2}>2</div>
          <div className="progress-line" data-active={step >= 3}></div>
          <div className="progress-step" data-active={step >= 3}>3</div>
          <div className="progress-line" data-active={step >= 4}></div>
          <div className="progress-step" data-active={step >= 4}>4</div>
        </div>

        {step === 1 && (
          <form onSubmit={handleSchoolSubmit} className="auth-form">
            <p className="auth-subtitle">Select your school</p>
            <div className="form-group">
              <label htmlFor="school">School Name</label>
              <select
                id="school"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                required
              >
                <option value="">Choose your school...</option>
                <option value="mit">MIT</option>
                <option value="harvard">Harvard University</option>
                <option value="stanford">Stanford University</option>
                <option value="berkeley">UC Berkeley</option>
                {/* Add more schools */}
              </select>
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              Continue
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleEmailSubmit} className="auth-form">
            <p className="auth-subtitle">Verify your school email</p>
            <div className="form-group">
              <label htmlFor="email">School Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@university.edu"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              Send Verification Code
            </button>
            <button 
              type="button" 
              className="btn btn-text"
              onClick={() => setStep(1)}
            >
              Back
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleVerificationSubmit} className="auth-form">
            <p className="auth-subtitle">Enter the code sent to {formData.email}</p>
            <div className="form-group">
              <label htmlFor="code">Verification Code</label>
              <input
                type="text"
                id="code"
                name="verificationCode"
                placeholder="Enter 6-digit code"
                value={formData.verificationCode}
                onChange={handleInputChange}
                maxLength="6"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              Verify
            </button>
            <button 
              type="button" 
              className="btn btn-text"
              onClick={() => setStep(2)}
            >
              Back
            </button>
          </form>
        )}

        {step === 4 && (
          <form onSubmit={handleFinalSubmit} className="auth-form">
            <p className="auth-subtitle">Complete your profile</p>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year</label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
              >
                <option value="">Select year...</option>
                <option value="freshman">Freshman</option>
                <option value="sophomore">Sophomore</option>
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>
                <option value="graduate">Graduate</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              Create Account
            </button>
          </form>
        )}

        <div className="auth-footer">
          <p>Already have an account? <a href="/login">Sign in</a></p>
        </div>
      </div>
    </div>
  );
}