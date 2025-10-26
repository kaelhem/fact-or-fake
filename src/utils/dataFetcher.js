// Fetch real data from various Open Data APIs

export const fetchRealFacts = async () => {
  const facts = [];

  try {
    // 1. Fetch from REST Countries API
    const countriesResponse = await fetch('https://restcountries.com/v3.1/all');
    const countries = await countriesResponse.json();

    // Sample 5 random countries
    const sampledCountries = countries.sort(() => 0.5 - Math.random()).slice(0, 5);

    sampledCountries.forEach(country => {
      if (country.population) {
        facts.push({
          text: `${country.name.common} has a population of ${country.population.toLocaleString()} inhabitants.`,
          isTrue: true,
          source: 'REST Countries API',
          realValue: country.population.toLocaleString(),
          context: `Country: ${country.name.common}`
        });
      }

      if (country.capital && country.capital[0]) {
        facts.push({
          text: `The capital of ${country.name.common} is ${country.capital[0]}.`,
          isTrue: true,
          source: 'REST Countries API',
          realValue: country.capital[0],
          context: `Country: ${country.name.common}`
        });
      }

      if (country.area) {
        facts.push({
          text: `${country.name.common} has an area of ${Math.round(country.area).toLocaleString()} km².`,
          isTrue: true,
          source: 'REST Countries API',
          realValue: `${Math.round(country.area).toLocaleString()} km²`,
          context: `Country: ${country.name.common}`
        });
      }
    });
  } catch (error) {
    console.error('Error fetching countries data:', error);
  }

  try {
    // 2. Fetch from Public APIs (meta information)
    const apisResponse = await fetch('https://api.publicapis.org/entries');
    const apisData = await apisResponse.json();

    if (apisData.entries) {
      const sampledApis = apisData.entries
        .filter(api => api.Category && api.Description)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      sampledApis.forEach(api => {
        facts.push({
          text: `There is an open API in the "${api.Category}" category that provides: ${api.Description}`,
          isTrue: true,
          source: 'Public APIs Directory',
          realValue: api.API,
          context: `Category: ${api.Category}`
        });
      });
    }
  } catch (error) {
    console.error('Error fetching APIs data:', error);
  }

  // Fallback facts if APIs fail
  if (facts.length < 5) {
    facts.push(
      {
        text: 'Mount Everest is approximately 8,849 meters above sea level.',
        isTrue: true,
        source: 'Geographic Data',
        realValue: '8,849 meters',
        context: 'Highest mountain on Earth'
      },
      {
        text: 'The Pacific Ocean covers approximately 165 million km².',
        isTrue: true,
        source: 'Geographic Data',
        realValue: '165 million km²',
        context: 'Largest ocean on Earth'
      },
      {
        text: 'Light travels at approximately 299,792 kilometers per second.',
        isTrue: true,
        source: 'Physics Constants',
        realValue: '299,792 km/s',
        context: 'Speed of light in vacuum'
      },
      {
        text: 'The Earth has a circumference of approximately 40,075 kilometers at the equator.',
        isTrue: true,
        source: 'Geographic Data',
        realValue: '40,075 km',
        context: 'Equatorial circumference'
      },
      {
        text: 'The Moon is approximately 384,400 kilometers away from Earth.',
        isTrue: true,
        source: 'Astronomical Data',
        realValue: '384,400 km',
        context: 'Average distance'
      }
    );
  }

  return facts;
};

export const generateFakeFact = (realFact) => {
  let fakeText = realFact.text;

  // Strategy 1: Modify numbers (80% - 120% of original)
  fakeText = fakeText.replace(/(\d[\d,\.]*)/g, (match) => {
    const num = parseFloat(match.replace(/,/g, ''));
    if (!isNaN(num)) {
      const modifier = 0.7 + Math.random() * 0.6; // 0.7 to 1.3
      const fakeNum = Math.round(num * modifier);

      // Keep the same format (with commas if original had them)
      if (match.includes(',')) {
        return fakeNum.toLocaleString();
      }
      return fakeNum.toString();
    }
    return match;
  });

  // Strategy 2: Sometimes swap key words
  if (Math.random() > 0.7) {
    const countries = ['France', 'Germany', 'Italy', 'Spain', 'Japan', 'Brazil', 'Canada', 'Australia'];
    const cities = ['Paris', 'London', 'Tokyo', 'Berlin', 'Rome', 'Madrid', 'Sydney', 'Toronto'];

    countries.forEach((country, idx) => {
      if (fakeText.includes(country) && Math.random() > 0.5) {
        const newCountry = countries[(idx + 1 + Math.floor(Math.random() * 3)) % countries.length];
        fakeText = fakeText.replace(country, newCountry);
      }
    });

    cities.forEach((city, idx) => {
      if (fakeText.includes(city) && Math.random() > 0.5) {
        const newCity = cities[(idx + 1 + Math.floor(Math.random() * 3)) % cities.length];
        fakeText = fakeText.replace(city, newCity);
      }
    });
  }

  return {
    text: fakeText,
    isTrue: false,
    source: 'Generated (Fake)',
    realValue: realFact.realValue,
    context: realFact.context,
    originalFact: realFact.text
  };
};
