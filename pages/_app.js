import React from "react";
import App, { Container } from "next/app";
import Head from 'next/head';
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";

import initStore from "../src/store";

import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

import '../styles/_utility.css';
import '../styles/navigation.css';
import '../styles/footer.css';
import '../styles/global.css';

class EnhancedApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover" />
        </Head>
        <Provider store={store}>
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore)(EnhancedApp);
