import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout(props) {
  return (
    <>
      <Head>
        <html lang="eng" />
      </Head>
      <Header loggedIn={props.loggedIn} />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
