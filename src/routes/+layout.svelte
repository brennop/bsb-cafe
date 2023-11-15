<script>
  import "../app.css";
  import "maplibre-gl/dist/maplibre-gl.css";
  import "@fontsource-variable/nunito";

  import Map from "$lib/Map.svelte";
  import { browser } from "$app/environment";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  /** @type {import('./$types').LayoutData} */
  export let data;

  /** @type {import("maplibre-gl").Map} */
  let map;

  const mapStore = writable(null);

  $: if (map) {
    // @ts-ignore
    mapStore.set(map);
  }

  setContext("cafes", data.cafes);
  setContext("map", mapStore);
</script>

<main
  class="text-orange-900 bg-orange-50 h-screen flex flex-col justify-normal"
>
  <div class="h-80 w-full top-0 shrink-0">
    {#if browser}
      <Map points={data.cafes} bind:map />
    {:else}
      <div class="bg-orange-900 h-full w-full flex justify-center items-center">
        <p class="text-white text-2xl">Carregando...</p>
      </div>
    {/if}
  </div>
  <slot />
  <footer class="text-center text-xs text-orange-800 p-3">
    feito com <span class="text-red-500">☕</span> por
    <a href="https://brennn.in" target="_blank" rel="noopener noreferrer">
      brennin
    </a>
  </footer>
</main>
