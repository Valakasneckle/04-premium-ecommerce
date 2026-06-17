# System Overview

```mermaid
flowchart TD
    Customer[Customer] --> Storefront[LumaGear Storefront]
    Storefront --> Home[Home Page]
    Storefront --> Catalog[Product Catalog]
    Storefront --> Detail[Product Detail]
    Storefront --> Cart[Cart]
    Storefront --> Checkout[Checkout]

    Catalog --> Filters[Filters]
    Catalog --> Search[Search]
    Catalog --> Grid[Product Grid]

    Detail --> Gallery[Product Gallery]
    Detail --> Info[Product Info]
    Detail --> AddToCart[Add to Cart]

    Cart --> CartItems[Cart Items]
    Cart --> CartSummary[Cart Summary]

    Checkout --> Shipping[Shipping Form]
    Checkout --> Payment[Payment Method]
    Checkout --> OrderSummary[Order Summary]
```

## Explanation

The LumaGear storefront is a client-side e-commerce experience built with Next.js. Shoppers enter through the homepage, browse the product catalog with filters and search, open product detail pages to review items, add products to a Zustand-managed cart, and complete a mock checkout flow. All product data is served from static TypeScript files, making the architecture easy to deploy and extend with a backend later.
