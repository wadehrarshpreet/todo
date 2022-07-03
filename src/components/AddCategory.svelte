<script lang="ts">
  import { ColorPicker, Color } from 'svelte-colorpick';
  import FloatIcon from 'components/FloatIcon.svelte';
  import { onMount } from 'svelte';
  import Close from 'svelte-material-icons/Close.svelte';
  import { fly } from 'svelte/transition';
  import router from 'router';
  import { addCategory } from 'helper/category';

  export let onHide;

  let value = '';
  let color = Color.hex('#ccff00');

  function trySubmit() {
    if (!value) {
      return;
    }
    addCategory({
      color: color.toHex(),
      label: value,
      id: value.replace('/s/gi', '-'),
    });
    onHide();
  }

  onMount(() => {
    router.linkHistoryWithModal(onHide);
  });
</script>

<svelte:window
  on:keydown={event => {
    if (event.keyCode == 27) {
      onHide();
    }
  }}
  on:popstate={() => {
    onHide();
  }}
/>
{#key 'addTask'}
  <div
    transition:fly={{ y: 200, duration: 600 }}
    class="h-screen w-screen fixed top-0 left-0 bg-white z-30 p-10"
  >
    <span
      on:click={() => onHide()}
      class="border absolute top-6 right-4 rounded-full p-1 cursor-pointer"
    >
      <Close size={'1.5rem'} />
    </span>
    <div class="relative top-[30%]">
      <input
        placeholder="Enter category"
        type="text"
        bind:value
        on:keydown={event => {
          if (event.keyCode === 13) {
            trySubmit();
          }
        }}
        class="border-0 outline-none w-full text-xl "
        autofocus
      />
      <div class="mt-4 flex">
        <div class="flex relative">
          <ColorPicker
            collapse
            showSliders={{
              'hsl.h': true,
            }}
            matrixWidth={200}
            matrixHeight={150}
            showLabels={false}
            showHex={false}
            selectDimensions={false}
            showNumeric={false}
            bind:color
          />
        </div>
      </div>
    </div>
    <FloatIcon
      on:click={() => {
        trySubmit();
      }}
      label="New Task"
      labelClass="pr-2 uppercase"
    />
  </div>
{/key}

<style>
  :global(.date-time-field input) {
    height: 46px;
    border-radius: 1rem !important;
    padding-left: 2.5rem !important;
    width: 160px !important;
  }
</style>
