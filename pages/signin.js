import firebase from "firebase/app"
import Link from 'next/link';
import React, { Component } from "react";
import Router from "next/router";
import Head from 'next/head';

import { AppWithAuthentication } from "../src/components/App";
import { auth } from "../src/firebase";
import * as routes from "../src/constants/routes";
import * as names from "../src/constants/names";

const metaOgimage = `${routes.SITE_URL}/images/ogp/main_ogp.jpg`

const SignInPage = () => (
  <AppWithAuthentication>
    <SignInForm />
  </AppWithAuthentication>
);

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
        this.setState(() => ({ ...INITIAL_STATE }));
        Router.push(routes.HOME);
      })
      .catch(error => {
        this.setState(updateByPropertyName("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <div>
        <Head>
          <title>ログイン | {names.PORTFOLIO}</title>
          <meta name="description" content={names.PORTFOLIO_DESCRIPTION} />
          <meta property="og:title" content="ログイン" />
          <meta property="og:description" content={names.PORTFOLIO_DESCRIPTION} />
          <meta property="og:image" content={metaOgimage} />
          <meta name="twitter:title" content="ログイン" />
          <meta name="twitter:description" content={names.PORTFOLIO_DESCRIPTION} />
        </Head>
        <h1 style={{ margin: '64px 0' }}>ログイン</h1>
        <div style={{ margin: '0 auto' }} className="u-w-small">
          <form onSubmit={this.onSubmit}>
            <span className="u-d-flex">メールアドレス</span>
            <input
              style={{ marginBottom: '32px', padding: '8px 16px', width: '100%', borderRadius: '8px' }}
              className="u-d-flex u-b-lighter"
              value={email}
              onChange={event =>
                  this.setState(updateByPropertyName("email", event.target.value))
              }
              type="text"
              placeholder="メールアドレス"
            />
            <span className="u-d-flex">パスワード</span>
            <input
              style={{ padding: '8px 16px', width: '100%', borderRadius: '8px' }}
              className="u-d-flex u-b-lighter"
              value={password}
              onChange={event =>
                  this.setState(updateByPropertyName("password", event.target.value))
              }
              type="password"
              placeholder="パスワード"
            />
            <div style={{ marginTop: '32px', textAlign: 'center', borderRadius: '8px' }}>
              <button style={{ padding: '16px 48px', borderRadius: '8px' }} className="u-b-darkgray" disabled={isInvalid} type="submit">ログイン</button>
            </div>
            {error && <p style={{ textAlign: 'center' }}>{error.message}</p>}
          </form>
          <hr />
          <div style={{ textAlign: 'center' }}>
            <h2>パスワードをお忘れの方はこちら</h2>
            <Link href={routes.PW_FORGET}>
              <a style={{ textDecoration: 'underLine' }}>パスワードリセット</a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInPage;
