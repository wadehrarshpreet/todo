import { writable, derived } from 'svelte/store';
import type { Writable, Readable } from 'svelte/store';

/**
 * Router class
 */
class Router {
  history: Writable<Array<{ path: string }>>;
  activePath: Readable<string>;
  window: Window;

  constructor() {
    this.history = writable([]);
    this.activePath = derived(this.history, history => {
      return history?.[0]?.path || '';
    });
    window.addEventListener('popstate', this.pop);
  }

  push = updatePath => {
    window.history.pushState({}, null, ``);
    this.history.update(existing => [{ path: updatePath }, ...existing]);
    return;
  };

  pop = () => {
    this.history.update(existing => {
      const updatedHistory = existing.slice(1);
      return updatedHistory;
    });
    return;
  };

  clear() {
    this.history.set([]);
  }
}

export default new Router();
