import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useStoryblokApi, type ISbStoryData } from '@storyblok/react';

import DestinationCard from '../components/Card';
import { version } from '../storyblok/config';
import Loader from '../components/Loader';

export default function DestinationsPage() {
  const api = useStoryblokApi();
  // @ts-ignore
  const [stories, setStories] = useState<ISbStoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('cdn/stories', {
        version: version,
        starts_with: 'destinations/',
        content_type: 'destination',
        sort_by: 'first_published_at:desc',
        per_page: 100,
      })
      .then(({ data }) => setStories(data.stories))
      .finally(() => setLoading(false));
  }, [api]);

  return (
    <main>
      <section className="page-header">
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Destinations</li>
          </ol>
        </nav>
        <h1 className="page-header__title">All destinations</h1>
        <p className="page-header__intro">
          Places we explored without rushing, from Pacific beaches to the canyons of the Atlas. Pick one and start planning.
        </p>
        <hr />
      </section>

      <section className="destination-grid">
        {loading ? (
          <Loader label="Loading destinations…" inline />
        ) : (
          <ul className="destination-grid__items">
            {stories.map((story, index) => (
              <li key={story.uuid}>
                <DestinationCard
                  slug={story.slug}
                  title={story.content.title}
                  country={story.content.country}
                  summary={story.content.summary}
                  image={story.content.cover_image?.filename}
                  index={index}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}