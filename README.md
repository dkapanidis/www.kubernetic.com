# Kubernetic Landing Page

The marketing site and checkout flow for [kubernetic.com](https://www.kubernetic.com/).

Built with [Next.js](https://nextjs.org/) (Pages Router) and [Tailwind CSS](https://tailwindcss.com/),
deployed on [Cloudflare](https://workers.cloudflare.com/) (see Deployment).

## Requirements

* [Bun](https://bun.sh/) — used for both dependency installation and running scripts.

## Run locally

```shell
bun install
bun run start   # dev server on http://localhost:3000
```

Other scripts:

| Script            | Purpose                                                  |
| ----------------- | -------------------------------------------------------- |
| `bun run start`   | Start the Next.js dev server                              |
| `bun run build`   | Production build, followed by sitemap generation          |
| `bun run lint`    | Run ESLint via `next lint`                                |

## Configuration

Environment is set per Next.js mode in the committed `.env.*` files. Only
`NEXT_PUBLIC_*` values live here — they are shipped to the browser, so nothing
secret belongs in them.

| Variable                             | Purpose                                                     |
| ------------------------------------ | ----------------------------------------------------------- |
| `NEXT_PUBLIC_DESKTOP_PAYMENT_LINK`   | Stripe Payment Link for the Desktop license                  |
| `NEXT_PUBLIC_TEAM_PAYMENT_LINK`      | Stripe Payment Link for the Team subscription                |
| `NEXT_PUBLIC_TRIAL_URL`              | `kubernetic-admin` endpoint that records a Team trial request |
| `SITE_URL`                           | Base URL used by `next-sitemap` during `postbuild`           |

`.env.development` points the trial form at a `kubernetic-admin` running locally
on `http://localhost:8080`, and the Buy buttons at test-mode Payment Links.
Use `.env.local` (git-ignored) to override without committing.

## Checkout

Both Buy buttons go straight to Stripe through a Payment Link, one per product.
Nothing is created on our side first: quantity, name, billing address, VAT ID
and the resulting tax are collected by Stripe on its page and read back off the
completed session by `kubernetic-admin`'s webhook, which issues the licenses.
The click is reported to Plausible as the `Checkout` event (with the product
as `type`) so the admin's funnel can lay clicks next to the sessions Stripe
reports back.

The Payment Links carry the checkout configuration, so a new one must be made
the same way. In the Stripe dashboard (or with the CLI, see `kubernetic-admin`'s
PR history) each link needs: the product price with adjustable quantity,
billing address collection **required**, tax ID collection on, automatic tax
on, customer creation **always** (one-time price only), promotion codes
allowed, and after completion a redirect to
`https://kubernetic.com/payment/success?session_id={CHECKOUT_SESSION_ID}`.

## Country

A country is an ISO 3166-1 alpha-2 code (`ES`, not `Spain`) — that is what the
trial form submits to `kubernetic-admin`. The list lives in
`components/checkout/countries.ts`.

The field is prefilled from the browser's IANA timezone (`Europe/Madrid` → `ES`),
falling back to the region of the browser's locale. This is synchronous and
offline — see `utils/geo/getInitialCountry.ts`.

It is only a guess (a VPN or a traveller will defeat it) and the field is
validated on submit, so a wrong or missing guess never produces a bad order.

## Backend

Checkout and trial requests are handled by **`kubernetic-admin`**, a Go service.
The site is a static frontend: it POSTs the form to `kubernetic-admin`, which
creates the Stripe Checkout session (or issues the trial licence) and returns
the session id for the browser to redirect with.

This replaced the previous Firebase/Firestore setup — the site no longer talks
to Firebase, and no Firebase SDK is bundled.

## Layout

```
components/   UI components; checkout/ holds the payment form pieces
content/      Blog posts as Markdown, rendered by pages/blog/[slug].tsx
lib/          Markdown loading and rendering helpers
pages/        Routes (Pages Router)
public/       Static assets
styles/       Global CSS and Tailwind entry points
types/        Shared TypeScript types
utils/        Service clients (kubernetic-admin, Stripe) and helpers
```

## Deployment

The site is a static export (`output: 'export'` → `out/`) served by Cloudflare
Workers static assets, configured in `wrangler.jsonc`.

`.github/workflows/ci.yml` builds every pull request and push; a push to `main`
also runs `wrangler deploy` to https://www.kubernetic.com/. It needs the repo
secrets `CLOUDFLARE_API_TOKEN` (Workers Scripts: Edit, plus Zone: Workers
Routes: Edit on `kubernetic.com`) and `CLOUDFLARE_ACCOUNT_ID`.

Redirects live in `public/_redirects` — Next's `redirects()` does not apply to
a static export. Environment comes only from the committed `.env.production`.

Preview the production build locally:

```shell
bun run build
bunx wrangler dev   # http://localhost:8787
```

## Assets

GIFs are created in 1500x840.


