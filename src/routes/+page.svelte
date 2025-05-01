<script>
  import Item from "$lib/Item.svelte";
  import Badge from "$lib/Badge.svelte";
  import { getContext } from "svelte";
  import { page } from "$app/stores";

  /** @type {Cafe[]} */
  const cafes = getContext("cafes");

  /** @type {Metadata} */
  const metadata = getContext("metadata");

  // Get region options from metadata
  const regions = metadata.region?.select?.options || [];
  // Get card options from metadata
  const cardsOptions = metadata.cards?.multi_select?.options || [];

  /** @type {Option | undefined} */
  // Determine the selected region filter based on the 'q' search parameter
  $: regionFilter = regions.find((region) => region.name === $page.url.searchParams.get("q"));

  /** @type {Option | undefined} */
  // Determine the selected card filter based on the 'card' search parameter
  $: cardFilter = cardsOptions.find((card) => card.name === $page.url.searchParams.get("card"));


  let searchQuery = "";

  // Filter the cafes based on selected region, card, and search query
  $: filtered = cafes.filter((cafe) => {
    // Check if the cafe matches the selected region filter (if any)
    const regionMatch = regionFilter ? cafe.region.name === regionFilter.name : true;
    // Check if the cafe matches the selected card filter (if any)
    // A cafe matches if its 'cards' array includes the selected card name
    const cardMatch = cardFilter ? cafe.cards.includes(cardFilter.name) : true;
    // Check if the cafe name includes the search query (case-insensitive)
    const searchMatch = cafe.name.toLowerCase().includes(searchQuery.toLowerCase());

    // A cafe is included if it matches all active filters
    return regionMatch && cardMatch && searchMatch;
  });
</script>

<h1 class="text-4xl font-bold p-3 bg-blue-50">🤔 onde comer</h1>

<!-- Region Filters -->
<div class="flex items-center gap-2 p-2 max-w-full overflow-x-auto">
  {#if regionFilter}
    <div class="shrink-0">
      <!-- Link to remove the region filter -->
      <a href={`?q=&card=${$page.url.searchParams.get("card") || ''}`}>
        <Badge color={regionFilter.color}>
          {regionFilter.name} ✕
        </Badge>
      </a>
    </div>
  {:else}
    {#each regions as region}
      <div class="shrink-0">
        <!-- Link to apply a region filter, preserving card filter -->
        <a href={`?q=${region.name}&card=${$page.url.searchParams.get("card") || ''}`}>
          <Badge color={region.color}>
            {region.name}
          </Badge>
        </a>
      </div>
    {/each}
  {/if}
</div>

<!-- Card Filters -->
<div class="flex items-center gap-2 p-2 max-w-full overflow-x-auto">
  {#if cardFilter}
    <div class="shrink-0">
      <!-- Link to remove the card filter -->
      <a href={`?q=${$page.url.searchParams.get("q") || ''}&card=`}>
        <Badge color={cardFilter.color}>
          {cardFilter.name} ✕
        </Badge>
      </a>
    </div>
  {:else}
    {#each cardsOptions as card}
      <div class="shrink-0">
        <!-- Link to apply a card filter, preserving region filter -->
        <a href={`?q=${$page.url.searchParams.get("q") || ''}&card=${card.name}`}>
          <Badge color={card.color}>
            {card.name}
          </Badge>
        </a>
      </div>
    {/each}
  {/if}
</div>


<div class="p-2">
  <input
    type="text"
    placeholder="Buscar por nome..."
    bind:value={searchQuery}
    class="w-full p-2 border border-gray-300 rounded-md"
  />
</div>

<section
  class="max-w-md w-full mx-auto p-3 flex flex-col gap-4 overflow-y-auto flex-1"
>
  {#each filtered as cafe}
    <Item {cafe} />
  {/each}
</section>
