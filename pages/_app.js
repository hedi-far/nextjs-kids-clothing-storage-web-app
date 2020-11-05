import React from 'react';
import { NextPage } from 'next';
import globalStyles from '../components/GlobalStyles';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {globalStyles}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
