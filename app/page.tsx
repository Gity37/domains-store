'use client';

import { useState, useEffect } from 'react';

// List of domains for sale (you can modify this list)
const DOMAINS_FOR_SALE = [
  'example-domain1.com',
  'example-domain2.com',
  'example-domain3.com',
  'premium-site.com',
  'best-domain.com',
  'super-domain.com',
];

export default function Home() {
  const [currentDomain, setCurrentDomain] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interestedDomain: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    // Get the current domain from window.location
    if (typeof window !== 'undefined') {
      setCurrentDomain(window.location.hostname);
    }
  }, []);

  // Get other domains (exclude current domain)
  const otherDomains = DOMAINS_FOR_SALE.filter(
    domain => domain !== currentDomain
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Send form data to API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          currentDomain,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage('Thank you! Your message has been sent successfully.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          interestedDomain: '',
        });
      } else {
        setSubmitMessage(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section with Current Domain */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4 break-all">
            {currentDomain || 'Loading...'}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8">
            This Premium Domain Is For Sale
          </p>
          <div className="inline-block bg-green-500 text-white px-8 py-4 rounded-full text-xl font-semibold">
            🔥 Available Now
          </div>
        </div>

        {/* Other Domains Section */}
        {otherDomains.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
              Other Premium Domains Available
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherDomains.map((domain, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 break-all">
                      {domain}
                    </h3>
                    <span className="text-green-500 text-2xl">✓</span>
                  </div>
                  <p className="text-gray-600">Available for purchase</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Form Section */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Interested? Get In Touch
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="interestedDomain" className="block text-sm font-medium text-gray-700 mb-2">
                Which Domain Are You Interested In? *
              </label>
              <select
                id="interestedDomain"
                name="interestedDomain"
                required
                value={formData.interestedDomain}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a domain...</option>
                <option value={currentDomain}>{currentDomain} (Current)</option>
                {otherDomains.map((domain, index) => (
                  <option key={index} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about your interest in this domain..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </button>

            {submitMessage && (
              <div
                className={`p-4 rounded-lg ${
                  submitMessage.includes('Thank you')
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {submitMessage}
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-600">
          <p className="text-sm">
            © {new Date().getFullYear()} - All domains listed are available for purchase.
          </p>
        </div>
      </div>
    </div>
  );
}
