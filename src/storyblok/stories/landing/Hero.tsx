import { Link } from 'react-router';
import { storyblokEditable, type SbBlokData } from '@storyblok/react';

import { ArrowRight } from './Utils/Icons';

interface HeroBlok extends SbBlokData {
    headline: string;
    subheadline?: string;
    image?: { filename: string; alt?: string };
    cta_text?: string;
    cta_link?: { cached_url: string };
}

export default function Hero({ blok }: { blok: HeroBlok }) {
    const ctaHref = `/${blok.cta_link?.cached_url || 'destinations'}`;

    return (
        <section className="hero" aria-label="Introduction" {...storyblokEditable(blok)}>

            {blok.image?.filename ? (
                <img className="hero__bg" src={blok.image.filename} alt={blok.image.alt || ''} />
            ) : (
                <MountainArt />
            )}
            <div className="hero__shade" aria-hidden="true" />
            <div className="hero__content">
                <h1 className="hero__title">{blok.headline}</h1>
                <p className="hero__sub">{blok.subheadline}</p>

                {blok.cta_text && (
                    <Link to={ctaHref} className="btn btn--primary">
                        {blok.cta_text}
                        <ArrowRight />
                    </Link>
                )}
            </div>
        </section>
    );
}

function MountainArt() {
    return (
        <svg className="hero__bg" aria-hidden="true" viewBox="0 0 1440 680" preserveAspectRatio="xMidYMax slice">
            <rect width="1440" height="680" fill="#6E7F66" />
            <circle cx="1060" cy="220" r="64" fill="#E3B26B" />
            <path d="M0 430 L180 330 L330 400 L560 240 L760 380 L960 290 L1170 410 L1440 300 L1440 680 L0 680 Z" fill="#4A6450" />
            <path d="M0 540 L240 430 L470 520 L720 410 L990 540 L1220 450 L1440 520 L1440 680 L0 680 Z" fill="#2E4637" />
            <path d="M0 620 L300 560 L620 630 L900 570 L1200 640 L1440 590 L1440 680 L0 680 Z" fill="#1E3127" />
        </svg>
    );
}
