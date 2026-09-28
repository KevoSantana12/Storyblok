import { StoryblokComponent, storyblokEditable, type SbBlokData } from '@storyblok/react';

interface FeatureGridBlok extends SbBlokData {
    headline?: string;
    intro?: string;
    items?: SbBlokData[];
}

export default function FeatureGrid({ blok }: { blok: FeatureGridBlok }) {
    return (
        <section className="feature-grid" {...storyblokEditable(blok)}>
            <div className="section-head--narrow">
                <h2 className="section-title">{blok.headline}</h2>
                {blok.intro && <p className="section-intro">{blok.intro}</p>}
            </div>
            <div className="feature-grid__items">
                {blok.items?.map((nestedBlok) => (
                    <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                ))}
            </div>
        </section>
    );
}