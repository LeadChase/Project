import { useEffect } from 'react';

export function About() {
  useEffect(() => {
    document.title = 'About | LeadChoose';
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About LeadChoose</h1>
      
      <div className="prose max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-6">
            At LeadChoose, we're revolutionizing how real estate professionals handle lead generation and nurturing through AI-powered automation. Our mission is to help agents focus on what they do best - closing deals and building relationships.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What Sets Us Apart</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">AI-Powered Intelligence</h3>
              <p className="text-gray-700">
                Our advanced AI algorithms analyze lead behavior and preferences to provide personalized engagement strategies.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Multi-Channel Automation</h3>
              <p className="text-gray-700">
                Seamlessly engage leads across email, SMS, and voice channels with intelligent automation.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="list-disc pl-6 space-y-4">
            <li className="text-lg text-gray-700">
              <strong>Innovation:</strong> Continuously pushing the boundaries of what's possible in real estate technology
            </li>
            <li className="text-lg text-gray-700">
              <strong>Reliability:</strong> Building robust solutions that agents can depend on
            </li>
            <li className="text-lg text-gray-700">
              <strong>Customer Success:</strong> Dedicated to helping our clients achieve their business goals
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Join Our Journey</h2>
          <p className="text-lg text-gray-700 mb-6">
            We're building the future of real estate lead management, and we invite you to be part of this revolution. Join our waitlist today to get early access and exclusive benefits.
          </p>
          <a
            href="/join-waitlist"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Join Waitlist
          </a>
        </section>
      </div>
    </div>
  );
} 