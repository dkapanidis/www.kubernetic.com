import { firebaseConfig } from '@components/firebase';
import 'balloon-css';
import React from 'react';
import { FirebaseAppProvider } from 'reactfire';
import '../styles/index.css';
import '../styles/semantic.css';

type MyAppProps = { Component: any, pageProps: any }

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
    <Component {...pageProps} />
    </FirebaseAppProvider>
  )
}

export default MyApp
