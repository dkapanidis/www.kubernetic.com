/**
 * Starting a purchase.
 *
 * The license server creates an anonymous Stripe checkout session and hands
 * back the hosted page to send the buyer to. Nothing about the buyer is asked
 * for here: Stripe collects their email, billing address and — if they are a
 * business — their VAT id on its own page, works out the tax from that, and the
 * license server reads it all back off the completed session once they have paid.
 */

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
 */
async function startCheckout(request: CheckoutRequest) {
  const session = await createSession(request)
  window.location.href = session.url
}

export default { createSession, startCheckout }
