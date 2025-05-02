<script>
  import "../app.css";
  import "maplibre-gl/dist/maplibre-gl.css";
  import "@fontsource-variable/nunito";

  import Map from "$lib/Map.svelte";
  import { browser } from "$app/environment";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { page } from "$app/stores";

  /** @type {import('./$types').LayoutData} */
  export let data;

  /** @type {import("maplibre-gl").Map} */
  let map;

  const mapStore = writable(null);

  $: if (map) {
    // @ts-ignore
    mapStore.set(map);
  }

  // Check if we're on a detail page (/:slug)
  $: isDetailPage = $page.params.slug !== undefined;

  setContext("cafes", data.cafes);
  setContext("metadata", data.metadata);
  setContext("map", mapStore);
</script>

<main class="text-blue-900 bg-blue-50 h-screen flex flex-col justify-normal">
  <div
    class={isDetailPage ? "flex-1 w-full top-0" : "h-80 w-full top-0 shrink-0"}
  >
    {#if browser}
      <Map points={data.cafes} bind:map />
    {:else}
      <div class="bg-blue-900 h-full w-full flex justify-center items-center">
        <p class="text-white text-2xl">Carregando...</p>
      </div>
    {/if}
  </div>
  <slot />
  <footer class="text-center text-xs text-blue-800 p-3 mt-4 flex gap-2 items-center justify-center">
    <div>
      feito com <span class="text-red-500 mx-1">☕</span> por
      <a href="https://brennn.in" target="_blank" rel="noopener noreferrer" class="underline">
        brennin
      </a>
    </div>
    •
    <div>
      <a
        href="https://brennop.notion.site/1e7911566e58802e8cc3d8f554ffb750?pvs=105"
        target="_blank"
        rel="noopener noreferrer"
        class="underline"
      >
        Sugerir um local
      </a>
    </div>
  </footer>
</main>
