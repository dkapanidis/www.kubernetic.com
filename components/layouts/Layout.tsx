import React, { useEffect } from 'react'
import { initHubspot } from '@utils/hubspot/hubspot'
import { initGA, logPageView } from '@utils/utils/analytics'
import Head from 'next/head'
import { FirestoreProvider, useFirebaseApp } from 'reactfire'
import { getFirestore } from '@firebase/firestore'

type LayoutProps = { children: any, title: string }
export default function Layout({ children, title }: LayoutProps) {
  const app = useFirebaseApp()
  const firestore = getFirestore(app);

  useEffect(() => {
    initHubspot()
    initGA()
    logPageView()
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Kubernetic - {title}</title>

        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="google-site-verification" content="" />

        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

        <meta name="apple-mobile-web-app-title" content="Kubernetic" />
        <meta name="application-name" content="Kubernetic" />
        <meta name="theme-color" content="#5f93e7" />

        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />

        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="description" content="Kubernetic is a brand new Desktop Client for Kubernetes that lets developers and ops manage their Kubernetes cluster(s) through a UI interface in a very simple way." />
        <meta name="keywords" content="" />

        <meta name="twitter:card" content="photo" />
        <meta name="twitter:url" content="https://kubernetic.com/" />
        <meta name="twitter:title" content="Kubernetic - The Kubernetes Desktop Client" />
        <meta name="twitter:description" content="Kubernetic is a brand new Desktop Client for Kubernetes that lets developers and ops manage their Kubernetes cluster(s) through a UI interface in a very simple way." />
        <meta name="twitter:image" content="https://kubernetic.com/images/og-image.webp" />
        <meta name="twitter:image:width" content="600" />
        <meta name="twitter:image:height" content="315" />
        <meta name="twitter:site" content="@harburio" />
        <meta name="twitter:creator" content="@harburio" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kubernetic - The Kubernetes Desktop Client" />
        <meta property="og:description" content="Kubernetic is a brand new Desktop Client for Kubernetes that lets developers and ops manage their Kubernetes cluster(s) through a UI interface in a very simple way." />
        <meta property="og:url" content="https://www.kubernetic.com" />
        <meta property="og:image" content="https://kubernetic.com/images/og-image.webp" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="315" />

        <meta property="fb:admins" content="" />

        <link
          href={`https://unpkg.com/prismjs@0.0.1/themes/prism-tomorrow.css`}
          rel="stylesheet"
        />
      </Head>
      <div>
        <FirestoreProvider sdk={firestore}>

          {children}
        </FirestoreProvider>
      </div>
    </>
  )
}
