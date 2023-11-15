<script>
  import { getContext } from "svelte";
  import { page } from "$app/stores";
  import Detailed from "$lib/Detailed.svelte";

  /** @type {Cafe[]} */
  const cafes = getContext("cafes");

  $: cafe = cafes.find((c) => c.slug === $page.params.slug);
</script>

{#if cafe}
  <Detailed {cafe} />
{:else}
  <p>Não encontrado</p>
{/if}
