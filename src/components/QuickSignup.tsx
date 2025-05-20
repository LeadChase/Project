import React, { useState } from 'react';

const QuickSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setIsSuccess(data.success);
      setMessage(data.message);
      
      if (data.success) {
        setEmail('');
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="quick-signup">
      <h2>AI-Powered Lead Automation</h2>
      <p>LeadFlow helps real estate agents nurture leads automatically across Email, SMS & Voice. Focus on what matters most — closing deals.</p>
      
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="email-input"
          />
          <button 
            type="submit" 
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? 'Please wait...' : 'Get Early Access'}
          </button>
        </div>
        
        {message && (
          <div className={`message ${isSuccess ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        
        <p className="disclaimer">Be the first to know. No spam, ever.</p>
      </form>
    </div>
  );
};

export default QuickSignup; 