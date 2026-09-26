import { Link } from 'react-router';

export default function PageHeader({ headline, intro, crumb }) {
  return (
    <section className="page-header">
      <nav aria-label="Breadcrumb">
        <ol className="breadcrumb">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{crumb}</li>
        </ol>
      </nav>
      <h1 className="page-header__title">{headline}</h1>
      <p className="page-header__intro">{intro}</p>
      <hr />
    </section>
  );
}
