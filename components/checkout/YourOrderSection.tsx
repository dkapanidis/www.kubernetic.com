import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import CountryField, { isEuropeanCountry } from "./CountryField";

type YourOrderSectionProps = {
    register: any,
    watch: any,
    checkoutType: "personal" | "commercial"
}
export default function YourOrderSection({ register, watch, checkoutType }: YourOrderSectionProps) {
    const licenses = watch("licenses")
    const country = watch("country")

    // const taxPercent = watch("taxPercent")
    const [taxPercent, setTaxPercent] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [tax, setTax] = useState(0)

    // Calculate TaxPercent
    useEffect(() => {
        // COMMERCIAL LICENSES

        // On Spain Tax is not excluded, so we collect 21%
        if (checkoutType === "commercial" && country === "Spain") {
            setTaxPercent(21)
            return
        }
        // On other EU countries we don't collect Tax
        if (checkoutType === "commercial" && isEuropeanCountry(country)) {
            setTaxPercent(0)
            return
        }
        // On the rest of the countries we don't collect Tax
        if (checkoutType === "commercial") {
            setTaxPercent(0)
            return
        }
        // PERSONAL LICENSES
        // For personal Licenses (without TAX ID), we collect 21%
        setTaxPercent(21)
        return
    }, [country, checkoutType])

    // Calculate Subtotal
    useEffect(() => {
        if (Number.isNaN(licenses)) {
            setSubtotal(0)
        } else {
            setSubtotal(licenses * 60)
        }
    }, [licenses])

    // Calculate Tax
    useEffect(() => {
        setTax(subtotal * taxPercent / 100)
    }, [subtotal, taxPercent])

    // Calculate Total
    useEffect(() => {
        setTotal(subtotal + tax)
    }, [subtotal, tax])

    return (
        <div className="divider divide-y pt-10">
            <div>
                <CountryField register={register} />
                <h4>Your Order</h4>
            </div>
            <ul className="p-4">
                <div className="float-right text-gray-700">€ 60.00</div>
                <h5 className="italic">Kubernetic Desktop License</h5>
                <LicensesField register={register} />
            </ul>
            <div className="block p-4">
                <SubtotalSum subtotal={subtotal} />
                <TaxSum taxPercent={taxPercent} tax={tax} />
                <TotalSum total={total} />
            </div>
        </div>
    )
}

function LicensesField({ register }: { register: UseFormRegister<any> }) {
    return (
        <div className="block pb-4">
            <input
                {...register("licenses", { valueAsNumber: true, min: 1 })}
                className="float-right mt-2 w-40 border outline-none h-10 focus:border-blue-400 px-4 rounded-md"
                required
                onKeyPress={(e) => {
                    if (e.key === "e" || e.key === "-") {
                        e.preventDefault();
                    }
                }}
                min={1}
                type="number"
            />
            <div className="flex-grow pt-2">Update Quantity</div>
        </div>
    )
}


function SubtotalSum({ subtotal }: { subtotal: number }) {
    return (
        <div className="pt-2">
            <div className="float-right text-gray-700">€ {subtotal}.00</div>
            <div className="flex-grow">Subtotal</div>
        </div>
    )
}

function TaxSum({ taxPercent, tax }: { taxPercent: number, tax: number }) {
    return (
        <div className="pt-2">
            <div className="float-right text-gray-700">€ {tax.toFixed(2)}</div>
            <div className="flex-grow">Tax ({taxPercent}%)</div>
        </div>
    )
}

function TotalSum({ total }: { total: number }) {
    return (
        <div className="pt-2">
            <h4 className="float-right text-gray-700">€ {total.toFixed(2)}</h4>
            <h4 className="italic">Total</h4>
        </div>
    )
}

