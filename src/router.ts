import { writable, derived } from 'svelte/store';
import type { Writable, Readable } from 'svelte/store';

/**
 * Minimal Router
 */
class Router {
  history: Writable<Array<{ path: string }>>;
  activePath: Readable<string>;
  window: Window;
  modalCloseCallBack: () => void;

  constructor() {
    const path = window.location.hash.slice(1);
    this.history = writable([{ path: path }]);
    this.activePath = derived(this.history, history => {
      return history?.[0]?.path || '';
    });
    window.addEventListener('popstate', this.pop);
  }

  linkHistoryWithModal = cb => {
    window.history.pushState('modal', '', '');
    this.modalCloseCallBack = cb;
  };

  push = (updatePath: string) => {
    window.history.pushState({}, null, `#${updatePath}`);
    this.history.update(existing => [{ path: updatePath }, ...existing]);
    return;
  };

  pop = () => {
    if (window.history.state === 'modal') {
      if (typeof this.modalCloseCallBack === 'function') {
        this.modalCloseCallBack();
      }
      return;
    }
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
