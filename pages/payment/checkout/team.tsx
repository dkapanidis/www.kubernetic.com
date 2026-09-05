import CheckoutLayout from '@components/checkout/CheckoutLayout';
import YourOrderSection from '@components/checkout/YourOrderSection';
import { yupResolver } from '@hookform/resolvers/yup';
import licenseServer from '@utils/services/licenseServer';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  licenses: yup.number().positive().integer().required(),
}).required();

type TeamOrder = { licenses: number }

/**
 * Team subscription checkout.
 *
 * All that is asked here is how many seats. The company name, billing address
 * and VAT ID used to be collected on this page and sent ahead of the buyer;
 * Stripe now collects them on its own checkout page and the license server reads
 * them back off the completed session, so there is nothing left to fill in first.
 */
export default function Checkout() {
  const { register, watch, handleSubmit } = useForm<TeamOrder>({
    mode: 'onBlur',
    defaultValues: { licenses: 1 },
    resolver: yupResolver(schema)
  });
  const [clicked, setClicked] = useState(false)
  const [error, setError] = useState("")

  async function onSubmit(data: TeamOrder) {
    setClicked(true)
    setError("")
    try {
      await licenseServer.startCheckout({ type: "team", licenses: data.licenses })
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong, please try again.")
      setClicked(false)
    }
    return false
  }

  return (
    <CheckoutLayout title="Kubernetic Team subscription">
      <form onSubmit={handleSubmit(onSubmit)} >
        <YourOrderSection title="Kubernetic Team User Seats (yearly price)" price={96} register={register} watch={watch} />
        <div className="pt-20 pb-20">
          <button type="submit" value="submit" disabled={clicked} className="btn btn-blue btn-popup float-right rounded py-3 px-8 w-40 disabled:opacity-60"  >
            {clicked ? "Loading..." : "Next"}
          </button>
          {error && <p className="clear-both float-right pt-2 text-sm text-red-600 italic">{error}</p>}
        </div>
      </form>
    </CheckoutLayout >
  )
}
