import { UseFormRegister } from "react-hook-form";

/**
 * The order summary shown before the buyer leaves for Stripe.
 *
 * It shows the quantity and what that comes to at list price, and stops there.
 * The tax is deliberately not computed here: Stripe works it out from the
 * billing address and VAT id the buyer gives it on the checkout page, which is
 * information this page does not have and no longer asks for. Guessing a figure
 * that Stripe would then contradict is worse than saying it is calculated next.
 */
type YourOrderSectionProps = {
    register: UseFormRegister<any>,
    watch: any,
    title: string,
    price: number,
}
export default function YourOrderSection({ register, watch, title, price }: YourOrderSectionProps) {
    const licenses = watch("licenses")
    const subtotal = Number.isNaN(licenses) ? 0 : licenses * price

    return (
        <div className="divider divide-y pt-10">
            <h4>Your Order</h4>
            <ul className="p-4">
                <div className="float-right text-gray-700">€ {price}.00</div>
                <h5 className="italic">{title}</h5>
                <LicensesField register={register} />
            </ul>
            <div className="block p-4">
                <div className="pt-2">
                    <div className="float-right text-gray-700">€ {subtotal}.00</div>
                    <div className="flex-grow">Subtotal</div>
                </div>
                <div className="pt-2 text-sm italic text-gray-600">
                    Taxes are calculated at checkout from your billing address, and are
                    not charged if you provide a valid EU VAT ID outside Spain.
                </div>
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
