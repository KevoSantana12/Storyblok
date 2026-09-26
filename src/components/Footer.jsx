import { Link } from 'react-router';

import { Logo } from './Icons';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__about">
          <Link to="/" className="brand brand--light" aria-label="Rumbo, go to home page">
            <Logo size={28} ring="#F6F0E6" north="#E3B26B" south="#F6F0E6" />
            <span className="brand__name">Rumbo</span>
          </Link>
          <p>A magazine about slow travel, honest routes and places worth your time.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="footer-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/destinations">Destinations</Link>
            </li>
          </ul>
        </nav>
      </div>
      <p className="site-footer__legal">© {new Date().getFullYear()} Rumbo. Demo site with fictional content.</p>
    </footer>
  );
}
