import { storyblokEditable, type SbBlokData } from '@storyblok/react';

import { FeatureIcon } from './Utils/Icons';

interface FeatureBlok extends SbBlokData {
    icon?: 'compass' | 'leaf' | 'map';
    title?: string;
    text?: string;
}

export default function Feature({ blok }: { blok: FeatureBlok }) {
    return (
        <div className="feature" {...storyblokEditable(blok)}>
            <div className="feature__icon">
                <FeatureIcon name={blok.icon} />
            </div>
            <h3 className="feature__title">{blok.title}</h3>
            <p className="feature__text">{blok.text}</p>
        </div>
    );
}