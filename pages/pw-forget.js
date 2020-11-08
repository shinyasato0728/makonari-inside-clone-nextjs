import firebase from "firebase/app"
import React, { Component } from "react";
import Router from "next/router";
import Head from 'next/head';

import { AppWithAuthentication } from "../src/components/App";
import { auth } from "../src/firebase";
import * as routes from "../src/constants/routes";
import * as names from "../src/constants/names";

const metaOgimage = `${routes.SITE_URL}/images/ogp/main_ogp.jpg`

const PasswordForgetPage = () => (
  <AppWithAuthentication>
    <PasswordForgetForm />
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

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = email === "";

    return (
      <div>
        <Head>
          <title>パスワードリセット | {names.PORTFOLIO}</title>
          <meta name="description" content={names.PORTFOLIO_DESCRIPTION} />
          <meta property="og:title" content="パスワードリセット" />
          <meta property="og:description" content={names.PORTFOLIO_DESCRIPTION} />
          <meta property="og:image" content={metaOgimage} />
          <meta name="twitter:title" content="パスワードリセット" />
          <meta name="twitter:description" content={names.PORTFOLIO_DESCRIPTION} />
        </Head>
        <h1 style={{ margin: '64px 0' }}>パスワードリセット</h1>
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
            <div style={{ marginTop: '32px', textAlign: 'center', borderRadius: '8px' }}>
              <button style={{ padding: '16px 48px', borderRadius: '8px' }} className="u-b-darkgray" disabled={isInvalid} type="submit">パスワードリセット</button>
            </div>
            {error && <p style={{ textAlign: 'center' }}>{error.message}</p>}
          </form>
        </div>
      </div>
    );
  }
}

export default PasswordForgetPage;
