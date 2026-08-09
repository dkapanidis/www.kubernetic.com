import CheckoutLayout from '@components/checkout/CheckoutLayout';
import YourOrderSection from '@components/checkout/YourOrderSection';
import InputField2 from '@components/ui/form/InputField2';
import { yupResolver } from '@hookform/resolvers/yup';
import getInitialCountry from '@utils/geo/getInitialCountry';
import licenseServer, { CheckoutForm } from '@utils/services/licenseServer';
import getStripe from '@utils/stripe/getStripe';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
    checkoutType: yup.string().required(),
    clientName: yup.string().required(),
    clientCif: yup.string().optional(),
    clientAddress: yup.string().required(),
    clientCity: yup.string().required(),
    clientPostalCode: yup.string().required(),
    country: yup.string().required("Please select your country"),
    licenses: yup.number().positive().integer().required(),
}).required();

export default function Checkout() {
    const { register, watch, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
        mode: 'onBlur',
        defaultValues: {
            licenses: 1,
            country: getInitialCountry(),
            type: "desktop",
            checkoutType: "commercial",
        },
        resolver: yupResolver(schema)
    });
    const [clicked, setClicked] = useState(false)
    const [error, setError] = useState("")

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
        <CheckoutLayout title="Kubernetic Desktop checkout" checkoutType="commercial">
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="pt-10">
                    <h4>Company Information</h4>
                    <small className="text-xs text-gray-500 italic">Required for an invoice</small>
                    <InputField2 errors={errors} register={register} name="clientName" required label="Company Name" />
                    <InputField2 errors={errors} register={register} name="clientCif" label="VAT ID" info="The VAT ID is only relevant for corporate customers within the EU.  The VAT ID consists of two letters identifying the country (ES), and the country-specific number of digits. Enter your VAT ID in accordance with your country-specific format. If this does not apply to you, leave the VAT ID field empty." />
                    <InputField2 errors={errors} register={register} name="clientAddress" required label="Street address" />
                    <InputField2 errors={errors} register={register} name="clientCity" required label="City" />
                    <InputField2 errors={errors} register={register} name="clientPostalCode" required label="Postal code / ZIP" />
                </div>

                <YourOrderSection title="Kubernetic Desktop License" price={60} register={register} watch={watch} errors={errors} checkoutType="commercial" />
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

