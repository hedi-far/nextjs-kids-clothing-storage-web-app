import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
