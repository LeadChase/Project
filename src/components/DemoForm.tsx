{formState.submitted ? (
  <div className="text-center py-10 animate-fadein">
    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6 animate-pop">
      <Check className="h-8 w-8 text-red-600" />
    </div>
    <h4 className="text-xl font-semibold text-gray-900 mb-2">Thank you!</h4>
    <p className="text-gray-600">We've received your request and will be in touch shortly.</p>
  </div>
) : (
  <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formState.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="John Smith"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formState.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="john@example.com"
        />
      </div>
    </div>
    <div>
      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
        Company Name
      </label>
      <input
        type="text"
        id="company"
        name="company"
        value={formState.company}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
        placeholder="Your Company"
      />
    </div>
    <div>
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
        Phone Number
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formState.phone}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
        placeholder="(555) 123-4567"
      />
    </div>
    <div>
      <label htmlFor="mostImportantQuestion" className="block text-sm font-medium text-gray-700 mb-1">
        What's your most important question about our platform?
      </label>
      <textarea
        id="mostImportantQuestion"
        name="mostImportantQuestion"
        value={formState.mostImportantQuestion}
        onChange={handleChange}
        rows={3}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
        placeholder="Tell us what you'd like to know..."
      />
    </div>
    <div>
      <label htmlFor="howDidYouFindUs" className="block text-sm font-medium text-gray-700 mb-1">
        How did you find us?
      </label>
      <select
        id="howDidYouFindUs"
        name="howDidYouFindUs"
        value={formState.howDidYouFindUs}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
      >
        <option value="">Select an option</option>
        <option value="google">Google Search</option>
        <option value="social">Social Media</option>
        <option value="referral">Referral</option>
        <option value="other">Other</option>
      </select>
    </div>
    <div>
      <label htmlFor="estimatedMonthlyLeadVolume" className="block text-sm font-medium text-gray-700 mb-1">
        Estimated Monthly Lead Volume
      </label>
      <select
        id="estimatedMonthlyLeadVolume"
        name="estimatedMonthlyLeadVolume"
        value={formState.estimatedMonthlyLeadVolume}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
      >
        <option value="">Select volume</option>
        <option value="1-50">1-50 leads/month</option>
        <option value="51-200">51-200 leads/month</option>
        <option value="201-500">201-500 leads/month</option>
        <option value="500+">500+ leads/month</option>
      </select>
    </div>
    <div>
      <label htmlFor="crmSystem" className="block text-sm font-medium text-gray-700 mb-1">
        Current CRM System
      </label>
      <select
        id="crmSystem"
        name="crmSystem"
        value={formState.crmSystem}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
      >
        <option value="">Select CRM</option>
        <option value="salesforce">Salesforce</option>
        <option value="hubspot">HubSpot</option>
        <option value="zoho">Zoho</option>
        <option value="other">Other</option>
        <option value="none">No CRM</option>
      </select>
    </div>
    <div>
      <label htmlFor="leadType" className="block text-sm font-medium text-gray-700 mb-1">
        Primary Lead Type
      </label>
      <select
        id="leadType"
        name="leadType"
        value={formState.leadType}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
      >
        <option value="">Select lead type</option>
        <option value="buyers">Buyers</option>
        <option value="sellers">Sellers</option>
        <option value="renters">Renters</option>
        <option value="mixed">Mixed</option>
      </select>
    </div>
    <div>
      <button
        type="submit"
        disabled={formState.loading}
        className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium text-lg shadow-lg hover:shadow-xl hover:from-red-700 hover:to-rose-700 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {formState.loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Request Demo"
        )}
      </button>
    </div>
  </form>
)} 