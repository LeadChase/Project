import React, { useState, useEffect } from 'react';

interface FormData {
  email: string;
  name: string;
  company?: string;
  message?: string;
}

export function Waitlist() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    document.title = 'Join Waitlist | LeadChoose';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/waitlist/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setSubmitStatus({
        success: data.success,
        message: data.message,
      });

      if (data.success) {
        setFormData({
          email: '',
          name: '',
          company: '',
          message: ''
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'An error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join the LeadChoose Waitlist
          </h1>
          <p className="text-xl text-gray-600">
            Be among the first to experience AI-powered lead generation for real estate
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                type="text"
                name="company"
                id="company"
                value={formData.company}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Your Real Estate Company"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message (Optional)
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Tell us what you're most excited about..."
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
              </button>
            </div>

            {submitStatus && (
              <div
                className={`mt-4 p-4 rounded-md ${
                  submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}
              >
                {submitStatus.message}
              </div>
            )}
          </form>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              What you'll get:
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-indigo-600">✨</span>
                <span className="ml-3">Early access to LeadChoose platform</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-indigo-600">💰</span>
                <span className="ml-3">50% discount on launch pricing</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-indigo-600">🎯</span>
                <span className="ml-3">Priority onboarding and support</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-indigo-600">🔔</span>
                <span className="ml-3">Exclusive updates and feature previews</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 