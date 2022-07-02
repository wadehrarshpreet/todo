<script lang="ts">
  import FloatIcon from 'components/FloatIcon.svelte';
  import TaskList from 'components/TaskList.svelte';
  import UserData from 'data/userData';
  import { appData } from 'store/appStore';
  import AddTask from 'components/AddTask.svelte';
  import CategoryList from 'components/CategoryList.svelte';

  let addTaskForm = false;
</script>

<div class="font-bold text-4xl">What's up, {UserData.name.split(' ')[0]}!</div>
<div class="mt-6 text-sm font-bold text-secondary uppercase">Categories</div>
<!-- Slider -->
<CategoryList />
<div class="mt-8">
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div>
      <div class="uppercase text-secondary-dark text-sm font-bold">Today's Tasks</div>
      <TaskList tasks={$appData.today.tasks} />
      <div class="uppercase text-secondary-dark text-sm font-bold mt-4">Tasks Past Due Date</div>
      <TaskList isPast={true} tasks={$appData.past.tasks} />
    </div>
    <div>
      {#if $appData.tomorrow.tasks.length}
        <div class="uppercase text-secondary-dark text-sm font-bold">Tomorrow's Tasks</div>
        <TaskList tasks={$appData.tomorrow.tasks} />
      {/if}
      {#if $appData.month.tasks.length}
        <div class="uppercase text-secondary-dark text-sm font-bold mt-4">This Month's Tasks</div>
        <TaskList tasks={$appData.month.tasks} />
      {:else if $appData.future.tasks.length}
        <div class="uppercase text-secondary-dark text-sm font-bold mt-4">Future Tasks</div>
        <TaskList tasks={$appData.future.tasks} />
      {/if}
    </div>
  </div>
</div>

{#if addTaskForm}
  <AddTask onHide={() => (addTaskForm = false)} />
{/if}

<FloatIcon
  type="add"
  on:click={() => {
    addTaskForm = true;
  }}
/>
