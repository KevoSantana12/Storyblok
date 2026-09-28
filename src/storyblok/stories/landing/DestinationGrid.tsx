import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { storyblokEditable, useStoryblokApi, type ISbStoryData, type SbBlokData } from '@storyblok/react';

import { ArrowRight } from './Utils/Icons';
import DestinationCard from '../../../components/Card';
import { version } from '../../config';
import Card from '../../../components/Card';

interface DestinationGridBlok extends SbBlokData {
    headline?: string;
    intro?: string;
    more_text?: string;
    more_link?: { cached_url: string }; // campo Link → objeto
    limit?: string;                     // opcional: cuántos mostrar (vacío = todos)
}

export default function DestinationGrid({ blok }: { blok: DestinationGridBlok }) {
    const api = useStoryblokApi();
    const [stories, setStories] = useState<ISbStoryData[]>([]);

    useEffect(() => {
        api
            .get('cdn/stories', {
                version: version,
                starts_with: 'destinations/',
                content_type: 'destination',
                sort_by: 'first_published_at:desc',
                per_page: blok.limit ? Number(blok.limit) : 100,
            })
            .then(({ data }) => setStories(data.stories));
    }, [api, blok.limit]);

    const moreHref = `/${blok.more_link?.cached_url || 'destinations'}`;

    return (
        <section className="destination-grid" {...storyblokEditable(blok)}>
            {blok.headline && (
                <div className="section-head--split">
                    <div className="section-head--narrow">
                        <h2 className="section-title">{blok.headline}</h2>
                        {blok.intro && <p className="section-intro">{blok.intro}</p>}
                    </div>
                    {blok.more_text && (
                        <Link to={moreHref} className="text-link">
                            {blok.more_text}
                            <ArrowRight size={16} />
                        </Link>
                    )}
                </div>
            )}

            <ul className="destination-grid__items">
                {stories.map((story, index) => (
                    <li key={story.uuid}>
                        <Card
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
        </section>
    );
}