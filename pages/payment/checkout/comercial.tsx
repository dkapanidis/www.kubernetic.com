import CheckoutLayout from '@components/checkout/CheckoutLayout';
import PaymentTabs from '@components/checkout/PaymentTabs';
import YourOrderSection from '@components/checkout/YourOrderSection';
import InputField2 from '@components/ui/form/InputField2';
import { yupResolver } from '@hookform/resolvers/yup';
import licenseServer, { CheckoutForm } from '@utils/services/licenseServer';
import getStripe from '@utils/stripe/getStripe';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";


const schema = yup.object().shape({
    checkoutType: yup.string().required(),
    clientName: yup.string().required(),
    clientCif: yup.string().optional(),
    clientAddress: yup.string().optional(),
    clientCity: yup.string().optional(),
    clientPostalCode: yup.string().optional(),
    country: yup.string().optional(),
    licenses: yup.number().positive().integer().optional(),
});

export default function Checkout() {
    const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm<CheckoutForm>({
        mode: 'onBlur',
        defaultValues: {
            licenses: 1,
            type: "desktop",
            checkoutType: "comercial",
        },
        resolver: yupResolver(schema)
    });
    const [clicked, setClicked] = useState(false)

    async function onSubmit(data: CheckoutForm) {
        console.log("data: ", data)
        setClicked(true)
        const stripe = await getStripe()
        var code: any
        code = await licenseServer.createSession(data)
        await stripe!.redirectToCheckout({ sessionId: code.id })
        return false
    }

    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(response => {
                setValue("country", response.country_name)
            })
    }, [])

    return (
        <CheckoutLayout>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="pl-20 pr-20 md:px-32 lg:px-64">
                    <h1 className="text-3xl font-bold text-gray-600 py-10">Kubernetic Desktop checkout</h1>

                    <PaymentTabs checkoutType="comercial" />

                    <div className="pt-10">
                        <h4>Company Information</h4>
                        <small className="text-xs text-gray-500 italic">Required for an invoice</small>
                        <InputField2 errors={errors} register={register} name="clientName" label="Company Name" required />
                        <InputField2 errors={errors} register={register} name="clientCif" label="VAT ID" info="The VAT ID is only relevant for corporate customers within the EU.  The VAT ID consists of two letters identifying the country (ES), and the country-specific number of digits. Enter your VAT ID in accordance with your country-specific format. If this does not apply to you, leave the VAT ID field empty." />
                        <InputField2 errors={errors} register={register} name="clientAddress" label="Street address" />
                        <InputField2 errors={errors} register={register} name="clientCity" label="City" />
                        <InputField2 errors={errors} register={register} name="clientPostalCode" label="Postal code / ZIP" />
                    </div>

                    <YourOrderSection register={register} watch={watch} checkoutType="comercial" />
                    <div className="pt-20 pb-20">
                        <button type="submit" value="submit" className="btn btn-blue btn-popup float-right rounded py-3 px-8 w-40"  >
                            {clicked ? "Loading..." : "Next"}
                        </button>
                    </div>
                </div>
            </form>
        </CheckoutLayout>
    )
}


