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
    "Premium domain names available for immediate purchase. Buy high-quality web addresses perfect for businesses, startups, and projects. Secure domain acquisition with fast transfer, safe payment processing, and complete customer support. Explore our marketplace of brandable domains for sale.",
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
    "buy domain name",
    "premium domain",
    "domain marketplace",
    "purchase domain",
    "domain acquisition",
    "domain broker",
    "sell domain",
    "domain transfer",
    "web address for sale",
    "domain name purchase",
    "business domain",
    "startup domain",
    "brandable domain",
    "memorable domain",
    "domain investment",
    "domain trading",
    "domain auction",
    "aftermarket domains",
    "expired domains",
  ],
  verification: {
    google: "", // Add your Google Search Console verification code
    bing: "", // Add your Bing Webmaster verification code
  },
};
