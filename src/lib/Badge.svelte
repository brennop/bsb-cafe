<script>
  /** @type {string} */
  export let color;

  $: textColor = `text-${color}-800`;
  $: bgColor = `bg-${color}-100`;
</script>

<button class={`px-1 py-0.5 rounded ${textColor} ${bgColor}`} on:click>
  <slot />
</button>
