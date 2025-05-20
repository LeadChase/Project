import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const RequestDemo: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/waitlist/request-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setIsSuccess(data.success);
      setMessage(data.message);
      
      if (data.success) {
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        });
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="request-demo">
      <h2>Request a Demo</h2>
      
      <form onSubmit={handleSubmit} className="demo-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Smith"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Work Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@company.com"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company Inc."
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">How can we help you?</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your lead generation needs..."
            className="form-textarea"
            rows={4}
          />
        </div>

        {message && (
          <div className={`message ${isSuccess ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isLoading}
          className="submit-button"
        >
          {isLoading ? 'Submitting...' : 'Request Demo'}
        </button>
      </form>
    </div>
  );
};

export default RequestDemo; 