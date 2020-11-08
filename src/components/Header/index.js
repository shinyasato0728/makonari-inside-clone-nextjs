import React from 'react';
import Link from 'next/link';
import ActiveLink from '../ActiveLink';
import { connect } from 'react-redux';

import * as routes from '../../constants/routes';
import SignOutButton from '../SignOut';

const Header = ({ authUser }) => {
  return (
    <header style={{ width: '100%' }} className="u-d-flex u-jc-c u-ai-c">
      { authUser
          ? <HeaderAuth />
          : <HeaderNonAuth />
      }
    </header>
  )
}

const HeaderAuth = () => {
  return (
    <nav className="u-d-flex u-jc-sb">
      <div className="u-d-flex u-jc-c">
        <ActiveLink activeClassName="u-active-link" href={routes.HOME}>
          <a className="u-d-flex u-d-flex-wp u-jc-c u-ai-c"><img src="/images/icons/house.svg" alt="" />ホーム</a>
        </ActiveLink>
      </div>
      <div className="u-d-flex u-jc-c">
        <SignOutButton />
      </div>
    </nav>
  )
}

const HeaderNonAuth = () => {
  return (
    <nav className="u-d-flex u-jc-sb">
      <div className="u-d-flex u-jc-c">
        <ActiveLink activeClassName="u-active-link" href={routes.HOME}>
          <a className="u-d-flex u-d-flex-wp u-jc-c u-ai-c"><img src="/images/icons/house.svg" alt="" />ホーム</a>
        </ActiveLink>
      </div>
      <div className="u-d-flex u-jc-c">
        <ActiveLink activeClassName="u-active-link" href={routes.SIGN_UP}>
          <a className="u-d-flex u-d-flex-wp u-jc-c u-ai-c"><img src="/images/icons/signup.svg" alt="" />アカウント作成</a>
        </ActiveLink>
        <ActiveLink activeClassName="u-active-link" href={routes.SIGN_IN}>
          <a className="u-d-flex u-d-flex-wp u-jc-c u-ai-c"><img src="/images/icons/login.svg" alt="" />ログイン</a>
        </ActiveLink>
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Header);
