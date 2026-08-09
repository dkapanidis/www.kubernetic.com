import CheckoutLayout from '@components/checkout/CheckoutLayout';
import YourOrderSection from '@components/checkout/YourOrderSection';
import { yupResolver } from '@hookform/resolvers/yup';
import useCountryPrefill from '@utils/geo/useCountryPrefill';
import licenseServer, { CheckoutForm } from '@utils/services/licenseServer';
import getStripe from '@utils/stripe/getStripe';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
    checkoutType: yup.string().required(),
    country: yup.string().required("Please select your country"),
    licenses: yup.number().positive().integer().optional(),
}).required();

export default function Checkout() {
    const { register, watch, handleSubmit, setValue, getValues, formState: { errors } } = useForm<CheckoutForm>({
        mode: 'onBlur',
        defaultValues: {
            licenses: 1,
            country: "",
            type: "desktop",
            checkoutType: "personal",
        },
        resolver: yupResolver(schema)
    });
    const [clicked, setClicked] = useState(false)
    const [error, setError] = useState("")

    useCountryPrefill(setValue, getValues)

    async function onSubmit(data: CheckoutForm) {
        setClicked(true)
        setError("")
        try {
            const stripe = await getStripe()
            const code: any = await licenseServer.createSession(data)
            await stripe!.redirectToCheckout({ sessionId: code.id })
        } catch (e: any) {
            setError(e?.message ?? "Something went wrong, please try again.")
            setClicked(false)
        }
        return false
    }

    return (
        <CheckoutLayout title="Kubernetic Desktop checkout" checkoutType="personal">
            <form onSubmit={handleSubmit(onSubmit)} >
                <YourOrderSection title="Kubernetic Desktop License" price={60} register={register} watch={watch} errors={errors} checkoutType="personal" />
                <div className="pt-20 pb-20">
                    <button type="submit" value="submit" disabled={clicked} className="btn btn-blue btn-popup float-right rounded py-3 px-8 w-40 disabled:opacity-60"  >
                        {clicked ? "Loading..." : "Next"}
                    </button>
                    {error && <p className="clear-both float-right pt-2 text-sm text-red-600 italic">{error}</p>}
                </div>
            </form>
        </CheckoutLayout>
    )
}


