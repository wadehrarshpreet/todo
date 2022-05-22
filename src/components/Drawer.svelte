<script>
  import ChevronLeft from 'svelte-material-icons/ChevronLeft.svelte';
  import UserData from 'data/userData';
  import Constant from 'constant';
  import { drawerState } from 'store/headerState';
  import router from 'router';
  let progress = 20;

  function animateProgress(node, { progress }) {
    return {
      duration: 2000,
      css: t => {
        return `
            --nav-progress: ${progress * (t === 0 ? 1 : t)}
        `;
      },
    };
  }
</script>

<nav
  class={`bg-navbar fixed top-0 h-screen w-[75%] md:w-[25%] z-10 transition-[left] duration-[0.5s] rounded-tr-[40px] rounded-br-[40px] text-white ${
    $drawerState ? 'left-0' : '-left-full'
  }`}
>
  <div class="h-[80%] relative top-[10%] px-10 flex flex-col">
    <div
      on:click={() => ($drawerState = false)}
      class="absolute right-4 top-0 text-3xl rounded-full border border-secondary-dark p-2 cursor-pointer"
    >
      <ChevronLeft />
    </div>
    <!-- Image container -->
    <div class="relative h-[121px] w-[121px]">
      {#key $drawerState}
        <!-- To animate properly everytime nav open -->
        <div
          class={`rounded-full h-full w-full bg-navbarImage`}
          in:animateProgress={{ progress, visibleState: $drawerState }}
          style={`--nav-progress: ${progress}`}
        >
          <div
            class="p-2 relative top-[2px] left-[2px] h-[calc(100%_-_4px)] w-[calc(100%_-_4px)] rounded-full bg-navbar "
          />
        </div>
      {/key}
      <img
        class="absolute top-0 bottom-0 m-auto left-0 right-0 rounded-full bg-blue-500 h-[100px] w-[100px]"
        src={UserData.img}
        alt="user"
      />
    </div>
    <!-- name -->
    <div class="mt-8 text-4xl font-bold leading-snug">
      {UserData.name}
    </div>
    <div class="mt-4 text-secondary">
      {#each Constant.navBar as navItem (navItem.id)}
        <div
          on:click={() => {
            router.push(navItem.action);
            $drawerState = false;
          }}
          class="mb-3 flex text-xl items-center"
        >
          <span class="text-secondary-dark">
            <svelte:component this={navItem.icon} />
          </span>
          <span class="ml-4">{navItem.label}</span>
        </div>
      {/each}
    </div>
  </div>
</nav>
