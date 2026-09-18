# nordly - Modern E-Commerce Storefront

nordly is a polished, responsive e-commerce storefront built with Next.js and React. It is designed to feel like a real modern shopping experience, with product discovery, filtering, wishlist support, cart management, promotional discounts, and a checkout flow.

## Live Demo

Run the project locally with the instructions below.

## Features

- Responsive storefront layout for desktop, tablet, and mobile
- Product catalog with categories, search, sorting, ratings, badges, and color swatches
- Category navigation for Living, Workspace, Kitchen, and Travel products
- Product wishlist with browser persistence
- Shopping bag drawer with add, remove, and quantity controls
- Automatic subtotal, shipping, discount, and total calculations
- Promo code support with welcome discount logic
- Checkout handoff modal ready for payment provider integration
- Sticky navigation, responsive mobile menu, newsletter signup UI, and editorial content sections
- Local cart and wishlist persistence using `localStorage`
- Secure dependency baseline with Next.js 16 and React 19

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Responsive CSS
- Lucide React icons
- Unsplash product imagery

## Getting Started

### Prerequisites

- Node.js 20.9 or newer
- npm

### Installation

```bash
git clone https://github.com/samrajay99/E_Commerce_website.git
cd E_Commerce_website
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Create a production build

```bash
npm run build
npm start
```

## Project Structure

```text
E_Commerce_website/
├── app/
│   ├── globals.css       # Global responsive styles
│   ├── layout.tsx        # Root layout and metadata
│   └── page.tsx          # Storefront UI and client interactions
├── next-env.d.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Production Roadmap

The current release provides a complete storefront experience with local product data. The next backend integrations for a production launch are:

- Database-backed products, inventory, carts, and orders
- User registration, login, and account pages
- Admin dashboard for product and order management
- Stripe or Razorpay payment processing
- Order confirmation emails and delivery tracking
- Product reviews and customer accounts

## Author

**Samrajay Gupta**

- GitHub: [@samrajay99](https://github.com/samrajay99)
- LinkedIn: [Samrajay Gupta](https://linkedin.com/in/samrajaygupta1)
