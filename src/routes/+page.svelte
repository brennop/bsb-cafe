<script>
  import Item from "$lib/Item.svelte";
  import Badge from "$lib/Badge.svelte";
  import { getContext } from "svelte";
  import { page } from "$app/stores";

  /** @type {Cafe[]} */
  const cafes = getContext("cafes");

  /** @type {Metadata} */
  const metadata = getContext("metadata");

  /** @type {any | null} */
  $: regionFilter = regions.find((region) => region.name === $page.url.searchParams.get("q"));

  $: filtered = cafes.filter((cafe) =>
    regionFilter ? cafe.region.name === regionFilter.name : true
  );

  const regions = metadata.region?.select?.options || [];
</script>

<h1 class="text-4xl font-bold p-3 bg-orange-50">☕ café em bsb</h1>
<div class="flex items-center gap-2 p-2 max-w-full overflow-x-auto">
  {#if regionFilter}
    <div class="shrink-0">
      <a href={`?q=`}>
        <Badge color={regionFilter.color}>
          {regionFilter.name} ✕
        </Badge>
      </a>
    </div>
  {:else}
    {#each regions as region}
      <div class="shrink-0">
        <a href={`?q=${region.name}`}>
          <Badge color={region.color}>
            {region.name}
          </Badge>
        </a>
      </div>
    {/each}
  {/if}
</div>
<section
  class="max-w-md w-full mx-auto p-3 flex flex-col gap-4 overflow-y-auto flex-1"
>
  {#each filtered as cafe}
    <Item {cafe} />
  {/each}
</section>
