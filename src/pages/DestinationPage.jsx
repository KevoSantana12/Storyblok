import { Fragment } from 'react';
import { Link, useParams } from 'react-router';

import { ArrowLeft, ImagePlaceholder } from '../components/Icons';
import { destinations } from '../data/destinations';
import NotFoundPage from './NotFoundPage';

export default function DestinationPage() {
  const { slug } = useParams();
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) return <NotFoundPage />;

  const { title, country, region, bestTimeToVisit, author, date, image, intro, sections } = destination;
  const initials = author
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2);

  return (
    <main className="destination">
      <div className="destination__wide">
        <BackLink />
      </div>

      <header className="destination__header">
        <p className="eyebrow eyebrow--wide">
          {country} · {region}
        </p>
        <h1 className="destination__title">{title}</h1>
      </header>

      <figure className="destination__cover destination__wide">
        {image ? <img src={image} alt={`View of ${title}`} /> : <CoverArt />}
      </figure>

      <dl className="destination__meta">
        <div>
          <dt>Best time to visit</dt>
          <dd className="destination__season">{bestTimeToVisit}</dd>
        </div>
        <div>
          <dt>Author</dt>
          <dd className="destination__author">
            <span className="avatar" aria-hidden="true">
              {initials}
            </span>
            {author}
          </dd>
        </div>
        <div>
          <dt>Published</dt>
          <dd>{date}</dd>
        </div>
      </dl>

      <div className="prose">
        <p>{intro}</p>
        {sections.map((section) => (
          <Fragment key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.image && (
              <figure className="prose__figure">
                <div className="prose__media">
                  {section.image.src ? <img src={section.image.src} alt="" /> : <ImagePlaceholder />}
                </div>
                <figcaption>{section.image.caption}</figcaption>
              </figure>
            )}
          </Fragment>
        ))}
      </div>

      <div className="destination__footer">
        <BackLink />
      </div>
    </main>
  );
}

function BackLink() {
  return (
    <Link to="/destinations" className="back-link">
      <ArrowLeft />
      Back to destinations
    </Link>
  );
}

// Cover illustration from the design, used while there is no photo.
function CoverArt() {
  return (
    <svg aria-hidden="true" viewBox="0 0 1280 640" preserveAspectRatio="xMidYMid slice">
      <rect width="1280" height="640" fill="#C99A68" />
      <circle cx="820" cy="300" r="70" fill="#F0C98E" />
      <rect y="360" width="1280" height="280" fill="#3F6B66" />
      <path d="M0 360 L0 170 L90 150 L180 210 L260 250 L340 300 L420 360 Z" fill="#2F4A3A" />
      <path d="M1280 360 L1280 120 L1180 150 L1080 220 L990 280 L900 360 Z" fill="#2F4A3A" />
      <path d="M0 460 C 300 420, 520 500, 800 470 S 1150 440, 1280 470 L1280 640 L0 640 Z" fill="#2F2A24" opacity="0.55" />
    </svg>
  );
}
