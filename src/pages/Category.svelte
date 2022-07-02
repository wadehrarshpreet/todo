<script lang="ts">
  import AddCategory from 'components/AddCategory.svelte';
  import CategoryList from 'components/CategoryList.svelte';
  import FloatIcon from 'components/FloatIcon.svelte';

  let showAddCategoryForm = false;
</script>

<CategoryList wrap noSelect />

{#if showAddCategoryForm}
  <AddCategory onHide={() => (showAddCategoryForm = false)} />
{/if}

<FloatIcon
  type="add"
  on:click={() => {
    showAddCategoryForm = true;
  }}
/>
