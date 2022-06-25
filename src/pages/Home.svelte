<script lang="ts">
  import FloatAdd from 'components/FloatAdd.svelte';
  import TaskList from './TaskList.svelte';
  import UserData from 'data/userData';
  import { categories, tasks } from 'store/appStore';
</script>

<div class="font-bold text-4xl">What's up, {UserData.name.split(' ')[0]}!</div>
<div class="mt-6 text-sm font-bold text-secondary uppercase">Categories</div>
<!-- Slider -->
<div class="overflow-x-auto max-w-full pb-4">
  <div class="flex" style={`width: ${$categories.length * 10}rem;`}>
    {#each $categories as category (category.id)}
      <div class="bg-white shadow-md p-4 flex flex-col rounded-lg mr-4 w-40">
        <div class="text-secondary-dark text-sm">{category.total} tasks</div>
        <div class="text-xl font-bold mb-3">{category.label}</div>
        <div class="relative">
          <div class="w-full h-[2px] bg-secondary" />
          <div
            class="h-[2px] absolute z-10 top-0"
            style={`width: ${(category.completed / category.total) * 100}%; background-color: ${
              category.color
            }`}
          />
          <div
            class="absolute -top-[2px] w-[3px] h-[4px]"
            style={`left: ${(category.completed / category.total) * 100}%; background-color: ${
              category.color
            }`}
          />
        </div>
      </div>
    {/each}
  </div>
</div>
<div class="mt-8">
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div>
      <div class="uppercase text-secondary-dark text-sm font-bold">Today's Tasks</div>
      <TaskList tasks={$tasks.today.tasks} />
      <div class="uppercase text-secondary-dark text-sm font-bold mt-4">Tasks Past Due Date</div>
      <TaskList isPast={true} tasks={$tasks.past.tasks} />
    </div>
    <div>
      {#if $tasks.tomorrow.tasks.length}
        <div class="uppercase text-secondary-dark text-sm font-bold">Tomorrow's Tasks</div>
        <TaskList tasks={$tasks.tomorrow.tasks} />
      {/if}
      {#if $tasks.month.tasks.length}
        <div class="uppercase text-secondary-dark text-sm font-bold mt-4">This Month's Tasks</div>
        <TaskList tasks={$tasks.month.tasks} />
      {:else if $tasks.future.tasks.length}
        <div class="uppercase text-secondary-dark text-sm font-bold mt-4">Future Tasks</div>
        <TaskList tasks={$tasks.future.tasks} />
      {/if}
    </div>
  </div>
</div>

<FloatAdd />
