<script lang="ts">
  import Map from "./lib/Map.svelte";
  import Item from "./lib/Item.svelte";
  import data from "./assets/data.json";
  import type { Cafe } from "./types";

  const cafes: Cafe[] = data.map((point) => {
    const [lat, lng] = point.geo.split(",").map((n) => parseFloat(n));
    return { ...point, position: [lng, lat] };
  });

  let map: maplibregl.Map;

  function click(cafe: Cafe) {
    map.flyTo({ center: cafe.position, zoom: 16, speed: 1.0 });
  }
</script>

<main class="text-orange-900">
  <div class="h-80 w-full fixed top-0">
    <Map points={cafes} bind:map={map} />
    <h1 class="text-4xl font-bold p-3 bg-orange-50">☕ café em bsb</h1>
  </div>
  <section class="max-w-lg mx-auto p-3 mt-96 flex flex-col gap-4">
    {#each cafes as cafe}
      <Item {cafe} click={click} />
    {/each}
  </section>
</main>
