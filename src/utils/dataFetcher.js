// Comprehensive fact database - ensures variety and no repetition
const STATIC_FACTS = [
  // Geography
  { text: 'Mount Everest is 8,849 meters above sea level.', source: 'Geographic Data', value: '8,849 m', context: 'World\'s highest peak' },
  { text: 'The Sahara Desert covers about 9 million square kilometers.', source: 'Geographic Data', value: '9M km²', context: 'Largest hot desert' },
  { text: 'The Mariana Trench is 10,994 meters deep.', source: 'Oceanographic Data', value: '10,994 m', context: 'Deepest ocean point' },
  { text: 'The Amazon River discharges 209,000 cubic meters of water per second.', source: 'Hydrological Data', value: '209,000 m³/s', context: 'Largest river discharge' },
  { text: 'Antarctica contains about 26.5 million cubic kilometers of ice.', source: 'Glaciology Data', value: '26.5M km³', context: 'Earth\'s ice sheet' },
  { text: 'Lake Baikal in Russia is 1,642 meters deep.', source: 'Geographic Data', value: '1,642 m', context: 'World\'s deepest lake' },
  { text: 'The Great Barrier Reef spans 2,300 kilometers.', source: 'Marine Biology', value: '2,300 km', context: 'Largest coral reef system' },
  { text: 'Mount Kilimanjaro is 5,895 meters tall.', source: 'Geographic Data', value: '5,895 m', context: 'Africa\'s highest mountain' },
  { text: 'The Dead Sea is 430 meters below sea level.', source: 'Geographic Data', value: '-430 m', context: 'Lowest point on land' },
  { text: 'The Nile River is 6,650 kilometers long.', source: 'Geographic Data', value: '6,650 km', context: 'Longest river' },

  // Astronomy
  { text: 'The Moon is 384,400 kilometers from Earth on average.', source: 'Astronomical Data', value: '384,400 km', context: 'Moon orbital distance' },
  { text: 'Light travels at 299,792 kilometers per second.', source: 'Physics Constants', value: '299,792 km/s', context: 'Speed of light in vacuum' },
  { text: 'The Sun is 149.6 million kilometers from Earth.', source: 'Astronomical Data', value: '149.6M km', context: 'One Astronomical Unit' },
  { text: 'Mars has a day length of 24 hours and 37 minutes.', source: 'Planetary Science', value: '24h 37m', context: 'Martian sol' },
  { text: 'Jupiter has 95 confirmed moons.', source: 'Astronomical Data', value: '95 moons', context: 'As of 2023' },
  { text: 'Saturn\'s rings extend up to 282,000 kilometers from the planet.', source: 'Planetary Science', value: '282,000 km', context: 'Ring system diameter' },
  { text: 'Venus has an atmospheric pressure 92 times that of Earth.', source: 'Planetary Science', value: '92 atm', context: 'Surface pressure' },
  { text: 'Neptune takes 165 Earth years to orbit the Sun.', source: 'Astronomical Data', value: '165 years', context: 'Orbital period' },

  // Earth Science
  { text: 'Earth has a circumference of 40,075 kilometers at the equator.', source: 'Geodetic Data', value: '40,075 km', context: 'Equatorial circumference' },
  { text: 'The Earth\'s core temperature is about 5,200 degrees Celsius.', source: 'Geophysics', value: '5,200°C', context: 'Inner core temp' },
  { text: 'Earth\'s atmosphere is 78% nitrogen.', source: 'Atmospheric Science', value: '78%', context: 'Atmospheric composition' },
  { text: 'The Earth rotates at 1,674 kilometers per hour at the equator.', source: 'Geophysics', value: '1,674 km/h', context: 'Rotational speed' },
  { text: 'Ocean covers 71% of Earth\'s surface.', source: 'Oceanography', value: '71%', context: 'Water vs land' },

  // Biology
  { text: 'The blue whale can weigh up to 200,000 kilograms.', source: 'Marine Biology', value: '200,000 kg', context: 'Largest animal ever' },
  { text: 'A human heart beats about 100,000 times per day.', source: 'Human Biology', value: '100,000 beats', context: 'Average daily rate' },
  { text: 'Giant sequoia trees can live over 3,000 years.', source: 'Botany', value: '3,000+ years', context: 'Oldest living organisms' },
  { text: 'Honeybees can fly at speeds of 25 kilometers per hour.', source: 'Entomology', value: '25 km/h', context: 'Flight speed' },
  { text: 'An elephant\'s pregnancy lasts 22 months.', source: 'Zoology', value: '22 months', context: 'Longest gestation period' },
  { text: 'Hummingbirds can flap their wings 80 times per second.', source: 'Ornithology', value: '80 flaps/s', context: 'Wing beat frequency' },

  // Technology & Computing
  { text: 'The first commercial computer (UNIVAC) weighed 13,000 kilograms.', source: 'Computing History', value: '13,000 kg', context: '1951 computer' },
  { text: 'A standard DVD can hold 4.7 gigabytes of data.', source: 'Data Storage', value: '4.7 GB', context: 'Single-layer DVD' },
  { text: 'The first iPhone was released in 2007.', source: 'Technology History', value: '2007', context: 'Revolutionary smartphone' },
  { text: 'The internet uses about 416 terawatts of electricity per year globally.', source: 'Energy Statistics', value: '416 TWh/year', context: 'Global internet consumption' },
  { text: 'A modern processor can have over 50 billion transistors.', source: 'Semiconductor Tech', value: '50B+', context: 'Apple M2 chip' },

  // Human Achievement
  { text: 'The International Space Station orbits at 408 kilometers altitude.', source: 'Space Program Data', value: '408 km', context: 'ISS orbital height' },
  { text: 'The Burj Khalifa in Dubai is 828 meters tall.', source: 'Architecture', value: '828 m', context: 'World\'s tallest building' },
  { text: 'The Channel Tunnel is 50 kilometers long.', source: 'Engineering', value: '50 km', context: 'UK-France undersea tunnel' },
  { text: 'The Great Wall of China is 21,196 kilometers long.', source: 'Historic Architecture', value: '21,196 km', context: 'Including all branches' },
  { text: 'The Large Hadron Collider is 27 kilometers in circumference.', source: 'Particle Physics', value: '27 km', context: 'World\'s largest collider' },
];

