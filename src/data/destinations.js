// Static content for the site. Every destination has the same fields.

export const destinations = [
  {
    slug: 'calm-bay',
    title: 'Calm Bay',
    country: 'Costa Rica',
    region: 'South Pacific',
    summary: 'A crescent of dark sand between two jungle headlands, perfect for switching off for three days.',
    bestTimeToVisit: 'December to April, in the dry season',
    author: 'Lucía Andrade',
    date: 'September 12, 2026',
    image: '',
    intro:
      'Some places announce themselves with signs; others you find by the smell of salt and ripe mango. Calm Bay is one of the latter: a crescent of dark sand between two jungle headlands, where the day starts with howler monkeys and ends when the sun slips behind the island across the water.',
    sections: [
      {
        heading: 'Getting there, slowly',
        paragraphs: [
          'From the capital, the bus ride takes about six hours, with a stop in the valley where you should try the highland coffee before heading down to the coast. The last few kilometers are gravel: in the rainy season, a high-clearance vehicle will save you a few scares.',
          'We like to arrive mid-afternoon. Low tide uncovers pools of warm water, and the village, with just one corner store and two diners, has not switched its lights on yet.',
        ],
        image: { src: '', caption: 'The northern headland at sunset, seen from the lookout trail.' },
      },
      {
        heading: 'What to do in three days',
        paragraphs: [
          'On day one, hike the lookout trail: an hour uphill through almond trees and heliconias that ends on a flat rock overlooking the whole coast. Bring water and start early; after ten the heat kicks in.',
          'On day two, rent a kayak and paddle to the island. The local fishermen know the currents better than any map: ask before you go out and take their advice.',
          'Leave day three unplanned. Calm Bay is best enjoyed when you are not trying to make the most of it: a hammock, a book and the sound of the tide are itinerary enough.',
        ],
      },
      {
        heading: 'Before you go',
        paragraphs: [
          'Bring cash, since the nearest ATM is forty minutes away. Book ahead for Easter week and, above all, take all your trash back with you: the bay stays this way because the people who visit look after it.',
        ],
      },
    ],
  },
  {
    slug: 'condor-ridge',
    title: 'Condor Ridge',
    country: 'Peru',
    region: 'Central Andes',
    summary: 'High-altitude hikes between turquoise lakes and villages where time is measured in harvests.',
    bestTimeToVisit: 'May to September, in the dry season',
    author: 'Mateo Quispe',
    date: 'September 8, 2026',
    image: '',
    intro: 'The lakes appear all at once, around a bend in the trail, in a color no photo manages to capture.',
    sections: [
      {
        heading: 'Acclimatize first',
        paragraphs: ['Spend two days in the base village before heading up. Walk slowly, drink coca tea and let your body get used to the altitude.'],
      },
    ],
  },
  {
    slug: 'tile-town',
    title: 'Tile Town',
    country: 'Portugal',
    region: 'Atlantic coast',
    summary: 'Steep streets, ceramic façades and long afternoons facing the Atlantic.',
    bestTimeToVisit: 'May, June and September',
    author: 'Inês Carvalho',
    date: 'September 3, 2026',
    image: '',
    intro: 'Every façade tells a story: a saint, a ship, a flower repeated endlessly. The whole town is a museum nobody ever closed.',
    sections: [
      {
        heading: 'Get lost on purpose',
        paragraphs: ['Climb to the lookout without a map and come down a different street. The best bakeries are not in any guidebook.'],
      },
    ],
  },
  {
    slug: 'emerald-valley',
    title: 'Emerald Valley',
    country: 'Colombia',
    region: 'Coffee region',
    summary: 'Coffee farms, wax palms and family estates that open their doors to unhurried visitors.',
    bestTimeToVisit: 'December to March',
    author: 'Lucía Andrade',
    date: 'August 27, 2026',
    image: '',
    intro: 'Here coffee is not just drunk, it is talked about. Every farm has its own story and its own way of roasting.',
    sections: [
      {
        heading: 'Sleep among the coffee plants',
        paragraphs: ['Choose a family-run farm: dinner is homemade and breakfast comes with the first coffee of the harvest.'],
      },
    ],
  },
  {
    slug: 'red-salt-flat',
    title: 'Red Salt Flat',
    country: 'Chile',
    region: 'Northern highlands',
    summary: 'A rust-tinted salt desert where the nights have more stars than noise.',
    bestTimeToVisit: 'March to May and September to November',
    author: 'Mateo Quispe',
    date: 'August 20, 2026',
    image: '',
    intro: 'The silence of the salt flat is so vast it feels strange at first. Later, it is hard to go back to the noise.',
    sections: [
      {
        heading: 'At night',
        paragraphs: ['Leave the village with warm clothes and a red flashlight. The Milky Way is visible to the naked eye.'],
      },
    ],
  },
  {
    slug: 'wind-canyon',
    title: 'Wind Canyon',
    country: 'Morocco',
    region: 'High Atlas',
    summary: 'Oases hidden in the folds of the Atlas and mint tea in the shade of the kasbahs.',
    bestTimeToVisit: 'Spring and autumn',
    author: 'Inês Carvalho',
    date: 'August 14, 2026',
    image: '',
    intro: 'The canyon opens and closes like an accordion, and in every fold there is a palm grove and a mud-brick village.',
    sections: [
      {
        heading: 'With a local guide',
        paragraphs: ['Hire someone from the valley: they know the safe passes and will invite you for a tea you will not forget.'],
      },
    ],
  },
  {
    slug: 'quiet-fjord',
    title: 'Quiet Fjord',
    country: 'Norway',
    region: 'West coast',
    summary: 'Still water, red cabins and trails that climb to where the trees run out.',
    bestTimeToVisit: 'June to August',
    author: 'Lucía Andrade',
    date: 'August 6, 2026',
    image: '',
    intro: 'In summer the sun barely sets, and the fjord stays in a golden light that lasts for hours.',
    sections: [
      {
        heading: 'Budget',
        paragraphs: ['It is expensive: cook in your cabin and shop at the village supermarket to make the trip last longer.'],
      },
    ],
  },
  {
    slug: 'tea-hills',
    title: 'Tea Hills',
    country: 'Sri Lanka',
    region: 'Highlands',
    summary: 'Slow trains through green plantations and sunrises wrapped in mist.',
    bestTimeToVisit: 'January to April',
    author: 'Mateo Quispe',
    date: 'July 30, 2026',
    image: '',
    intro: 'The train climbs so slowly that you can wave to the tea pickers from the window.',
    sections: [
      {
        heading: 'The best seat',
        paragraphs: ['Book second class on the right-hand side: you will get the best views of the valley.'],
      },
    ],
  },
  {
    slug: 'old-reef',
    title: 'Old Reef',
    country: 'Belize',
    region: 'Northern cays',
    summary: 'A car-free cay, reefs you can swim to from the shore and grilled fish at sunset.',
    bestTimeToVisit: 'February to May',
    author: 'Inês Carvalho',
    date: 'July 22, 2026',
    image: '',
    intro: 'On the cay everything is done barefoot and without hurry: the local motto is "go slow", and they mean it.',
    sections: [
      {
        heading: 'Under the water',
        paragraphs: ['Bring your own snorkel. Ten meters from the shore, the coral already begins.'],
      },
    ],
  },
];
