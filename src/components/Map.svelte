<script>
  import { onMount, onDestroy } from 'svelte'
  import { Map } from 'maplibre-gl';
  import axios from 'axios';
  import 'maplibre-gl/dist/maplibre-gl.css';

  const { env } = _process;
  const maptilerApiKey = env.MAPTILER_KEY;
  const rapidapiApiKey = env.RAPIDAPI_KEY;

  let map;
  let container;
  let cityName = '';   // TODO store

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function wait(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
  }

  async function getTotalCitiesCount() {
    const options = {
      method: 'GET',
      url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
      headers: {
        'X-RapidAPI-Key': rapidapiApiKey,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    };
    const response = await axios.request(options)
    
    return response.data.metadata.totalCount - 1
  }

  async function getNewCity(randomCity) {
    const options = {
      method: 'GET',
      url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?offset=${randomCity}&limit=1`,
      headers: {
        'X-RapidAPI-Key': rapidapiApiKey,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    };
    const response = await axios.request(options)

    return response.data.data[0]
  }

  async function getNewCityData() {
    let totalCitiesCount = await getTotalCitiesCount();
    await wait(1500);   // Wait 1,5 seconds to avoid restrictions by RapidAPI requests
    let randomCity = getRandomInt(totalCitiesCount);

    return await getNewCity(randomCity)
  }

  async function flyToNewCity() {
    let city = await getNewCityData()
    cityName = city.name;   // TODO store
    console.log(cityName);
    let cityLat = city.latitude;
    let cityLong = city.longitude;
    
    fly(cityLat, cityLong)
  }

  function fly(lat, long) {
    map.flyTo({
        center: [
          long,
          lat
        ],
        zoom: 13,
        bearing: 0,
        speed: 2,
        curve: 1,
        easing: function (t) {
          return t;
        },
        essential: true
    });
  }

  onMount(async() => {

    if (!maptilerApiKey || !rapidapiApiKey) {
      throw new Error("You need to configure env keys first!");
    }
    
    map = new Map({
        container: container,
        style: `https://api.maptiler.com/maps/streets/style.json?key=${maptilerApiKey}`,
        zoom: 13,
        maxZoom: 14,
        center: [-105.270546, 40.014984]
    });

    document.getElementById('fly-button').addEventListener('click', function() {
      flyToNewCity()
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
