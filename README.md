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
│  │  │  │  ├─ CartEmptyOrLastOrder.tsx
│  │  │  │  ├─ DrawerSheet.tsx
│  │  │  │  └─ MobileSummaryBar.tsx
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
│  │  ├─ privacy-policy
│  │  │  └─ page.tsx
│  │  ├─ products
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]
│  │  │     ├─ error.tsx
│  │  │     ├─ loading.tsx
│  │  │     └─ page.tsx
│  │  ├─ return-refund-policy
│  │  │  └─ page.tsx
│  │  ├─ search
│  │  │  ├─ loading.tsx
│  │  │  └─ page.tsx
│  │  ├─ shipping
│  │  │  └─ page.tsx
│  │  └─ terms-of-service
│  │     └─ page.tsx
│  ├─ api
│  │  ├─ orders
│  │  │  ├─ create-order
│  │  │  │  └─ route.ts
│  │  │  └─ sync-status
│  │  │     └─ route.ts
│  │  └─ search
│  │     └─ bootstrap
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
│  │  ├─ ClientCounts.tsx
│  │  ├─ HeroBanner.tsx
│  │  ├─ loader.tsx
│  │  ├─ MobileNav.tsx
│  │  ├─ ProductsSection.tsx
│  │  └─ Testimonials.tsx
│  ├─ layout
│  │  ├─ Breadcrumb.tsx
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
│  │  ├─ ColorVariantModal.tsx
│  │  ├─ Filters.tsx
│  │  ├─ ProductCard.tsx
│  │  ├─ ProductDetailSection.tsx
│  │  ├─ ProductDetailTabs.tsx
│  │  ├─ ProductGrid.tsx
│  │  ├─ ProductImageGallery.tsx
│  │  ├─ ProductInfo.tsx
│  │  ├─ ProductPurchasePanel.tsx
│  │  └─ ProductsView.tsx
│  ├─ search
│  │  ├─ getSearchBootstrap.ts
│  │  └─ MobileSearchModal.tsx
│  ├─ ui
│  │  ├─ button.tsx
│  │  ├─ checkbox.tsx
│  │  ├─ command.tsx
│  │  ├─ dialog.tsx
│  │  ├─ input.tsx
│  │  ├─ label.tsx
│  │  └─ popover.tsx
│  └─ unUsed
│     ├─ category-selector.tsx
│     ├─ CheckoutButtonWithModal.tsx
│     ├─ CheckoutModal.tsx
│     └─ loading.tsx
├─ components.json
├─ data
│  └─ locations.json
├─ eslint.config.mjs
├─ hooks
│  ├─ useLocations.ts
│  ├─ useOrderStatusSync.ts
│  └─ useTrackButtonClick.ts
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
│  ├─ fb.svg
│  ├─ grid.svg
│  ├─ hero.jpg
│  ├─ hero1.webp
│  ├─ hero2.webp
│  ├─ hero3.webp
│  ├─ heroBanner.webp
│  ├─ notFound.png
│  ├─ testimonial1.jpg
│  ├─ testimonial2.jpg
│  ├─ testimonial3.jpg
│  ├─ testimonial4.jpg
│  ├─ testimonial5.jpg
│  ├─ testimonial6.jpg
│  ├─ testimonial7.jpg
│  ├─ testimonial8.jpg
│  └─ whatsapp.svg
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
│  │  ├─ color.ts
│  │  ├─ index.ts
│  │  ├─ opjects
│  │  │  ├─ colorValue.ts
│  │  │  ├─ optionValue.ts
│  │  │  ├─ productOption.ts
│  │  │  └─ productVariant.ts
│  │  ├─ order.ts
│  │  ├─ product.ts
│  │  ├─ sale.ts
│  │  └─ size.ts
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