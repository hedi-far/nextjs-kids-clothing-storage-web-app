import React from 'react';
// import { NextPage } from 'next';
import globalStyles from '../shared/Styles';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {globalStyles}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
