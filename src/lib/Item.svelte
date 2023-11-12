<script lang="ts">
  import type { Cafe } from "../types";
  import { Link } from "yrv";

  export let cafe: Cafe;

  const handle = cafe.instagram
    ?.replace(/https?:\/\/(www\.)?instagram\.com\//, "@")
    .replace(/\//, "");
</script>

<Link class="text-sm text-left" href={`/${cafe.slug}`}>
  <div class="flex items-center">
    <h2 class="text-xl font-bold">{cafe.name}</h2>
    {#each cafe.tags as tag}
      <span class="text-orange-800 bg-orange-100 px-1 py-0.5 rounded ml-2">{tag.name}</span>
    {/each}
  </div>
  <p class="text-orange-800">📍 {cafe.location}</p>
</Link>
