# X-Zone 2026

Landing page and online ticketing checkout platform for **X-Zone 2026** ("O Maior Evento Gamer e Geek de Goiânia"), scheduled for September 5, 2026. The platform features an event overview, schedule, guests lineup, partners showcase, FAQs, and a complete multi-step ticket checkout flow with PIX and Credit Card payment integration.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) 16 (App Router)
- **UI Library**: [React](https://react.dev) 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com) 4, Custom Liquid Glass Design System
- **Icons & Animation**: [Lucide React](https://lucide.dev), [Framer Motion](https://www.framer.com/motion/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com), [Zod](https://zod.dev), `@hookform/resolvers`
- **Database & Backend**: [Supabase](https://supabase.com) (`@supabase/supabase-js`)
- **Payments**: [Mercado Pago SDK](https://www.mercadopago.com.br/developers) (`mercadopago` for PIX and Credit Card)
- **Utilities**: `qrcode`, `nanoid`, `date-fns`, `clsx`, `tailwind-merge`

## Prerequisites

- **Node.js**: v20 or later
- **Package Manager**: npm, yarn, pnpm, or bun
- **Supabase**: Account and project configured with the required schema (`orders`, `order_items`, `tickets`, `coupons`, `audit_logs`)
- **Mercado Pago**: Account credentials (Access Token and Webhook Secret)

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL for client and server connections |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous API key for client-side access |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role secret key for server-side operations and order processing |
| `MERCADOPAGO_ACCESS_TOKEN` | Mercado Pago API access token for generating PIX and card payments |
| `MERCADOPAGO_WEBHOOK_SECRET` | Webhook secret key for verifying incoming Mercado Pago payment notification signatures |
| `NEXT_PUBLIC_BASE_URL` | Application base URL (e.g. `http://localhost:3000` or production domain) used for webhook callbacks |

### 3. Run Development Server

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

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Bebas Neue, Barlow Condensed, and DM Sans via `next/font/google`.

## Available Scripts

In `package.json`:

- `npm run dev` - Starts the Next.js development server.
- `npm run build` - Builds the application for production.
- `npm run start` - Runs the built production server.
- `npm run lint` - Runs ESLint code quality checks.

## Project Structure

```text
├── public/                 # Static assets (images, logos, icons)
├── src/
│   ├── app/                # Next.js App Router pages and API routes
│   │   ├── api/
│   │   │   ├── coupons/    # Coupon validation endpoint (/api/coupons/validate)
│   │   │   ├── orders/     # Order creation and status polling (/api/orders, /api/orders/[id]/status)
│   │   │   └── webhooks/   # Mercado Pago payment webhook (/api/webhooks/mercadopago)
│   │   ├── ingressos/      # Ticket purchase flow (/ingressos)
│   │   ├── globals.css     # Global styles and Liquid Glass design tokens
│   │   ├── layout.tsx      # Root layout, fonts, and metadata
│   │   └── page.tsx        # Landing page
│   ├── components/
│   │   ├── checkout/       # Multi-step checkout components (Tickets, Customer, Payment, Success)
│   │   ├── layout/         # Header and Footer
│   │   ├── sections/       # Landing page sections (Hero, About, Schedule, Guests, Tickets, Sponsors, FAQ)
│   │   └── ui/             # Reusable UI primitives (Button, LinkButton, Badge, SectionTitle, EventBackground)
│   └── lib/
│       ├── constants.ts    # Event data, ticket tiers, schedule, guests, and FAQs
│       ├── mercadopago.ts  # Mercado Pago client and payment helpers
│       ├── supabase.ts     # Supabase public and admin client instances
│       └── utils.ts        # Helper functions (cn, formatCurrency, formatDate)
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
