import React, { useState, useEffect } from 'react';

interface FormData {
  
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  monthlyLeadVolume: string;
  crmSystem: string;
  sampleSimulation: string;
  additionalComments: string;
}

export function RequestDemo() {
  useEffect(() => {
    document.title = 'Test the System | LeadChoose';
  }, []);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    monthlyLeadVolume: '',
    crmSystem: '',
    sampleSimulation: '',
    additionalComments: ''
    
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you would typically send the form data to your backend

    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      // Reset form after successful submission
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        monthlyLeadVolume: '',
        crmSystem: '',
        sampleSimulation: '',
        additionalComments: ''
      });
      

      alert('Thank you for your interest! We will contact you shortly.');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
     <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-2xl mx-auto bg-gradient-to-b from-red-200 to-rose rounded-lg shadow-md p-8 mt-20">
        <div className="mb-8">
          <img 
            src="/LeadChoose.png" 
            alt="LeadChoose Logo" 
            className="h-28 w-56 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Test the System
          </h2>
          <p className="text-center text-gray-600">
            Please fill in your details below to test our system and learn more about our services. You can schedule a demo or request a test run.
          </p>
        </div>
        

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 required">
              Business Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

         {/* Name Fields */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 required">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 required">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

        {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 required">
              Cell Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          {/* Monthly Lead Volume */}
          <div>
            <label htmlFor="monthlyLeadVolume" className="block text-sm font-medium text-gray-700 required">
              Your Estimated Monthly Lead Volume
            </label>
            <select
              name="monthlyLeadVolume"
              id="monthlyLeadVolume"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              value={formData.monthlyLeadVolume}
              onChange={handleInputChange}
            >
              <option value="">Select volume</option>
              <option value="Less than 50">Less than 50</option>
              <option value="50-100">50-100</option>
              <option value="100-500">100-500</option>
              <option value="500-1000">500-1000</option>
              <option value="1000+">1000+</option>
            </select>
          </div>


        {/* CRM System */}
          <div>
            <label htmlFor="crmSystem" className="block text-sm font-medium text-gray-700 required">
              CRM System You Use
            </label>
            <input
              type="text"
              name="crmSystem"
              id="crmSystem"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              value={formData.crmSystem}
              onChange={handleInputChange}
              placeholder="e.g., Salesforce, HubSpot, etc."
            />
          </div>
        {/* Sample Simulation */}
          <div>
            <label htmlFor="sampleSimulation" className="block text-sm font-medium text-gray-700 required">
              Choose Sample Simulation
            </label>
            <select
              name="sampleSimulation"
              id="sampleSimulation"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              value={formData.sampleSimulation}
              onChange={handleInputChange}
            >
              <option value="">Select simulation</option>
              <option value="Real Estate Sales">Real Estate Buyer</option>
              <option value="Real Estate Other">Real Estate Seller</option>
              <option value="Auto Estate Sales">Real Estate Renter</option>
            </select>
          </div>

          {/* Additional Comments */}
          <div>
            <label htmlFor="additionalComments" className="block text-sm font-medium text-gray-700">
              Additional Comments
            </label>
            <textarea
              name="additionalComments"
              id="additionalComments"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              value={formData.additionalComments}
              onChange={handleInputChange}
            />
          </div>

          {/* Legal Text */}
          <div className="text-sm text-gray-500">
            <p>
              By entering your information and submitting this form, you agree to our Terms of Service and Privacy Policy. Rest assured that your information will be used according to your best interests. We will contact you shortly to schedule a demo. Please note that you will manage your own leads and there will be no TCPA or CCPA to cancel.
            </p>
            <p className="mt-2">
              Copyright © 2025 LeadChoose. All rights reserved.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Close form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RequestDemo;