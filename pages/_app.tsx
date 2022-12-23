import type { AppProps } from 'next/app';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Toaster } from 'react-hot-toast';

import { chainId } from '../utils/contractDetails';

import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={chainId}>
      <Component {...pageProps} />
      <Toaster />
    </ThirdwebProvider>
  );
}

export default MyApp;
