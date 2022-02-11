import FeatureSection from "@components/FeatureSection";
import React from "react";

export default function BirdsEye() {
  return (
    <FeatureSection title="Bird's eye view of the Cluster state" img="/images/deployment-nginx.png" alt="deployment process of nginx">
      <li>One screen to view all the related cluster&apos;s objects and their dependencies</li>
      <li>Red/Green ready-state for all objects to provide a quick health check view</li>
      <li>Quick action buttons to facilitate deletion or scaling of the application</li>
    </FeatureSection>
  )
}
