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
│  │  ├─ basket
│  │  │  ├─ components
│  │  │  │  ├─ BasketEmptyOrLastOrder.tsx
│  │  │  │  ├─ BasketItemList.tsx
│  │  │  │  └─ OrderSummary.tsx
│  │  │  └─ page.tsx
│  │  ├─ categories
│  │  │  └─ [slug]
│  │  │     └─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ loading.tsx
│  │  ├─ order
│  │  │  └─ page.tsx
│  │  ├─ page.tsx
│  │  ├─ product
│  │  │  └─ [slug]
│  │  │     └─ page.tsx
│  │  └─ search
│  │     ├─ loading.tsx
│  │     └─ page.tsx
│  ├─ api
│  │  └─ create-order
│  │     └─ route.ts
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ not-found.tsx
│  └─ studio
│     ├─ layout.tsx
│     └─ [[...tool]]
│        └─ page.tsx
├─ components
│  ├─ AddToBasketButton.tsx
│  ├─ AddToBasketQuantity.tsx
│  ├─ BlackFridayBanner.tsx
│  ├─ CheckoutButtonWithModal.tsx
│  ├─ CheckoutModal.tsx
│  ├─ Header.tsx
│  ├─ HeroBanner.tsx
│  ├─ loader.tsx
│  ├─ OrderNowButton.tsx
│  ├─ Orders.tsx
│  ├─ ProductDetailTabs.tsx
│  ├─ ProductGrid.tsx
│  ├─ ProductImageGallery.tsx
│  ├─ ProductsSection.tsx
│  ├─ ProductsView.tsx
│  ├─ ProductThump.tsx
│  ├─ ScrollToTop.tsx
│  ├─ ShippingAddressForm.tsx
│  └─ ui
│     ├─ button.tsx
│     ├─ category-selector.tsx
│     ├─ command.tsx
│     ├─ dialog.tsx
│     └─ popover.tsx
├─ components.json
├─ eslint.config.mjs
├─ lib
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
│  │  ├─ backendClient.ts
│  │  ├─ client.ts
│  │  ├─ image.ts
│  │  ├─ live.ts
│  │  ├─ orders
│  │  │  └─ orders.ts
│  │  ├─ products
│  │  │  ├─ getAllCategories.ts
│  │  │  ├─ getAllProducts.ts
│  │  │  ├─ getProductBySlug.ts
│  │  │  ├─ getProductsByCategory.tsx
│  │  │  └─ searchProductsByName.ts
│  │  └─ sales
│  │     ├─ couponCodes.ts
│  │     └─ getActiveSaleByCouponCode.ts
│  ├─ schemaTypes
│  │  ├─ blockContentType.ts
│  │  ├─ categoryType.ts
│  │  ├─ index.ts
│  │  ├─ orderTypes.ts
│  │  ├─ productType.ts
│  │  └─ salesType.ts
│  └─ structure.ts
├─ sanity.cli.ts
├─ sanity.config.ts
├─ sanity.types.ts
├─ schema.json
├─ store
│  ├─ orderStore.ts
│  └─ store.ts
├─ structure.txt
└─ tsconfig.json

```