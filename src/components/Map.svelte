<script>
  import { onMount, onDestroy } from 'svelte'
  import { Map } from 'maplibre-gl';
  import axios from 'axios';
  import 'maplibre-gl/dist/maplibre-gl.css';

  let map;
  let container;

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  async function getTotalCitiesCount() {
    const response = await axios.get('http://geodb-free-service.wirefreethought.com/v1/geo/cities?hateoasMode=off')
    
    return response.data.metadata.totalCount - 1
  }

  async function getNewCity(randomCity) {
    const response = await axios.get(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&offset=${randomCity}&hateoasMode=off`)

    return response.data.data[0]
  }

  async function getNewCityData() {
    let totalCitiesCount = await getTotalCitiesCount()
    let randomCity = getRandomInt(totalCitiesCount)

    return await getNewCity(randomCity)
  }

  async function flyToNewCity() {
    let city = await getNewCityData()
    let cityName = city.name;
    let cityLat = city.latitude;
    let cityLong = city.longitude;
    
    map.flyTo({
        center: [
          cityLong,
          cityLat
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
    
    map = new Map({
        container: container,
        style: 'https://api.maptiler.com/maps/streets/style.json?key=hD7P9qjaQIIuR4Ct1buL',
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
