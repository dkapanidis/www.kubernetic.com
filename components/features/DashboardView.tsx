import FeatureSection from "@components/FeatureSection"
import React from "react"

export default function DashboardView() {
  return (
    <FeatureSection title="Dashboard view" img="/images/dashboard.png" alt="dashboard view">
      <li>Real time counters of the objects in Kubernetes</li>
      <li>Ideal for Wall or second screen displays</li>
    </FeatureSection>
  )
}
