<script lang="ts">
  import Menu from 'svelte-material-icons/Menu.svelte';
  import Search from 'svelte-material-icons/Magnify.svelte';
  import Alert from 'svelte-material-icons/Bell.svelte';
  import { drawerState } from 'store/headerState';
</script>

<header class="relative top-0 left-0 w-full flex justify-between text-secondary text-2xl z-20">
  <div>
    <span
      class="cursor-pointer"
      on:click={e => {
        e.stopPropagation();
        drawerState.update(state => !state);
      }}
    >
      <Menu />
    </span>
  </div>
  <div class="flex">
    <span class="cursor-pointer">
      <Search />
    </span>
    <span class="cursor-pointer ml-3">
      <Alert />
    </span>
  </div>
</header>
