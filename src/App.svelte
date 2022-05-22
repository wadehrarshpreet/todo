<script lang="ts">
  import { drawerState } from 'store/headerState';
  import Header from 'components/Header.svelte';
  import Drawer from 'components/Drawer.svelte';
  import Home from 'pages/Home.svelte';
  import router from 'router';

  const activePath = router.activePath;
</script>

<Drawer />
<main class="bg-navbar min-h-screen z-0">
  <div
    class={`bg-background min-h-screen overflow-x-hidden p-4 fixed top-0 left-0 w-screen transition-[left_0.7s]  z-10 duration-[0.5s] ${
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
    <Header />
    <div class="container mt-4">
      {#if $activePath === '/'}
        <Home />
      {:else if $activePath === '/categories'}
        <div>categories</div>
      {/if}
    </div>
  </div>
</main>
