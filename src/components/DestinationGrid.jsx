import { Link } from 'react-router';

import DestinationCard from './DestinationCard';
import { ArrowRight } from './Icons';

export default function DestinationGrid({ headline, intro, moreText, moreLink, destinations }) {
  return (
    <section className="destination-grid">
      {headline && (
        <div className="section-head--split">
          <div className="section-head--narrow">
            <h2 className="section-title">{headline}</h2>
            {intro && <p className="section-intro">{intro}</p>}
          </div>
          {moreText && (
            <Link to={moreLink} className="text-link">
              {moreText}
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      )}

      <ul className="destination-grid__items">
        {destinations.map((destination, index) => (
          <li key={destination.slug}>
            <DestinationCard
              slug={destination.slug}
              title={destination.title}
              country={destination.country}
              summary={destination.summary}
              image={destination.image}
              index={index}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
