<script lang="ts">
  import type { Cafe } from "../types";

  export let cafe: Cafe;
  export let click: (cafe: Cafe) => void;

  const handle = cafe.instagram
    ?.replace(/https?:\/\/(www\.)?instagram\.com\//, "@")
    .replace(/\//, "");
</script>

<button class="text-sm text-left" on:click={() => click(cafe)}>
  <h2 class="text-xl font-bold">{cafe.name}</h2>
  {#if handle}
    <a
      class="text-orange-800 p-1"
      href={cafe.instagram}
      target="_blank"
      rel="noopener noreferrer"
    >
      {handle}
    </a>
  {/if}
  <p class="text-orange-800">📍 {cafe.location}</p>
  <p class="text-orange-800 mt-1">
    <span class="font-bold text-xs">WiFi:</span>
    <code class="bg-orange-100 px-1 py-0.5 rounded">{cafe.wifi}</code>
  </p>
</button>
