<script>
  import { onMount, onDestroy } from 'svelte'
  import { Map } from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';

  let map;
  let container;

  onMount(async() => {
    
    map = new Map({
        container: container,
        style: 'https://geoserveis.icgc.cat/contextmaps/icgc_mapa_estandard.json',
        zoom: 13,
        minZoom: 6,
        maxZoom: 14,
        center: [-105.270546, 40.014984]
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
