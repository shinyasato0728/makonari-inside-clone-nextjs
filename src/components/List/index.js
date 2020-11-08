import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

import * as routes from "../../../src/constants/routes";

const List = ({ authUser }) => {
  return (
    <div>
      { authUser
          ? <ListAuth />
          : <ListNonAuth />
      }
    </div>
  )
}

const ListAuth = () => {
  return (
    <article>
      <Link href="/logincontents">
        <a style={{ width: '100%', border: '1px solid #e7e8ea', padding: '48px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>ログイン後の記事詳細へのリンク</a>
      </Link>
    </article>
  )
}

const ListNonAuth = () => {
  return (
    <article style={{ textAlign: 'center' }}>
      <img style={{ maxWidth: '300px', marginBottom: '24px' }} src="/images/logos/nextjs.svg" alt="" />
      <p>フロントはNext.js製です。</p>
      <p>Inside Storiesのソースコードに記載されています。</p>
      <p>レスポンシブにさせたかったので、デザインは変えています。</p>
      <hr />
      <img style={{ maxWidth: '300px', marginBottom: '24px' }} src="/images/logos/postcss.svg" alt="" />
      <p>CSSのパーサーはPostCSSを使用しました。</p>
      <hr />
      <img style={{ maxWidth: '300px', marginBottom: '24px' }} src="/images/logos/firebase_auth.svg" alt="" />
      <p>認証はFirebaseを使用しました。</p>
    </article>
  )
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(List);
