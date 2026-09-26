import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <main className="status">
      <h1 className="status__title">Page not found</h1>
      <p className="muted">The destination may have moved, or the link may be mistyped.</p>
      <Link to="/" className="btn btn--primary">
        Back to home
      </Link>
    </main>
  );
}
