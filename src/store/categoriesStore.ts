import categoriesData from 'data/categoriesData';
import { writable } from 'svelte/store';

export const categories = writable(categoriesData);
