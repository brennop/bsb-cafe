<script>
  import Item from "$lib/Item.svelte";
  import { getContext } from "svelte";

  const cafes = getContext("cafes");
</script>

<section
  class="max-w-md w-full mx-auto p-3 flex flex-col gap-4 overflow-y-auto flex-1"
>
  {#each cafes as cafe}
    <Item {cafe} />
  {/each}
</section>
