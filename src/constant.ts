import Home from 'svelte-material-icons/Home.svelte';
import Category from 'svelte-material-icons/GridLarge.svelte';

export default {
  navBar: [
    {
      id: 'home',
      icon: Home,
      label: 'Home',
      action: '/',
    },
    {
      id: 'categories',
      icon: Category,
      label: 'Categories',
      action: '/categories',
    },
  ],
};
