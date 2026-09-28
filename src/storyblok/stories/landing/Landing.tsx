
import { StoryblokComponent, storyblokEditable, type SbBlokData } from '@storyblok/react';

interface PageBlok extends SbBlokData {
    body?: SbBlokData[];
}

export default function Page({ blok }: { blok: PageBlok }) {
    return (
        <main>
            {blok.body?.map((nestedBlok) => (
                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
        </main>
    );
}