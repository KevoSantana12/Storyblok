import DestinationGrid from '../components/DestinationGrid';
import PageHeader from '../components/PageHeader';
import { destinations } from '../data/destinations';

export default function DestinationsPage() {
  return (
    <main>
      <PageHeader
        headline="All destinations"
        intro="Nine places we explored without rushing, from Pacific beaches to the canyons of the Atlas. Pick one and start planning."
        crumb="Destinations"
      />
      <DestinationGrid destinations={destinations} />
    </main>
  );
}
