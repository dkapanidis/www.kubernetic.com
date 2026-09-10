import Footer from '@components/Footer';
import { HeaderSolid } from '@components/Header';
import Layout from '@components/layouts/Layout';
import React from "react";

export default function SuccessfulPayment() {
  return (
    <Layout title="Payment Success" noindex>
      <HeaderSolid />
      <div className="p-40 text-center">
        <h2>We received payment for your Kubernetic app. Thanks for your business!</h2>

        <ul className="pt-10">
          <li>You will receive an email shortly with your License code.</li>
        </ul>
      </div>
      <Footer />
    </Layout>
  )
}
