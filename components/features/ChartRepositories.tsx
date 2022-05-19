import FeatureSection from "@components/FeatureSection"
import React from "react"

export default function ChartRepositories() {
  return (
    <FeatureSection title="Chart Repositories Support" img="/images/chart-repos.png" alt="chart repositories">
      <li>Fully compatible with{" "}<a target="_new" href="https://helm.sh/">Helm</a>{" "} Chart Repositories</li>
      <li>Public & Private Repositories support</li>
      <li>One Click install process for the Charts</li>
      <li>Manage Chart releases on the cluster through Kubernetic</li>
    </FeatureSection>
  )
}
