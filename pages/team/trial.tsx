import Footer from '@components/Footer';
import TrialForm from "@components/forms/TrialForm";
import { HeaderSolid } from '@components/Header';
import Layout from '@components/layouts/Layout';
import React from "react";

export default function Trial() {
  return (
    <Layout title="Team Trial">
      <HeaderSolid />
      <div className="pt-8 pb-10">
        <div className="px-10 md:px-56 text-center">
          <section className="section app-features-reverse app-features">
            <div className="wrap-wide">
              <div className="license">
                <TrialForm />
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </Layout>
  )
}
