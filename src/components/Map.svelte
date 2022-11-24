<script>
  import { onMount, onDestroy } from 'svelte';
  import { Map } from 'maplibre-gl';
  import axios from 'axios';
  import { citiesTotalCountStore, cityNameStore } from '../stores';
  import {
    wait, getRandomInt, showElement, hideElement,
  } from '../utils';
  import 'maplibre-gl/dist/maplibre-gl.css';

  // eslint-disable-next-line no-undef
  const { env } = _process;
  const maptilerApiKey = env.MAPTILER_KEY;
  const rapidapiApiKey = env.RAPIDAPI_KEY;

  let map;
  let container;
  let citiesTotalCount;
  let searchingAndFlyng = false;

  /**
   * Subscribe the cities count in the cities count store
   */
  function subscribeCitiesTotalCount() {
    citiesTotalCountStore.subscribe((value) => {
      citiesTotalCount = value;
    });
  }

  /**
   * Get the total count of cities in the GeoDBD Cities API,
   * in order to get a random city from it
   */
  async function getCitiesTotalCount() {
    const options = {
      method: 'GET',
      url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
      headers: {
        'X-RapidAPI-Key': rapidapiApiKey,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      },
    };
    const response = await axios.request(options);

    try {
      const totalCount = response.data.metadata.totalCount - 1;
      citiesTotalCountStore.set(totalCount);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Get a new random city from the GeoDB Citis API
   * @param randomCity id number of the new city
   */
  async function getNewCity(randomCity) {
    await wait(1200); // Wait 1,2 seconds to avoid restrictions by RapidAPI requests
    const options = {
      method: 'GET',
      url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?offset=${randomCity}&limit=1`,
      headers: {
        'X-RapidAPI-Key': rapidapiApiKey,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      },
    };
    const response = await axios.request(options);

    try {
      const data = response.data.data[0];
      return data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Get the data from the new random city
   */
  async function getNewCityData() {
    if (!citiesTotalCount) {
      await getCitiesTotalCount();
      subscribeCitiesTotalCount();
    }
    const randomCity = getRandomInt(citiesTotalCount);
    if (!randomCity) {
      console.error('It seems that we can not get a new city...');
      return false;
    }
    const newCityData = await getNewCity(randomCity);
    if (!newCityData) {
      console.error('It seems that we can not get the data from the new city...');
      return false;
    }
    return newCityData;
  }

  /**
   * Fly to the new city
   * @param lat Latitude of the new city
   * @param long Longitude of the new city
   */
  function fly(lat, long) {
    map.flyTo({
      center: [
        long,
        lat,
      ],
      zoom: 13,
      bearing: 0,
      speed: 2,
      curve: 1,
      easing(t) {
        return t;
      },
      essential: true,
    });
  }

  /**
   * Get a new city location from the API and
   * fly there
   */
  async function flyToNewCity() {
    if (searchingAndFlyng) {
      // This variable implies that the user can not
      // make multiple request in a short period of time
      // and before one search and fly has ended,
      // avoiding time limitations by RapidAPI
      return;
    }
    searchingAndFlyng = true;
    // Show loading display
    showElement('loader');
    cityNameStore.set('Looking for a new place...');

    // Get new city data
    const city = await getNewCityData();
    // Check we got the city data. If not, stop
    if (!city) {
      return;
    }
    const cityName = `${city.name}, ${city.country}`;
    const cityLat = city.latitude;
    const cityLong = city.longitude;
    cityNameStore.set(cityName);

    // Hide loading display
    hideElement('loader');

    // Fly to the new location
    fly(cityLat, cityLong);
    searchingAndFlyng = false;
  }

  onMount(async () => {
    if (!maptilerApiKey || !rapidapiApiKey) {
      throw new Error('You need to configure env keys first!');
    }

    map = new Map({
      container,
      style: `https://api.maptiler.com/maps/openstreetmap/style.json?key=${maptilerApiKey}`,
      zoom: 13,
      maxZoom: 14,
      center: [-105.270546, 40.014984],
    });

    document.getElementById('fly-button').addEventListener('click', () => {
      flyToNewCity();
    });
  });

  onDestroy(() => {
    map.remove();
  });
</script>

<div id="map" bind:this={container}></div>
<style>
  #map {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
