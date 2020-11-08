import React from "react";
import Head from 'next/head';

import { AppWithAuthentication } from "../src/components/App";

import List from '../src/components/List';

import * as routes from "../src/constants/routes";
import * as names from "../src/constants/names";

const metaOgimage = `${routes.SITE_URL}/images/ogp/main_ogp.jpg`

const IndexPage = () => {
  return (
    <AppWithAuthentication>
      <Head>
        <title>{names.PORTFOLIO}です</title>
        <meta name="description" content={names.PORTFOLIO_DESCRIPTION} />
        <meta property="og:title" content={names.PORTFOLIO} />
        <meta property="og:description" content={names.PORTFOLIO_DESCRIPTION} />
        <meta property="og:image" content={metaOgimage} />
        <meta name="twitter:title" content={names.PORTFOLIO} />
        <meta name="twitter:description" content={names.PORTFOLIO_DESCRIPTION} />
      </Head>
      <h1 style={{ margin: '80px 0' }} className="index__title">YouTuberマコなり社長が運営するInside Storiesのクローンサイトです。</h1>
      <List />
    </AppWithAuthentication>
  );
}

export default IndexPage;
