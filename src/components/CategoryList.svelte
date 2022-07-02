<script lang="ts">
  import { appData, selectedCategory } from 'store/appStore';
  export let wrap = false;
  export let noSelect = false;

  let categoryKey = Object.keys($appData.categories);
  $: categoryKey = Object.keys($appData.categories);
</script>

<div class="overflow-x-auto max-w-full pb-4">
  <div
    class="flex"
    class:flex-wrap={wrap}
    style={wrap ? '' : `width: ${categoryKey.length * 10}rem;`}
  >
    {#each categoryKey as categoryId (categoryId)}
      {@const category = $appData.categories[categoryId]}
      <div
        class={`bg-white shadow-md p-4 flex flex-col rounded-lg mr-4 w-40 ${
          noSelect ? '' : 'cursor-pointer'
        } mb-3`}
        style={`border: ${$selectedCategory === categoryId ? `1px solid ${category.color}` : ''}`}
        on:click={() => {
          if (noSelect) return;
          if ($selectedCategory === categoryId) {
            $selectedCategory = '';
            return;
          }
          $selectedCategory = categoryId;
        }}
      >
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
