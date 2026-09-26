import CtaBanner from '../components/CtaBanner';
import DestinationGrid from '../components/DestinationGrid';
import FeatureGrid from '../components/FeatureGrid';
import Hero from '../components/Hero';
import { destinations } from '../data/destinations';

const features = [
  {
    icon: 'compass',
    title: 'Routes tested in person',
    text: 'We walked every itinerary ourselves. If a trail is not worth it, we do not recommend it.',
  },
  {
    icon: 'leaf',
    title: 'Slow, responsible travel',
    text: 'We favor local stays, public transport and seasons that are kind to the communities who host us.',
  },
  {
    icon: 'map',
    title: 'Pocket-sized guides',
    text: 'Downloadable maps, clear budgets and everything nobody tells you before you arrive.',
  },
];

export default function HomePage() {
  return (
    <main>
      <Hero
        headline="The world makes more sense on foot."
        subheadline="Stories, routes and honest advice from travelers who take their time. Pick a direction and start walking."
        image=""
        ctaText="Explore destinations"
        ctaLink="/destinations"
      />

      <DestinationGrid
        headline="Featured destinations"
        intro="Three places we would go back to tomorrow."
        moreText="See all destinations"
        moreLink="/destinations"
        destinations={destinations.slice(0, 3)}
      />

      <FeatureGrid
        headline="Why travel with us"
        intro="We write from the road, not from a desk. Here is what you will find in every guide."
        items={features}
      />

      <CtaBanner
        headline="Travel stories, straight to your inbox."
        text="Our favorite route of the month, a destination to discover and practical tips for traveling better. No noise."
        buttonText="Subscribe"
      />
    </main>
  );
}
