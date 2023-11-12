<script lang="ts">
  import Map from "./lib/Map.svelte";
  import data from "./assets/data.json";

  type Option = {
    name: string;
    color: string;
  };

  type Point = {
    name: string;
    geo: string;
    position: [string, string];
    instagram?: string | null;
    tags: Option[];
    outlets?: Option;
    wifi?: string;
    location?: string;
  };

  const points: Point[] = data.map((point) => {
    const [lat, lng] = point.geo.split(",");
    return { ...point, position: [lng, lat] };
  });
</script>

<main class="bg-orange-50 text-orange-900">
  <Map {points} />
  <section class="max-w-lg mx-auto p-3">
    <h1 class="text-4xl font-bold">☕ bsb.cafe</h1>
    {#each points as point}
      <div class="my-3">
        <h2 class="text-xl font-bold">{point.name}</h2>
        <p class="text-orange-800">{point.location}</p>
        <p class="text-orange-800">
          <span class="font-bold text-xs">WiFi:</span>
          <code class="bg-orange-100 px-1 py-0.5 rounded">{point.wifi}</code>
        </p>
      </div>
    {/each}
  </section>
</main>
