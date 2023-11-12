<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import * as pmtiles from 'pmtiles';
  import layers from "protomaps-themes-base";

  let map: maplibregl.Map;

  let container: HTMLDivElement;

  onMount(() => {
    const protocol = new pmtiles.Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
    console.log("mounted");

    map = new maplibregl.Map({
      container: container,
      style: {
        version: 8,
        glyphs: "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
        sources: {
          protomaps: {
            type: "vector",
            url: `pmtiles://${location.protocol}//${location.host}${location.pathname}/bsb.pmtiles`,
            attribution:
          '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
          }
        },
        layers: layers("protomaps", "light"),
      }
    });

    map.on("load", () => {
      // @ts-ignore
      const bounds = map.getSource("protomaps")?.bounds;
      map.setMaxBounds(bounds);
    });
  });

  onDestroy(() => {
    map.remove();
    maplibregl.removeProtocol("pmtiles");
  });
</script>

<div class="relative h-96">
  <div bind:this={container} class="absolute w-full h-full"></div>
</div>
