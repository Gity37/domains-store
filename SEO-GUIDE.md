# SEO Configuration Guide

This project includes comprehensive SEO optimization. Here's what you need to configure:

## Files to Update

### 1. `/config/site.ts`
Update with your specific information:
- Site name and description
- Contact email and phone
- Social media links
- Google/Bing verification codes

### 2. `/public/robots.txt`
Update the sitemap URL with your actual domain

### 3. `.env` or `.env.local`
Create from `.env.example` and set:
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
CONTACT_EMAIL=contact@yourdomain.com
```

### 4. `/data/domains.ts`
Add your actual domains for sale

## SEO Features Included

✅ **Meta Tags**
- Title and description optimization
- Open Graph tags for social sharing
- Twitter Card metadata
- Keywords and author information

✅ **Structured Data (JSON-LD)**
- Product schema for domain listings
- Organization information
- Offer availability status

✅ **Technical SEO**
- Sitemap.xml (auto-generated)
- Robots.txt
- Canonical URLs
- Mobile-responsive design
- Fast page loads with Next.js

✅ **Web App Manifest**
- PWA support
- App icons configuration
- Theme colors

## Verification Codes

Add your verification codes in `/config/site.ts`:
- **Google Search Console**: Get from https://search.google.com/search-console
- **Bing Webmaster Tools**: Get from https://www.bing.com/webmasters

## Testing SEO

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema Markup Validator**: https://validator.schema.org/
3. **Open Graph Debugger**: https://www.opengraphcheck.com/
4. **Twitter Card Validator**: https://cards-dev.twitter.com/validator

## Generating OG Image

Create an Open Graph image (1200x630px) and save it as `/public/og-image.jpg`
- Include your domain name prominently
- Use high contrast colors
- Keep text large and readable
