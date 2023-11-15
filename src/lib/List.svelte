<script lang="ts">
  import Item from "./Item.svelte";
  import Badge from "./Badge.svelte";
  import metadata from "../assets/metadata.json";

  export let cafes: Cafe[] = [];

  let regionFilter: Option | null = null;

  $: filtered = cafes.filter((cafe) =>
    regionFilter ? cafe.region.name === regionFilter.name : true
  );

  const regions = metadata.region.select.options;
</script>

<div class="flex items-center gap-2 p-2 max-w-full overflow-x-auto">
  {#if regionFilter}
    <div class="shrink-0">
      <Badge
        on:click={() => {
          regionFilter = null;
        }}
        color={regionFilter.color}
      >
        {regionFilter.name} ✕
      </Badge>
    </div>
  {:else}
    {#each regions as region}
      <div class="shrink-0">
        <Badge
          on:click={() => {
            regionFilter = region;
          }}
          color={region.color}
        >
          {region.name}
        </Badge>
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
