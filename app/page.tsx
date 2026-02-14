'use client';

import { useState, useEffect } from 'react';
import { DOMAINS_FOR_SALE } from '@/data/domains';
import { siteConfig } from '@/config/site';

// Helper function to extract root domain without subdomain
const getRootDomain = (hostname: string): string => {
  // Remove www. if present
  const withoutWww = hostname.replace(/^www\./, '');
  
  // Split by dots
  const parts = withoutWww.split('.');
  
  // If it's localhost or an IP, return as is
  if (parts.length <= 2 || hostname === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    return withoutWww;
  }
  
  // For domains like subdomain.example.com or subdomain.example.co.uk
  // Return the last two parts (example.com) or three parts for special TLDs (example.co.uk)
  const specialTLDs = ['co.uk', 'com.au', 'co.jp', 'co.nz', 'co.za'];
  const lastTwoParts = parts.slice(-2).join('.');
  
  // Check if it's a special TLD
  if (specialTLDs.includes(lastTwoParts)) {
    return parts.slice(-3).join('.');
  }
  
  // Return domain.tld (last 2 parts)
  return lastTwoParts;
};

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get the domain from query parameter ?domain=example.com
    if (typeof window !== 'undefined') {
      console.log('🔍 Checking for domain parameter...');
      
      // Read domain from query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const domainParam = urlParams.get('domain');
      
      let hostname = '';
      
      if (domainParam) {
        // Use domain from query parameter
        console.log('✅ Domain found in query parameter:', domainParam);
        hostname = domainParam;
      } else {
        // Fallback to current hostname
        console.log('⚠️ No domain parameter found, using window.location.hostname');
        hostname = window.location.hostname;
      }
      
      console.log('Hostname:', hostname);
      const rootDomain = getRootDomain(hostname);
      console.log('🎯 Final root domain:', rootDomain);
      
      setCurrentDomain(rootDomain);
      setMounted(true);
    }
  }, []);

  // Get all domains (including current domain)
  const otherDomains = DOMAINS_FOR_SALE;

  // Structured Data for SEO - only render after mount to avoid hydration mismatch
  const structuredData = mounted ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: currentDomain || 'Premium Domain',
    description: `${currentDomain || 'Premium domain'} is available for purchase. Secure this memorable web address for your business.`,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      price: 'Contact for Price',
      url: window.location.href,
    },
    brand: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  } : null;

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
    <>
      {/* JSON-LD Structured Data - only render after mount */}
      {mounted && structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Hero Section with Current Domain */}
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-white">Available for Purchase</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6 break-all px-4 text-shadow-lg animate-gradient leading-tight">
            {currentDomain || 'Loading...'}
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 font-light max-w-3xl mx-auto">
            Domain Name <span className="text-purple-400 font-semibold">For Sale</span>
          </p>
          
          <p className="text-base md:text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Secure this memorable domain for your brand. Perfect for businesses, startups, 
            and ambitious projects looking to make an impact.
          </p>
          
          <button 
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({behavior: 'smooth'})}
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            <span>Make an Offer</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Instant Transfer</h3>
            <p className="text-gray-400 text-sm">Quick and secure domain transfer process</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Secure Payment</h3>
            <p className="text-gray-400 text-sm">Safe and encrypted transaction methods</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Full Support</h3>
            <p className="text-gray-400 text-sm">Dedicated assistance throughout the process</p>
          </div>
        </div>

        {/* Other Domains Section */}
        {otherDomains.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                More Domains
              </h2>
              <p className="text-gray-400 text-lg">Explore our collection of available domains</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {otherDomains.map((domain, index) => (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-white break-all group-hover:text-purple-400 transition-colors">
                      {domain}
                    </h3>
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span>Available Now</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Form Section */}
        <div id="contact-form" className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Make It Happen
            </h2>
            <p className="text-gray-300 text-lg">
              Submit your inquiry and we'll get back to you within 24 hours
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-200 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-200 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="interestedDomain" className="block text-sm font-semibold text-gray-200 mb-2">
                  Domain of Interest *
                </label>
                <select
                  id="interestedDomain"
                  name="interestedDomain"
                  required
                  value={formData.interestedDomain}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-900">Select a domain...</option>
                  <option value={currentDomain} className="bg-slate-900">{currentDomain} (Current)</option>
                  {otherDomains.map((domain, index) => (
                    <option key={index} value={domain} className="bg-slate-900">
                      {domain}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-200 mb-2">
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm resize-none"
                placeholder="Tell us about your interest in this domain..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Inquiry</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>

            {submitMessage && (
              <div
                className={`p-4 rounded-xl border backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300 ${
                  submitMessage.includes('Thank you')
                    ? 'bg-green-500/20 border-green-500/50 text-green-300'
                    : 'bg-red-500/20 border-red-500/50 text-red-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {submitMessage.includes('Thank you') ? (
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  <p>{submitMessage}</p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <footer className="text-center mt-20 pt-12 border-t border-white/10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Ready to grow?</h3>
                <p className="text-gray-400">Secure your domain today</p>
              </div>
              <button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({behavior: 'smooth'})}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                Contact Us
              </button>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 mb-6">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Secure Transfer
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Fast Processing
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                24/7 Support
              </span>
            </div>
            
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>
            
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Domains. All rights reserved. All domains listed are available for purchase.
            </p>
          </div>
        </footer>
      </div>
    </div>
    </>
  );
}
