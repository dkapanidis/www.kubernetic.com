import Footer from '@components/Footer';
import { HeaderSolid } from '@components/Header';
import Layout from '@components/layouts/Layout';
import React from "react";
import PaymentTabs from './PaymentTabs';

export default function CheckoutLayout({ children, title, showTabs = true, checkoutType }: { children: any, title: string, showTabs?: boolean, checkoutType: "commercial" | "personal" }) {
    return (
        <Layout title="Payment Checkout">
            <HeaderSolid />
            <div className="pt-4 pb-10">
                <div className="pl-20 pr-20 md:px-32 lg:px-64">
                    <h1 className="text-3xl font-bold text-gray-600 py-4">{title}</h1>

                    {showTabs &&
                        <>
                            <h4 className="text-xs font-light italic text-gray-600 py-4">If the purchase is for an organization choose below to fill-in the necessary information for the invoice.</h4>
                            <PaymentTabs checkoutType={checkoutType} />
                        </>}
                    {children}
                </div>
                <div className="md:pt-20 pt-12 pl-4 pr-4 text-center italic font-light text-gray-700 text-sm">
                    We use industry-standard encryption to protect the confidentiality of your personal information.
                    This purchase and product fulfillment are through Stripe, a trusted reseller for https://kubernetic.com.
                </div>
            </div>
            <Footer />
        </Layout>

    )
}