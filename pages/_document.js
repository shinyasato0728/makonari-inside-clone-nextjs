import { Fragment } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { resetIdCounter } from "react-tabs";

import * as names from "../src/constants/names";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    resetIdCounter();
    const isProduction = process.env.NODE_ENV === 'production';

    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps, isProduction };
  }

  render() {
    const { isProduction } = this.props;

    return (
      <Html>
        <Head>
          <meta name="robots" content="noindex" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content={names.AUTHOR} />
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
          <link href="https://cdn.jsdelivr.net/npm/yakuhanjp@3.0.0/dist/css/yakuhanjp.min.css" rel="stylesheet" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link rel="apple-touch-icon" sizes="152x152" href="/static/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="152x152"  href="/static/android-icon.png" />
          <script src="https://kit.fontawesome.com/5d32fd4d7d.js" crossOrigin="anonymous" />
          {isProduction && (
            <Fragment>
              <script async src="https://www.googletagmanager.com/gtag/js?id=xxxxxxx" />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'UA-xxxxxxx', { 'optimize_id': 'GTM-xxxxxxx'});
                `
                }}
              />
            </Fragment>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
