import firebase from "firebase/app"
import React, { Component } from "react";
import Router from "next/router";
import Head from 'next/head';

import { AppWithAuthentication } from "../src/components/App";
import { auth } from "../src/firebase";
import * as routes from "../src/constants/routes";
import * as names from "../src/constants/names";

const metaOgimage = `${routes.SITE_URL}/images/ogp/main_ogp.jpg`

const SignUpPage = () => (
  <AppWithAuthentication>
    <SignUpForm />
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

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    auth
      .doCreateUserWithEmailAndPassword(email, password)
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
          <title>アカウント作成 | {names.PORTFOLIO}</title>
          <meta name="description" content={names.PORTFOLIO_DESCRIPTION} />
          <meta property="og:title" content="アカウント作成" />
          <meta property="og:description" content={names.PORTFOLIO_DESCRIPTION} />
          <meta property="og:image" content={metaOgimage} />
          <meta name="twitter:title" content="アカウント作成" />
          <meta name="twitter:description" content={names.PORTFOLIO_DESCRIPTION} />
        </Head>
        <h1 style={{ margin: '64px 0' }}>アカウント作成</h1>
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
              <button style={{ padding: '16px 48px', borderRadius: '8px' }} className="u-b-darkgray" disabled={isInvalid} type="submit">アカウント作成</button>
            </div>
            {error && <p style={{ textAlign: 'center' }}>{error.message}</p>}
          </form>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
