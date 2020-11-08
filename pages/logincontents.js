import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import * as routes from "../src/constants/routes";
import * as names from "../src/constants/names";

const metaOgimage = `${routes.SITE_URL}/images/ogp/main_ogp.jpg`

const LoginContents = ({ authUser }) => {
  return (
    <div>
      { authUser
          ? <LoginContentsAuth />
          : <LoginContentsNonAuth />
      }
    </div>
  )
}

const LoginContentsAuth = () => {
  return (
    <article style={{ marginTop: '64px', textAlign: 'center' }}>
      <Head>
        <title>ログイン後のコンテンツ | {names.PORTFOLIO}</title>
        <meta name="description" content={names.PORTFOLIO_DESCRIPTION} />
        <meta property="og:title" content="ログイン" />
        <meta property="og:description" content={names.PORTFOLIO_DESCRIPTION} />
        <meta property="og:image" content={metaOgimage} />
        <meta name="twitter:title" content="ログイン" />
        <meta name="twitter:description" content={names.PORTFOLIO_DESCRIPTION} />
      </Head>
      <p>ログイン後のコンテンツです。</p>
      <p>ログイン前にこちらのページに来ると、トップページへリダイレクトされます。</p>
    </article>
  )
}

const LoginContentsNonAuth = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/');
  });
  return <div />;
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(LoginContents);
