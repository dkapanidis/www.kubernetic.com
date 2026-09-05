/**
 * Starting a purchase.
 *
 * Each product has a Stripe Payment Link, configured in the Stripe dashboard:
 * the price, adjustable quantity, required billing address, VAT id collection,
 * Stripe Tax and the success page all live on the link. Nothing is asked of the
 * buyer here and nothing is created on our side; the license server first hears
 * of the sale from Stripe's webhook, reads the buyer's details and the tax back
 * off the completed session, and issues the licenses.
 *
 * The click is reported to Plausible on the way out. The admin's funnel lays
 * that count next to the sessions Stripe reports back, so this is the one place
 * a checkout begins.
 */

import { CHECKOUT_EVENT, trackThenNavigate } from '@utils/analytics/plausible'

export type ProductType = "desktop" | "team"

const links: Record<ProductType, string | undefined> = {
  desktop: process.env.NEXT_PUBLIC_DESKTOP_PAYMENT_LINK,
  team: process.env.NEXT_PUBLIC_TEAM_PAYMENT_LINK,
}

/** Sends the buyer to the product's Stripe Payment Link. */
export function startCheckout(type: ProductType) {
  const href = links[type]
  if (!href) {
    throw new Error(`No payment link configured for ${type}`)
  }
  trackThenNavigate(CHECKOUT_EVENT, { type }, href)
}

export default { startCheckout }
