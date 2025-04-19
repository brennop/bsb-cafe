<script>
  /** @type {Cafe} */
  export let cafe;
  import { getContext } from "svelte";

  const map = getContext("map");

  $: setTimeout(() => {
    $map?.flyTo({ center: cafe.position, zoom: 15, speed: 1.0 });
  }, 100);
</script>

<h1 class="text-4xl font-bold p-3 bg-orange-50">
  <a href="/" class="mr-2">☕</a>
  {cafe.name}
</h1>
<section class="max-w-md w-full mx-auto p-3 overflow-y-auto">
  <div class="flex items-center gap-2">
    {#each cafe.tags as tag}
      <span 
        class="text-orange-800 bg-orange-100 px-1 py-0.5 rounded"
        title={tag.name}
      >
        {tag.name}
      </span>
    {/each}
  </div>
  {#if cafe.link}
    <a
      class="inline-block text-orange-800 bg-orange-100 px-1 py-0.5 rounded mt-2"
      href={cafe.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span class="font-bold text-sm">🔗</span>
      {cafe.link}
    </a>
  {/if}
  <p class="text-orange-800 mt-2">📍 {cafe.location}</p>
</section>
