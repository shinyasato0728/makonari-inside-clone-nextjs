import React from 'react';
import Link from 'next/link';

import * as routes from '../../constants/routes';

const Footer = () => {
  return (
    <footer style={{ width: '100%' }}>
      <div style={{ margin: '0 auto' }} className="footer__box u-d-flex u-jc-sb u-ai-c">
        <small>© Shinya Sato</small>
        <div>
          <Link href={routes.GITHUB}>
            <a style={{ textDecoration: 'underline' }} target="_blank" rel="nofollow noopener noreferrer">Github<i style={{ marginLeft: '4px' }} className="fas fa-external-link-alt" aria-hidden="true" /></a>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
