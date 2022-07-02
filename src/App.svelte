<script lang="ts">
  import { drawerState } from 'store/headerState';
  import Header from 'components/Header.svelte';
  import Drawer from 'components/Drawer.svelte';
  import Home from 'pages/Home.svelte';
  import router from 'router';
  import Category from 'pages/Category.svelte';

  const activePath = router.activePath;
</script>

<Drawer />
<main class="bg-navbar min-h-screen z-0 max-w-screen-2xl">
  <div
    class={`bg-background h-screen overflow-x-hidden p-4 fixed top-0 left-0 w-screen transition-[left_0.7s]  z-10 duration-[0.5s] ${
      $drawerState
        ? 'animate-containerPulse rounded-[40px] left-[75%] md:left-[25%] min-h-[90vh] h-[90vh] top-[5%]'
        : $drawerState === false
        ? 'animate-containerPulseIn'
        : ''
    }`}
    on:click={() => {
      if ($drawerState) $drawerState = false;
    }}
  >
    <Header drawerOpen={$drawerState} />
    <div class={`container !max-w-screen-xl m-auto ${$drawerState ? 'mt-4' : 'mt-14'}`}>
      {#if $activePath === '/categories'}
        <Category />
      {:else}
        <Home />
      {/if}
    </div>
  </div>
</main>
