<script>
  import { onMount, onDestroy } from 'svelte'
  import { Map } from 'maplibre-gl';
  import axios from 'axios';
  import 'maplibre-gl/dist/maplibre-gl.css';

  let map;
  let container;
  let totalCount;
  let randomCity;
  let newCity;
  let newCityName;
  let newCityLat;
  let newCityLong;

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getNewCity() {
    axios.get('http://geodb-free-service.wirefreethought.com/v1/geo/cities?hateoasMode=off')
      .then(function (response) {
        totalCount = response.data.metadata.totalCount - 1
        randomCity = getRandomInt(totalCount)
        axios.get(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&offset=${randomCity}&hateoasMode=off`)
            .then(function (response_) {
                newCity = response_.data.data[0]
                newCityName = newCity.name
                newCityLat = newCity.latitude
                newCityLong = newCity.longitude;
                console.log(newCityName, newCityLat, newCityLong)

                return (newCityName, newCityLat, newCityLong)
            })
            .catch(function (error_) {
                // handle error
                console.log(error_);
            })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  function flyToNewCity() {
    // Fly to a random location by offsetting the point -74.50, 40
    // by up to 5 degrees.
    newCityName, newCityLat, newCityLong = getNewCity()

    map.flyTo({
        center: [
          newCityLat,
          newCityLong
        ],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });
  }

  onMount(async() => {
    
    map = new Map({
        container: container,
        style: 'https://geoserveis.icgc.cat/contextmaps/icgc_mapa_estandard.json',
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
