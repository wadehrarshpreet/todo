<script lang="ts">
  import UserData from 'data/userData';
  import { categories } from 'store/categoriesStore';
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
  <div class="uppercase text-secondary-dark">Today's Tasks</div>
</div>
