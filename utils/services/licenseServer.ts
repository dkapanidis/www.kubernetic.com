/**
 * Starting a purchase.
 *
 * The license server creates an anonymous Stripe checkout session and hands
 * back the hosted page to send the buyer to. Nothing about the buyer is asked
 * for here: Stripe collects their email, billing address and — if they are a
 * business — their VAT id on its own page, works out the tax from that, and the
 * license server reads it all back off the completed session once they have paid.
 */

export type CheckoutRequest = {
  /** How many licenses; the buyer can still change it on the Stripe page. */
  licenses?: number,
  type: "desktop" | "team",
}

type CheckoutSession = {
  id: string,
  /** The hosted Stripe checkout page. */
  url: string,
}

async function createSession(request: CheckoutRequest): Promise<CheckoutSession> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LICENSESERVER_URL}` as string, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
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
