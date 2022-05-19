import { FeatureBlackSection } from "@components/FeatureSection"
import React from "react"

export default function ManageNamespaces() {
  return (
    <FeatureBlackSection title="Easy Namespace Management" img="/images/namespaces.gif" alt="view and creation process of namespaces">
      <li>Manage your namespaces easily through the UI</li>
      <li>Instant switch of current namespace on the top menu.</li>
      <li>Possibility to switch to aggregate view of <i>All</i> namespaces</li>
    </FeatureBlackSection>
  )
}
