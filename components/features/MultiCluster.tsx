import FeatureSection from "@components/FeatureSection"
import React from "react"

export default function MultiCluster() {
  return (
    <FeatureSection title="Multiple Clusters support" img="/images/clusters.gif" alt="manage multiple contexts of kubeconfig">
      <li>No configuration needed, just point and connect.</li>
      <li>Uses your <i><code className="text-purple-700">~/.kube/config</code></i> file for authentication.</li>
      <li>If you have <i><code className="text-purple-700">kubectl</code></i> working, then Kubernetic will be up and running in no time.</li>
      <li>Syncs current cluster between Kubernetic and <i><code className="text-purple-700">kubectl</code></i> so you can use both at any time.</li>
    </FeatureSection>
  )
}
