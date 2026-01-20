/**
 * Centralized constants for the application.
 * Values are read from environment variables for easy configuration.
 */

export const SITE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  name: 'CodeProps',
};

export const SOCIAL_LINKS = {
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/codeprops',
  github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/codeprops',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/codeprops',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/codeprops',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/codeprops',
};

export const CONTACT_INFO = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@codeprops.com',
  solutionsEmail: process.env.NEXT_PUBLIC_SOLUTIONS_EMAIL || 'solutions@codeprops.com',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+49 (176) 62025331',
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'Global Elite Tech Center, Silicon Valley / Istanbul',
};
