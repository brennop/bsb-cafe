<script lang="ts">
  import type { Cafe } from "../types";

  import { Link } from "yrv";

  export let cafe: Cafe;
  export let click: (cafe: Cafe) => void;

  $: click(cafe);

  $: handle = cafe.instagram
    ?.replace(/https?:\/\/(www\.)?instagram\.com\//, "@")
    .replace(/\//, "");
</script>

<h1 class="text-4xl font-bold p-3 bg-orange-50">
  <Link href="/" class="mr-2">☕</Link>
  {cafe.name}
</h1>
<section class="max-w-md w-full mx-auto p-3 overflow-y-auto flex-1">
  <div class="flex items-center gap-2">
    {#each cafe.tags as tag}
      <span class="text-orange-800 bg-orange-100 px-1 py-0.5 rounded">{tag.name}</span>
    {/each}
  </div>
  {#if handle}
    <a
      class="inline-block text-orange-800 bg-orange-100 px-1 py-0.5 rounded mt-2"
      href={cafe.instagram}
      target="_blank"
      rel="noopener noreferrer"
    >
      {handle}
    </a>
  {/if}
  <p class="text-orange-800 mt-2">📍 {cafe.location}</p>
  <p class="text-orange-800 mt-2">
    <span class="font-bold text-sm">🛜</span>
    <code class="bg-orange-100 px-1 py-0.5 rounded">{cafe.wifi || "?"}</code>
  </p>
</section>
