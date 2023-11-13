<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import maplibregl from "maplibre-gl";
  import * as pmtiles from "pmtiles";
  import layers from "protomaps-themes-base";
  import { Link, router } from "yrv";

  export let points: any[] = [];
  let elements: HTMLDivElement[] = [];

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

      points.forEach((point, index) => {
        const element = elements[index];

        const marker = new maplibregl.Marker({
          draggable: false,
          scale: 1.0,
          element,
        })
          .setLngLat(point.position)
          .addTo(map);
      });
    });
  });

  onDestroy(() => {
    map.remove();
    maplibregl.removeProtocol("pmtiles");
  });

  $: slug = $router.params.slug;
</script>

<div bind:this={container} class="map w-full h-full" />

<div>
  {#each points as point, index}
    <div class="z-10" bind:this={elements[index]}>
      <Link href={`/${point.slug}`} class="flex flex-col items-center">
        {#if slug === point.slug}
          <span class="bg-orange-100 px-1 py-0.5 rounded">
            {point.name}
          </span>
        {/if}
        <span class="text-xl"> 📍 </span>
      </Link>
    </div>
  {/each}
</div>
