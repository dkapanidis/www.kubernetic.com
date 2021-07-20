import CheckoutLayout from '@components/checkout/CheckoutLayout';
import PaymentTabs from '@components/checkout/PaymentTabs';
import YourOrderSection from '@components/checkout/YourOrderSection';
import { yupResolver } from '@hookform/resolvers/yup';
import licenseServer, { CheckoutForm } from '@utils/services/licenseServer';
import getStripe from '@utils/stripe/getStripe';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
    type: yup.string().required(),
    country: yup.string().optional(),
    licenses: yup.number().positive().integer().optional(),
});

export default function Checkout() {
    const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm<CheckoutForm>({
        mode: 'onBlur',
        defaultValues: {
            licenses: 1,
            type: "personal",
        },
        resolver: yupResolver(schema)
    });
    const [clicked, setClicked] = useState(false)

    async function onSubmit(data: CheckoutForm) {
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

                    <PaymentTabs type="personal" />

                    <YourOrderSection register={register} watch={watch} type="personal" />
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


