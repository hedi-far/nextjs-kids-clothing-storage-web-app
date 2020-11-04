import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout(props) {
  return (
    <>
      <Head>
        <html lang="eng" />
      </Head>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
