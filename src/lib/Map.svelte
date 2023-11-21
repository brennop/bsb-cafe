<script>
  import { onMount, onDestroy } from "svelte";
  import maplibregl from "maplibre-gl";
  import * as pmtiles from "pmtiles";
  import layers from "protomaps-themes-base";
  import { page } from "$app/stores";

  /** @type {Array<Cafe>} */
  export let points = [];

  /** @type {HTMLDivElement[]} */
  let elements = [];

  /** @type {boolean} */
  let loaded = false;

  /** @type {import("maplibre-gl").Map} */
  export let map;

  /** @type {HTMLDivElement} */
  let container;

  onMount(() => {
    const protocol = new pmtiles.Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    map = new maplibregl.Map({
      container,
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
      loaded = true;

      // @ts-ignore
      const bounds = map.getSource("protomaps")?.bounds;
      map.setMaxBounds(bounds);

      points.forEach((point, index) => {
        const element = elements[index];

        new maplibregl.Marker({
          draggable: false,
          scale: 1.0,
          element,
        })
          .setLngLat(point.position)
          .addTo(map);

        if (slug === point.slug) {
          map.jumpTo({ center: point.position, zoom: 15 });
        }
      });
    });
  });

  onDestroy(() => {
    map.remove();
    maplibregl.removeProtocol("pmtiles");
  });

  $: slug = $page.params.slug;
</script>

<div bind:this={container} class="map w-full h-full" />

<div class:hidden={!loaded}>
  {#each points as point, index}
    <div class="z-10" bind:this={elements[index]}>
      <a href={`/${point.slug}`} class="flex flex-col items-center relative">
        {#if slug === point.slug}
          <span class="text-xs bg-orange-100 px-1 py-0.5 rounded absolute -top-6 w-max ">
            {point.name}
          </span>
        {/if}
        <span class="text-lg h-8 w-8 rounded-full bg-orange-100 text-white flex items-center justify-center border-orange-800 border-2">
          ☕</span>
      </a>
    </div>
  {/each}
</div>
