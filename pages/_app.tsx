import 'balloon-css';
import React from 'react';
import '../styles/index.css';
import '../styles/semantic.css';
import '../styles/prism-tomorrow.css'

type MyAppProps = { Component: any, pageProps: any }

function MyApp({ Component, pageProps }: MyAppProps) {
  return <Component {...pageProps} />
}

export default MyApp
