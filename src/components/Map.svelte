<script>
  import { onMount, onDestroy } from 'svelte';
  import { Map } from 'maplibre-gl';
  import axios from 'axios';
  import { citiesTotalCountStore, cityNameStore } from '../stores';
  import { wait, getRandomInt } from '../utils';
  import 'maplibre-gl/dist/maplibre-gl.css';

  const { env } = _process;
  const maptilerApiKey = env.MAPTILER_KEY;
  const rapidapiApiKey = env.RAPIDAPI_KEY;

  let map;
  let container;
  let citiesTotalCount;

  function subscribeCitiesTotalCount() {
    citiesTotalCountStore.subscribe((value) => {
      citiesTotalCount = value;
    });
  }

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

    citiesTotalCountStore.set(response.data.metadata.totalCount - 1);
  }

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

    return response.data.data[0];
  }

  async function getNewCityData() {
    if (!citiesTotalCount) {
      await getCitiesTotalCount();
      subscribeCitiesTotalCount();
    }
    const randomCity = getRandomInt(citiesTotalCount);

    return await getNewCity(randomCity);
  }

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

  async function flyToNewCity() {
    const city = await getNewCityData();
    const cityName = `${city.name}, ${city.country}`;
    cityNameStore.set(cityName);
    const cityLat = city.latitude;
    const cityLong = city.longitude;

    fly(cityLat, cityLong);
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
