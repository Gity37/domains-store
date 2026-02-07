/**
 * Site Configuration for SEO and Metadata
 * 
 * Update this file with your specific domain and contact information
 */

/**
 * Get the current site URL dynamically
 * Works with multiple domains automatically
 */
export const getSiteUrl = () => {
  // In production, use the current domain
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}`;
  }
  // Fallback for SSR
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
};

export const siteConfig = {
  name: "Domain For Sale",
  description:
    "Domain name available for immediate purchase. Secure this memorable web address for your business, startup, or project. Fast transfer, secure payment, and full support included.",
  // URL is dynamic and will match whatever domain is being accessed
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  links: {
    linkdin: "https://www.linkedin.com/in/c%C3%A9sar-gonz%C3%A1lez-tar%C3%ADn/",
    github: "https://github.com/Gity37",
  },
  contact: {
    email: "cgleztarin@hotmail.com"
  },
  keywords: [
    "domain for sale",
    "premium domain",
    "buy domain",
    "domain purchase",
    "web address",
    "domain name",
    "business domain",
    "startup domain",
    "memorable domain",
    "brandable domain",
  ],
  verification: {
    google: "", // Add your Google Search Console verification code
    bing: "", // Add your Bing Webmaster verification code
  },
};
