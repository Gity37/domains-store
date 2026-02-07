/**
 * Site Configuration for SEO and Metadata
 * 
 * Update this file with your specific domain and contact information
 */

export const siteConfig = {
  name: "Domain For Sale",
  description:
    "Domain name available for immediate purchase. Secure this memorable web address for your business, startup, or project. Fast transfer, secure payment, and full support included.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/yourusername",
    github: "https://github.com/yourusername",
  },
  contact: {
    email: "contact@yourdomain.com",
    phone: "+1 (555) 123-4567",
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
