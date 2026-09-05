import Footer from '@components/Footer';
import { HeaderSolid } from '@components/Header';
import Layout from '@components/layouts/Layout';
import React from "react";

export default function CheckoutLayout({ children, title }: { children: any, title: string }) {
    return (
        <Layout title="Payment Checkout">
            <HeaderSolid />
            <div className="pt-4 pb-10">
                <div className="pl-20 pr-20 md:px-32 lg:px-64">
                    <h1 className="text-3xl font-bold text-gray-600 py-4">{title}</h1>
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
