This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


```
ecommerce-with-sanity
├─ app
│  ├─ (store)
│  │  ├─ cart
│  │  │  ├─ components
│  │  │  │  └─ CartEmptyOrLastOrder.tsx
│  │  │  ├─ loading.tsx
│  │  │  └─ page.tsx
│  │  ├─ categories
│  │  │  └─ [slug]
│  │  │     ├─ loading.tsx
│  │  │     └─ page.tsx
│  │  ├─ error.tsx
│  │  ├─ layout.tsx
│  │  ├─ loading.tsx
│  │  ├─ orders
│  │  │  └─ page.tsx
│  │  ├─ page.tsx
│  │  ├─ product
│  │  │  └─ [slug]
│  │  │     ├─ error.tsx
│  │  │     ├─ loading.tsx
│  │  │     └─ page.tsx
│  │  └─ search
│  │     ├─ loading.tsx
│  │     └─ page.tsx
│  ├─ api
│  │  └─ orders
│  │     ├─ create-order
│  │     │  └─ route.ts
│  │     └─ sync-status
│  │        └─ route.ts
│  ├─ error.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ not-found.tsx
│  └─ studio
│     ├─ layout.tsx
│     └─ [[...tool]]
│        └─ page.tsx
├─ components
│  ├─ common
│  │  ├─ BlackFridayBanner.tsx
│  │  ├─ category-selector.tsx
│  │  ├─ HeroBanner.tsx
│  │  ├─ loader.tsx
│  │  └─ ProductsSection.tsx
│  ├─ layout
│  │  ├─ Footer.tsx
│  │  ├─ Header.tsx
│  │  └─ ScrollToTop.tsx
│  ├─ order
│  │  ├─ OrderNowButton.tsx
│  │  ├─ Orders.tsx
│  │  ├─ OrderStatusStepper.tsx
│  │  └─ ShippingAddressForm.tsx
│  ├─ product
│  │  ├─ AddToCartButton.tsx
│  │  ├─ AddToCartQuantity.tsx
│  │  ├─ ProductCard.tsx
│  │  ├─ ProductDetailTabs.tsx
│  │  ├─ ProductGrid.tsx
│  │  ├─ ProductImageGallery.tsx
│  │  └─ ProductsView.tsx
│  ├─ ui
│  │  ├─ button.tsx
│  │  ├─ command.tsx
│  │  ├─ dialog.tsx
│  │  └─ popover.tsx
│  └─ unUsed
│     ├─ CheckoutButtonWithModal.tsx
│     └─ CheckoutModal.tsx
├─ components.json
├─ data
│  └─ locations.json
├─ eslint.config.mjs
├─ hooks
│  ├─ hooks
│  │  └─ useOrderStatusSync.ts
│  └─ useLocations.ts
├─ lib
│  ├─ constant.ts
│  ├─ rate-limit.ts
│  ├─ schemas
│  │  └─ order.ts
│  ├─ types
│  │  └─ locations.ts
│  └─ utils.ts
├─ next.config.ts
├─ package.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ postcss.config.mjs
├─ providers
│  └─ ToastProvider.tsx
├─ public
│  ├─ heroBanner.webp
│  └─ notFound.png
├─ README.md
├─ sanity
│  ├─ env.ts
│  ├─ lib
│  │  ├─ backend-client.ts
│  │  ├─ client.ts
│  │  ├─ image.ts
│  │  ├─ live.ts
│  │  ├─ orders
│  │  │  └─ orders.ts
│  │  ├─ products
│  │  │  ├─ getAllCategories.ts
│  │  │  ├─ getAllProducts.ts
│  │  │  ├─ getProductBySlug.ts
│  │  │  ├─ getProductsByCategory.ts
│  │  │  └─ searchProductsByName.ts
│  │  └─ sales
│  │     ├─ couponCodes.ts
│  │     └─ getActiveSaleByCouponCode.ts
│  ├─ schemaTypes
│  │  ├─ blockContent.ts
│  │  ├─ category.ts
│  │  ├─ index.ts
│  │  ├─ order.ts
│  │  ├─ product.ts
│  │  └─ sale.ts
│  └─ structure.ts
├─ sanity.cli.ts
├─ sanity.config.ts
├─ sanity.types.ts
├─ schema.json
├─ scripts
│  └─ generate-locations.js
├─ store
│  ├─ cart-store.ts
│  └─ order-store.ts
└─ tsconfig.json

```