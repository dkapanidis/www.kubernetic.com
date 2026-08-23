# Kubernetic Landing Page

The marketing site and checkout flow for [kubernetic.com](https://www.kubernetic.com/).

Built with [Next.js](https://nextjs.org/) (Pages Router) and [Tailwind CSS](https://tailwindcss.com/),
deployed on [Vercel](https://vercel.com/dkapanidis/www-kubernetic-com).

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
| `NEXT_PUBLIC_LICENSESERVER_URL`      | `kubernetic-admin` endpoint that creates the Stripe Checkout session and returns its hosted URL |
| `NEXT_PUBLIC_TRIAL_URL`              | `kubernetic-admin` endpoint that records a Team trial request |
| `SITE_URL`                           | Base URL used by `next-sitemap` during `postbuild`           |

`.env.development` points at a `kubernetic-admin` running locally on
`http://localhost:8080`, so checkout and trial flows need that service up to
work end to end. Use `.env.local` (git-ignored) to override without committing.

## Checkout

"Buy Desktop License" goes straight to Stripe. The page asks `kubernetic-admin`
for a checkout session and redirects to the hosted URL it returns — there is no
form in between. Name, billing address, VAT ID and the resulting tax are
collected by Stripe and read back off the completed session when the webhook
fulfils the sale, so the details on the invoice are the ones the buyer actually
confirmed and the tax is the one they were actually charged.

The Team page (`/payment/checkout/team`) still asks for a seat count first, then
redirects the same way.

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

## Branches

* `master` is live.
* `develop` is the next release.

## Deployment

Continuous deployment is handled by
[Vercel](https://vercel.com/dkapanidis/www-kubernetic-com):

* `master` → https://www.kubernetic.com/
* pull requests → a Preview deployment with its own URL

Production environment variables are managed in the Vercel project settings, in
addition to the committed `.env.production` defaults.

## Assets

GIFs are created in 1500x840.

