import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const drawerState: Writable<boolean | undefined> = writable(undefined);
