const KEY = 'todo_item_data';

let defaultItem = [];

try {
  if (localStorage.getItem(KEY)) {
    defaultItem = JSON.parse(localStorage.getItem(KEY));
  } else {
    localStorage.setItem(KEY, JSON.stringify(defaultItem));
  }
} catch (e) {
  localStorage.setItem(KEY, JSON.stringify(defaultItem));
}

export function updateItemInStorage(
  data: {
    id: string;
    label: string;
    done: boolean;
    category: string;
    dueDate: Date;
    createdAt: number;
    delete: number;
  }[]
) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export default defaultItem;
