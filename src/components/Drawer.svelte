<script>
  import { drawerState } from 'store/headerState';
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
  on:click={() => ($drawerState = false)}
>
  <div class="h-[80%] relative top-[10%] px-10 flex flex-col">
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
        src="https://fs-assets-fs.s3-us-west-2.amazonaws.com/res/img/2021/04/bWjMbx6FQXuDmF2PJbEj_dummy.png"
        alt="user"
      />
    </div>
  </div>
</nav>
