<script>
  /** @type {Cafe} */
  export let cafe;
</script>

<a class="text-sm text-left" href={`/${cafe.slug}`}>
  <div class="flex items-center">
    <h2 class="text-xl font-bold mr-2">{cafe.name}</h2>
    <div class="flex gap-2">
      {#each cafe.tags as tag}
        <span 
          class="text-blue-800 bg-blue-100 px-1 py-0.5 rounded"
          title={tag.name}
        >
          {tag.icon}
        </span>
      {/each}
    </div>
  </div>
  <p class="text-blue-800">📍 {cafe.location}</p>
</a>
