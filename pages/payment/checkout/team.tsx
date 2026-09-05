import CheckoutLayout from '@components/checkout/CheckoutLayout';
import paymentLinks from '@utils/services/paymentLinks';
import React, { useState } from "react";

/**
 * Team subscription checkout.
 *
 * Nothing is asked here any more. The seat count, company name, billing
 * address and VAT ID are all entered on Stripe's own checkout page, which the
 * Payment Link opens; the license server reads them back off the completed
 * session. This page states the price and hands over.
 */
export default function Checkout() {
  const [clicked, setClicked] = useState(false)
  const [error, setError] = useState("")

  function buy() {
    setClicked(true)
    setError("")
    try {
      paymentLinks.startCheckout("team")
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong, please try again.")
      setClicked(false)
    }
  }

  return (
    <CheckoutLayout title="Kubernetic Team subscription">
      <div className="divider divide-y pt-10">
        <h4>Your Order</h4>
        <ul className="p-4">
          <div className="float-right text-gray-700">€ 96.00</div>
          <h5 className="italic">Kubernetic Team User Seats (yearly price, per seat)</h5>
        </ul>
        <div className="block p-4 text-sm italic text-gray-600">
          Choose the number of seats on the next page. Taxes are calculated at checkout from
          your billing address, and are not charged if you provide a valid EU VAT ID outside Spain.
        </div>
      </div>
      <div className="pt-20 pb-20">
        <button type="button" onClick={buy} disabled={clicked} className="btn btn-blue btn-popup float-right rounded py-3 px-8 disabled:opacity-60">
          {clicked ? "Redirecting to checkout..." : "Continue to checkout"}
        </button>
        {error && <p className="clear-both float-right pt-2 text-sm text-red-600 italic">{error}</p>}
      </div>
    </CheckoutLayout>
  )
}
