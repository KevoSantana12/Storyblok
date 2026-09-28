import { Link } from 'react-router';
import {
    StoryblokRichText,
    storyblokEditable,
    type ISbStoryData,
    type SbBlokData,
    type StoryblokRichTextNode,
    type StoryblokReactRichTextProps,
} from '@storyblok/react';

import { ArrowLeft } from '../landing/Utils/Icons';

interface DestinationBlok extends SbBlokData {
    title?: string;
    country?: string;
    region?: string;
    summary?: string;
    best_time_to_visit?: string;
    author?: string;
    cover_image?: { filename: string; alt?: string | null }; // Asset → objeto
    body?: StoryblokRichTextNode;                            // Richtext → documento JSON
}

export default function Destination({ blok, story }: { blok: DestinationBlok; story?: ISbStoryData }) {
    const initials = (blok.author || '')
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2);
    const published = story?.first_published_at || story?.created_at;

    return (
        <main className="destination" {...storyblokEditable(blok)}>
            <div className="destination__wide">
                <BackLink />
            </div>

            <header className="destination__header">
                <p className="eyebrow eyebrow--wide">{[blok.country, blok.region].filter(Boolean).join(' · ')}</p>
                <h1 className="destination__title">{blok.title}</h1>
            </header>

            {blok.cover_image?.filename && (
                <figure className="destination__cover destination__wide">
                    <img src={blok.cover_image.filename} alt={blok.cover_image.alt || `View of ${blok.title}`} />
                </figure>
            )}

            <dl className="destination__meta">
                <div>
                    <dt>Best time to visit</dt>
                    <dd className="destination__season">{blok.best_time_to_visit}</dd>
                </div>
                <div>
                    <dt>Author</dt>
                    <dd className="destination__author">
                        <span className="avatar" aria-hidden="true">{initials}</span>
                        {blok.author}
                    </dd>
                </div>
                <div>
                    <dt>Published</dt>
                    <dd>{published ? new Date(published).toLocaleDateString('en-US', { dateStyle: 'long' }) : 'Draft'}</dd>
                </div>
            </dl>

            {blok.body && (
                <StoryblokRichText
                    document={blok.body}
                    className="prose"
                    components={{ image: RichTextImage }}
                />
            )}

            <div className="destination__footer">
                <BackLink />
            </div>
        </main>
    );
}

// Imagen dentro del rich text: el "title" se muestra como pie de foto
function RichTextImage({ attrs }: StoryblokReactRichTextProps<'image'>) {
    if (!attrs.src) return null;

    return (
        <figure className="prose__figure">
            <div className="prose__media">
                <img src={attrs.src} alt={attrs.alt ?? ''} />
            </div>
            {attrs.title && <figcaption>{attrs.title}</figcaption>}
        </figure>
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