import { NavLink } from 'react-router';

import { Logo } from './Icons';

export default function Header() {
  return (
    <header className="site-header">
      <NavLink to="/" className="brand" aria-label="Rumbo, go to home page">
        <Logo />
        <span className="brand__name">Rumbo</span>
      </NavLink>
      <nav aria-label="Main">
        <ul className="site-nav">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/destinations">Destinations</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
