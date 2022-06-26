<script lang="ts">
  import FloatIcon from 'components/FloatIcon.svelte';
  import dayjs from 'dayjs';
  import { onMount } from 'svelte';
  import Close from 'svelte-material-icons/Close.svelte';
  import Calendar from 'svelte-material-icons/Calendar.svelte';
  import { fly } from 'svelte/transition';
  import { DateInput } from 'date-picker-svelte';
  import Select from 'svelte-select';
  import { categories } from 'store/appStore';
  import { addTask } from 'helper/tasks';

  export let onHide;

  let myDate = new Date();
  let value = '';
  let items = [];
  let selectedCategory;

  $: items = Object.keys($categories).map(category => {
    if (!selectedCategory) {
      selectedCategory = $categories[category];
    }
    return $categories[category];
  });

  $: console.log(myDate);

  onMount(() => {
    history.pushState('', '', ``);
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
        placeholder="Enter new task"
        type="text"
        bind:value
        class="border-0 outline-none w-full text-xl "
        autofocus
      />
      <div class="mt-4 flex">
        <div class="flex relative">
          <span class="absolute left-2 top-3 z-10"><Calendar size={'1.5rem'} /></span>
          <DateInput format="yyyy-MM-dd" bind:value={myDate} closeOnSelection={true} />
        </div>
        <Select
          --itemIsActiveBG={'#ccc'}
          --height={'48px'}
          optionIdentifier={'id'}
          labelIdentifier="label"
          containerClasses="w-full !rounded-2xl max-w-[150px] md:max-w-[200px]"
          {items}
          value={selectedCategory}
          on:select={event => {
            selectedCategory = event.detail;
          }}
          getOptionLabel={option => {
            return `<span style="color: ${option.color}">${option.label}</span>`;
          }}
        />
      </div>
    </div>
    <FloatIcon
      on:click={() => {
        if (!value) {
          return;
        }
        addTask({
          category: selectedCategory.id,
          id: new Date().getTime() + ` ${selectedCategory.id}`,
          label: value,
          dueDate: dayjs(myDate).endOf('day').toDate(),
        });
        onHide();
      }}
      label="New Task"
      labelClass="pr-2 uppercase"
    />
  </div>
{/key}

<style>
  :global(.date-time-field input) {
    height: 46px;
    border-radius: 1rem;
    padding-left: 2.5rem;
    width: 160px;
  }
</style>
