import BirdsEye from '@components/features/BirdsEye';
import ChartRepositories from '@components/features/ChartRepositories';
import DashboardView from '@components/features/DashboardView';
import ManageNamespaces from '@components/features/ManageNamespaces';
import MultiCluster from '@components/features/MultiCluster';
import NativeKubernetes from '@components/features/NativeKubernetes';
import RealTimeUpdates from '@components/features/RealTimeUpdates';
import Footer from '@components/Footer';
import Header from '@components/Header';
import HeroBanner from '@components/HeroBanner';
import Layout from '@components/layouts/Layout';
import { useRouter } from 'next/router';
import React, { useEffect } from "react";

export const Index = () => {
  const router = useRouter()

  // redirect hash to dedicated pricing page
  useEffect(() => {
    (router.asPath === "/#pricing") && router.push("/pricing")
  }, [])

  return (
    <Layout title="The Kubernetes Desktop Client">
      <div className="relative">
        <Header />
        <HeroBanner />
        <BirdsEye />
        <RealTimeUpdates />
        <MultiCluster />
        <ManageNamespaces />
        <DashboardView />
        <NativeKubernetes />
        <ChartRepositories />
        {/* Hack to disable Hubspot to collect info from non-HubSpot forms */}
        {/* reference: https://community.hubspot.com/t5/Lead-Capture-Tools/Ignore-a-specific-non-Hubspot-form-from-being-collected/m-p/367909/highlight/true#M4606 */}
        <span id="CollectedForms-5061743"></span>
        <Footer />
      </div>
    </Layout>
  )
}

export default Index
