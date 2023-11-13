<script lang="ts">
  import type { Cafe } from "./types";

  import Map from "./lib/Map.svelte";
  import Detailed from "./lib/Detailed.svelte";
  import List from "./lib/List.svelte";

  import data from "./assets/data.json";
  import { Router, Route } from "yrv";

  const cafes: Cafe[] = data.map((point) => {
    const [lat, lng] = point.geo.split(",").map((n) => parseFloat(n));
    return { ...point, position: [lng, lat] };
  });

  let map: maplibregl.Map;

  function click(cafe: Cafe) {
    map.flyTo({ center: cafe.position, zoom: 15, speed: 1.0 });
  }
</script>

<main class="text-orange-900 h-screen flex flex-col justify-normal">
  <div class="h-80 w-full top-0 shrink-0">
    <Map points={cafes} bind:map />
  </div>
  <Router>
    <Route exact>
      <h1 class="text-4xl font-bold p-3 bg-orange-50">☕ café em bsb</h1>
      <List {cafes} />
    </Route>
    <Route path="/:slug" let:router>
      <Detailed
        cafe={cafes.find((cafe) => cafe.slug === router.params.slug)}
        {click}
      />
    </Route>
  </Router>
  <footer class="text-center text-xs text-orange-800 p-3">
    feito com <span class="text-red-500">☕</span> por
    <a href="https://brennn.in" target="_blank" rel="noopener noreferrer">
      brennin
    </a>
  </footer>
</main>
