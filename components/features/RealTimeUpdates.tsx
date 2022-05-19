import { FeatureBlackSection } from "@components/FeatureSection"
import React from "react"

export default function RealTimeUpdates() {
  return (
    <FeatureBlackSection title="Real Time updates" img="/images/deployment-update-version.gif" alt="update a deployment version and see results on real-time">
      <li>Get real-time updates of the state of your cluster</li>
      <li>See the evolution of your cluster as it changes the actual state to meet desired state of cluster</li>
      <li>Pin-point possible issues of downtime throughout application upgrade process, by getting eyes on-site</li>
      <li>Training of developers / ops is much easier when they can see the actual process</li>
    </FeatureBlackSection>
  )
}
