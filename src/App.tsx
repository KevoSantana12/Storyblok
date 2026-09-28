import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

import Footer from './components/Footer';
import Header from './components/Header';

export default function App() {
  const { pathname } = useLocation();

  // Start each new page at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="shell">
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <div id="content" className="shell__main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
