import { useParams } from 'react-router';
import { StoryblokComponent, useStoryblok } from '@storyblok/react';
import { version } from '../storyblok/config';
import Loader from '../components/Loader';

export default function StoryPage() {
    const params = useParams();
    const path = params['*']?.replace(/\/$/, '');

    const slug = path || 'landing';

    const story = useStoryblok(slug, { version: version });

    if (!story?.content) return <Loader />;

    return <StoryblokComponent blok={story.content} story={story} />;
}