// Fetch real data from Open Data APIs
export const fetchRealFacts = async () => {
  const facts = [...STATIC_FACTS]; // Start with static facts for guaranteed variety

  try {
    // Fetch from REST Countries API
    const countriesResponse = await fetch('https://restcountries.com/v3.1/all');
    const countries = await countriesResponse.json();

    // Select 10 diverse countries (by population size)
    const sortedCountries = countries
      .filter(c => c.population && c.capital && c.area)
      .sort((a, b) => b.population - a.population);

    // Get a mix: large, medium, and small countries
    const selectedCountries = [
      ...sortedCountries.slice(0, 3),      // 3 largest
      ...sortedCountries.slice(50, 53),    // 3 medium
      ...sortedCountries.slice(100, 104),  // 4 smaller
    ];

    selectedCountries.forEach(country => {
      // Only add capital facts (more interesting than numbers)
      if (country.capital && country.capital[0]) {
        facts.push({
          text: `The capital of ${country.name.common} is ${country.capital[0]}.`,
          source: 'REST Countries API',
          value: country.capital[0],
          context: `${country.name.common} capital city`
        });
      }
    });
  } catch (error) {
    console.error('Error fetching countries data:', error);
  }

  return facts;
};

// Generate convincingly fake facts with dramatic differences
export const generateFakeFact = (realFact) => {
  let fakeText = realFact.text;
  const strategies = [];

  // Strategy 1: Drastically modify numbers (20%-300% of original - much more obvious)
  const hasNumbers = /(\d[\d,\.]*)/g.test(fakeText);
  if (hasNumbers) {
    strategies.push('number');
  }

  // Strategy 2: Swap capitals with wrong ones
  const capitalSwaps = {
    'Beijing': 'Shanghai', 'Shanghai': 'Beijing',
    'Washington': 'New York', 'New York': 'Washington',
    'Canberra': 'Sydney', 'Sydney': 'Canberra',
    'Brasília': 'Rio de Janeiro', 'Rio de Janeiro': 'São Paulo',
    'Ottawa': 'Toronto', 'Toronto': 'Montreal',
    'Bern': 'Zurich', 'Zurich': 'Geneva',
    'Ankara': 'Istanbul', 'Istanbul': 'Ankara',
    'Pretoria': 'Johannesburg', 'Johannesburg': 'Cape Town'
  };

  Object.keys(capitalSwaps).forEach(capital => {
    if (fakeText.includes(capital)) {
      strategies.push('capital');
    }
  });

  // Strategy 3: Change units or magnitudes
  if (fakeText.includes('kilometers') || fakeText.includes('meters') ||
      fakeText.includes('kilograms') || fakeText.includes('degrees')) {
    strategies.push('unit');
  }

  // Pick a strategy
  const chosenStrategy = strategies.length > 0
    ? strategies[Math.floor(Math.random() * strategies.length)]
    : 'number';

  switch (chosenStrategy) {
    case 'number':
      // Modify numbers DRAMATICALLY (30% to 250% - very noticeable)
      fakeText = fakeText.replace(/(\d[\d,\.]*)/g, (match) => {
        const num = parseFloat(match.replace(/,/g, ''));
        if (!isNaN(num)) {
          let modifier;

          // Use dramatic differences
          if (Math.random() < 0.5) {
            // Make it much smaller (30% to 60%)
            modifier = 0.3 + Math.random() * 0.3;
          } else {
            // Make it much larger (150% to 250%)
            modifier = 1.5 + Math.random();
          }

          const fakeNum = Math.round(num * modifier);

          // Keep the same format
          if (match.includes(',')) {
            return fakeNum.toLocaleString();
          }
          return fakeNum.toString();
        }
        return match;
      });
      break;

    case 'capital':
      // Swap capitals with wrong but plausible cities
      Object.entries(capitalSwaps).forEach(([real, fake]) => {
        if (fakeText.includes(real)) {
          fakeText = fakeText.replace(real, fake);
        }
      });
      break;

    case 'unit':
      // Change units to create absurd values
      if (Math.random() < 0.5) {
        fakeText = fakeText.replace(/kilometers/g, 'meters');
        fakeText = fakeText.replace(/km/g, 'm');
      } else {
        // Or change numbers AND add unit confusion
        fakeText = fakeText.replace(/(\d+[\d,]*)\s*(meters|kilometers|km|m)\b/g, (match, num, unit) => {
          const n = parseInt(num.replace(/,/g, ''));
          const newNum = Math.round(n * (Math.random() < 0.5 ? 0.4 : 1.8));
          return `${newNum.toLocaleString()} ${unit}`;
        });
      }
      break;
  }

  // Fallback: if nothing changed, force a number change
  if (fakeText === realFact.text) {
    fakeText = fakeText.replace(/(\d+)/g, (match) => {
      const num = parseInt(match);
      return Math.round(num * (Math.random() < 0.5 ? 0.4 : 2.0)).toString();
    });
  }

  return {
    text: fakeText,
    isTrue: false,
    source: 'AI Generated (Fake)',
    value: realFact.value,
    context: realFact.context,
    originalFact: realFact.text
  };
};
