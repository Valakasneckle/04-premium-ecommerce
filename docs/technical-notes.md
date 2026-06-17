# Technical Notes

## Frontend Architecture

LumaGear uses the Next.js App Router with a component-driven architecture. Pages compose layout, section, product, cart, and checkout components. Static product data lives in `data/` and is consumed by catalog and detail pages.

## App Routing

| Route | Purpose |
|---|---|
| `/` | Home page |
| `/products` | Product catalog |
| `/products/[slug]` | Product detail |
| `/cart` | Cart page |
| `/checkout` | Checkout flow |

## Data Structure

```
data/
├── products.ts      # Product catalog and helpers
├── categories.ts    # Category metadata
├── testimonials.ts  # Customer testimonials
└── benefits.ts      # Store benefits
```

Each product includes id, slug, name, category, price, rating, descriptions, features, stock status, and image placeholder path.

## Product Catalog

Products are filtered client-side using URL search params for categories, price range, rating, search query, and sort order. This enables shareable filtered catalog URLs.

## Cart State Management

`store/cart-store.ts` uses Zustand with persist middleware. Cart items are stored in localStorage under the key `lumagear-cart`. Computed helpers provide subtotal, tax (8%), shipping (free over $100), and total.

## Checkout UI

Checkout is a mock flow with no real payment processing. The form validates on blur and transitions between shipping, payment, and confirmation steps using Framer Motion.

## Styling

Tailwind CSS v4 with CSS custom properties in `app/globals.css`. Design tokens cover colors, radius, shadows, and typography (Plus Jakarta Sans).

## Animations

Framer Motion is used for:

- Hero entrance
- Product grid stagger
- Cart drawer slide-in
- Checkout step transitions
- Order confirmation reveal

Animations respect `prefers-reduced-motion`.

## Responsiveness

Mobile-first breakpoints at 375px, 768px, 1024px, and 1440px. Filters collapse into a slide-in panel on small screens. Product grids adapt from one to four columns.

## Deployment

Built for Vercel with default Next.js settings. See [architecture/deployment.md](../architecture/deployment.md).

## Component Structure

```
components/
├── layout/     # Navbar, Footer, CartDrawer
├── sections/   # Homepage sections
├── product/    # Catalog and detail components
├── cart/       # Cart UI
├── checkout/   # Checkout UI
└── ui/         # Shared primitives
```
