# LumaGear — Premium E-commerce Store

A premium e-commerce storefront built with Next.js, TypeScript, Tailwind CSS, Zustand, and Framer Motion. LumaGear is a fictional electronics and smart home store designed to demonstrate product discovery, cart UX, checkout flow, and conversion-focused frontend architecture.

## Live Demo

**https://premium-e-commerce-store-ten.vercel.app/**

## Screenshots

Add the following screenshots to the `screenshots/` folder:

| File | Description |
|---|---|
| `./screenshots/01-home-desktop.png` | Home page — desktop |
| `./screenshots/02-home-mobile.png` | Home page — mobile |
| `./screenshots/03-catalog-page.png` | Product catalog with filters |
| `./screenshots/04-product-detail.png` | Product detail page |
| `./screenshots/05-cart-page.png` | Cart page |
| `./screenshots/06-checkout-page.png` | Checkout flow |
| `./screenshots/07-lighthouse.png` | Lighthouse performance audit |

## Project Overview

LumaGear is a fictional premium e-commerce storefront for electronics, smart home devices, and modern workspace accessories. The project showcases how a product-focused brand can present items beautifully, guide shoppers through discovery, and reduce friction from browsing to checkout.

## Business Goal

The store helps product brands present items beautifully, make product discovery easy, improve shopping UX, and reduce checkout friction. Every page is designed to increase purchase intent through clear hierarchy, trust signals, and a polished mobile-first experience.

## Key Features

- Premium e-commerce homepage with hero, categories, featured products, and testimonials
- Product catalog with category, price, and rating filters
- Search and sort functionality with URL-synced filter state
- Product detail pages with gallery, specs, reviews, and related products
- Cart state management with Zustand and localStorage persistence
- Slide-in cart drawer and dedicated cart page
- Multi-step checkout UI with inline validation
- Responsive desktop and mobile layout
- Reusable component architecture
- Structured product data in `data/`
- Conversion-focused product presentation
- Clean Tailwind CSS styling with design tokens

## Tech Stack

- **Next.js** — App Router, routing, and product pages
- **TypeScript** — Type-safe product and cart models
- **Tailwind CSS** — Utility-first styling and design tokens
- **Zustand** — Cart state management
- **Framer Motion** — Subtle UI transitions and drawer animations
- **Lucide React** — Consistent icon system
- **Vercel** — Production deployment

## Architecture

- [System Overview](./architecture/system-overview.md)
- [Component Structure](./architecture/component-structure.md)
- [User Flow](./architecture/user-flow.md)
- [Deployment](./architecture/deployment.md)

## What This Project Demonstrates

- E-commerce frontend development
- Product catalog architecture
- Cart state management with persistence
- Checkout UX patterns
- Responsive UI implementation
- Reusable component architecture
- Product-focused design thinking
- Frontend architecture suitable for real client projects

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
pnpm start
```

## Future Improvements

- Add real backend API
- Add Stripe checkout
- Add authentication
- Add customer accounts
- Add admin product management
- Add inventory tracking
- Add CMS integration
- Add order confirmation emails
- Add product reviews submission
- Add wishlist functionality

## Case Study

Read the full case study: [docs/case-study.md](./docs/case-study.md)

## License

MIT — see [LICENSE](./LICENSE).
