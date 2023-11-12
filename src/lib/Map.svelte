<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import maplibregl from "maplibre-gl";
  import * as pmtiles from "pmtiles";
  import layers from "protomaps-themes-base";

  export let points: any[] = [];

  export let map: maplibregl.Map;

  let container: HTMLDivElement;

  onMount(() => {
    const protocol = new pmtiles.Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    map = new maplibregl.Map({
      container: container,
      style: {
        version: 8,
        glyphs:
          "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
        sources: {
          protomaps: {
            type: "vector",
            url: `pmtiles://bsb.pmtiles`,
            attribution:
              '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
          },
        },
        layers: layers("protomaps", "light"),
      },
    });

    map.on("load", () => {
      // @ts-ignore
      const bounds = map.getSource("protomaps")?.bounds;
      map.setMaxBounds(bounds);

      points.forEach((point) => {
        const marker = new maplibregl.Marker({
          draggable: false,
          scale: 0.5,
        })
          .setLngLat(point.position)
          .setPopup(
            new maplibregl.Popup({ offset: 25 }).setHTML(
              `<h3>${point.name}</h3>`
            )
          )
          .addTo(map);
      });
    });
  });

  onDestroy(() => {
    map.remove();
    maplibregl.removeProtocol("pmtiles");
  });
</script>

<div bind:this={container} class="map w-full h-full" />
