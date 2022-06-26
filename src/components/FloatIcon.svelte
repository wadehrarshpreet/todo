<script>
  import Plus from 'svelte-material-icons/Plus.svelte';

  export let type = 'add';
  export let label = '';
  export let labelClass = '';
</script>

<div on:click class="fixed items-center bottom-7 right-4 bg-cta rounded-full text-white p-2 cursor-pointer flex">
  <span class="text-3xl">
    {#if type === 'add'}
      <Plus />
    {/if}
  </span>
  <span class={labelClass || ''}>
    {label}
  </span>
</div>
