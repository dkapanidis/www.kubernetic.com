/**
 * Starting a purchase.
 *
 * The license server creates an anonymous Stripe checkout session and hands
 * back the hosted page to send the buyer to. Nothing about the buyer is asked
 * for here: Stripe collects their email, billing address and — if they are a
 * business — their VAT id on its own page, works out the tax from that, and the
 * license server reads it all back off the completed session once they have paid.
 */

import { CHECKOUT_EVENT, trackEvent } from '@utils/analytics/plausible'
import getInitialCountry from '@utils/geo/getInitialCountry'

export type CheckoutRequest = {
  /** How many licenses; the buyer can still change it on the Stripe page. */
  licenses?: number,
  type: "desktop" | "team",
  /**
   * Where the buyer seems to be, guessed from the browser timezone. Not asked
   * of the buyer and not used for tax: the license server records it on the
   * checkout funnel so a buyer who leaves Stripe's page without typing an
   * address still shows up as coming from somewhere, and replaces it with the
   * real billing country as soon as Stripe collects one.
   */
  country?: string,
}

type CheckoutSession = {
  id: string,
  /** The hosted Stripe checkout page. */
  url: string,
}

async function createSession(request: CheckoutRequest): Promise<CheckoutSession> {
  const body: CheckoutRequest = { country: getInitialCountry() || undefined, ...request }
  const response = await fetch(`${process.env.NEXT_PUBLIC_LICENSESERVER_URL}` as string, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  if (!response.ok) {
    throw await response.json()
  }
  return await response.json()
}

/**
 * Sends the buyer to Stripe's hosted checkout page.
 *
 * A plain redirect rather than Stripe.js: the server already knows the URL, so
 * there is nothing for the client library to look up.
 *
 * The click is also reported to Plausible, before the round trip to the license
 * server rather than after: the event has to be on its way before the page
 * unloads, and a click the server then refuses is still a buyer who wanted to
 * buy. The admin's funnel compares this count with the sessions the server
 * created, so both sides must see the same click.
 */
async function startCheckout(request: CheckoutRequest) {
  trackEvent(CHECKOUT_EVENT, { type: request.type, licenses: request.licenses ?? 1 })
  const session = await createSession(request)
  window.location.href = session.url
}

export default { createSession, startCheckout }
