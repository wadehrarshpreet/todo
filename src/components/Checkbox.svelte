<script>
  import Check from 'svelte-material-icons/Check.svelte';

  export let checked = false;
  export let className = '';
  export let color = '#0d2360';
  export let disabled = false;
</script>

<label class={className}>
  <input on:click bind:checked type="checkbox" {disabled} class="peer hidden" />
  <div
    class="h-5 w-5 min-w-[20px] border peer-checked:hidden rounded-full"
    style={`border-color:${color}`}
  />
  <div
    class="h-5 w-5 min-w-[20px] border hidden peer-checked:block relative rounded-full opacity-30"
    style={`background-color:${color};`}
  >
    <span
      class="absolute top-0 bottom-0 m-auto left-0 right-0 text-sm flex items-center justify-center"
      style={`color:white;`}
    >
      <Check />
    </span>
  </div>
  <span class="relative ml-4">
    <slot />
  </span>
</label>
