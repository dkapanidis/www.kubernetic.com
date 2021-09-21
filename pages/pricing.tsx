import Footer from '@components/Footer'
import { HeaderSolid } from '@components/Header'
import Layout from '@components/layouts/Layout'
import PricingTable from '@components/PricingTable'
import React from 'react'

function pricing() {
    return (
        <Layout title="The Kubernetes Desktop Client">
            <HeaderSolid />
            <PricingTable />
            <Footer />
        </Layout>
    )
}

export default pricing
