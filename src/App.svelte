<script lang="ts">
  import { drawerState } from 'store/headerState';
  import Header from 'components/Header.svelte';
  import Drawer from 'components/Drawer.svelte';
</script>

<Drawer />
<main class="bg-navbar min-h-screen z-0">
  <div
    class={`bg-background min-h-screen overflow-x-hidden p-4 fixed top-0 left-0 w-screen transition-[left_0.7s]  z-10 duration-[0.5s] ${
      $drawerState ? 'rounded-[40px] left-[75%] md:left-[25%] min-h-[90vh] h-[90vh] top-[5%]' : ''
    }`}
    on:click={() => {
      if($drawerState) $drawerState = false;
    }}
  >
    <Header />
    <div class="container mt-4">
      <div class="font-bold text-4xl">What's up, Arsh!</div>
      <div class="mt-6 text-sm font-bold text-secondary uppercase">Categories</div>
    </div>
  </div>
</main>
