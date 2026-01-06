# Codeprops - Multilingual Static Website

A production-ready, high-performance, multilingual static website built with Next.js 15, featuring support for English, German, and Arabic (RTL).

## 🚀 **Features**

### Core Features
- ✅ **100% Static Export** - No runtime server required
- ✅ **Perfect Lighthouse Scores** - Optimized for performance
- ✅ **Multilingual Support** - EN, DE, AR with RTL
- ✅ **SEO Optimized** - Structured data, sitemaps, metadata
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Modern UI** - shadcn/ui components

### Technical Stack
- **Framework:** Next.js 15 (App Router, Static Export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Testing:** Vitest + Playwright

## 📦 **Installation**

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start

# Run tests
npm test

# Run E2E tests
npm run test:e2e
```

## 🌐 **Multilingual Support**

The website supports 3 languages:
- **English** (`/en`)
- **German** (`/de`)
- **Arabic** (`/ar`) with RTL support

### Adding a New Language

1. Add locale to `lib/i18n.ts`:
```typescript
export const locales = ['en', 'de', 'ar', 'fr'] as const;
```

2. Create translation file in `messages/fr.json`

3. Add to `localeNames` in `lib/i18n.ts`

## 📁 **Project Structure**

```
codeProps_new/
├── app/
│   ├── [locale]/          # Dynamic locale routes
│   │   ├── layout.tsx     # Locale-specific layout
│   │   ├── page.tsx       # Home page
│   │   ├── about/         # About page
│   │   ├── services/      # Services pages
│   │   ├── portfolio/     # Portfolio page
│   │   ├── blog/          # Blog pages
│   │   └── contact/       # Contact page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Root redirect
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # Robots.txt
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Layout components
│   ├── home/              # Home page sections
│   ├── animations/        # Animation components
│   ├── forms/             # Form components
│   └── chatbot/           # Chatbot widget
├── lib/
│   ├── i18n.ts            # I18n configuration
│   ├── translations.ts    # Translation helpers
│   ├── seo.ts             # SEO utilities
│   ├── utils.ts           # Utility functions
│   └── validations/       # Zod schemas
├── messages/              # Translation files
│   ├── en.json
│   ├── de.json
│   └── ar.json
└── content/               # MDX content
    └── blog/              # Blog posts
```

## 🎨 **Design System**

### Colors
Custom color palette defined in `tailwind.config.ts` with support for dark mode.

### Typography
- **Sans Serif:** Inter
- **Headings:** Outfit

### Components
All UI components follow shadcn/ui patterns and are fully accessible.

## 🔧 **Configuration**

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://codeprops.com
NEXT_PUBLIC_SITE_NAME=Codeprops
NEXT_PUBLIC_DEFAULT_LOCALE=en
```

### Static Export

The project is configured for static export in `next.config.mjs`:

```javascript
output: 'export'
images: { unoptimized: true }
trailingSlash: true
```

## 📊 **SEO Features**

- ✅ Automatic sitemap generation
- ✅ Robots.txt configuration
- ✅ OpenGraph & Twitter Cards
- ✅ Structured Data (Schema.org)
- ✅ hreflang tags for multilingual
- ✅ Canonical URLs
- ✅ Semantic HTML
- ✅ Image optimization

## 🚀 **Deployment**

### Static Hosting

The build output (`/out` directory) can be deployed to any static hosting:

**Vercel:**
```bash
vercel --prod
```

**Netlify:**
```bash
netlify deploy --prod --dir=out
```

**GitHub Pages:**
```bash
npm run build
# Push /out directory to gh-pages branch
```

### Security Headers

For static exports, configure security headers at hosting level:

**Netlify** (`_headers` file):
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

**Vercel** (`vercel.json`):
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}
```

## 🧪 **Testing**

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📈 **Performance**

Current metrics:
- **First Load JS:** ~102 KB
- **Static Pages:** 9 pages
- **Build Time:** ~10s

## 🔮 **Future Backend Integration**

The project is prepared for backend integration:

1. **Contact Form:** Ready for API endpoint
2. **Chatbot:** UI complete, needs backend
3. **Blog:** MDX ready, can integrate with CMS

Uncomment backend sections in `.env.example` when ready.

## 📝 **License**

Copyright © 2026 Codeprops. All rights reserved.

## 🤝 **Contributing**

This is a proprietary project for Codeprops.

## 📞 **Contact**

- **Email:** info@codeprops.com
- **Phone:** +1 (555) 123-4567
- **Website:** https://codeprops.com

---

Built with ❤️ by Codeprops Team
