const KEY = 'todo_category_data';
const defaultCategories = [
  {
    id: 'personal',
    label: 'Personal',
    color: '#6666ff',
    total: 0,
    completed: 0,
  },
  {
    id: 'business',
    label: 'Business',
    color: '#ff6600',
    total: 0,
    completed: 0,
  },
];

let categoryData = defaultCategories;

let categoryMap: {
  [x: string]: {
    id: string;
    label: string;
    color: string;
    total: number;
    completed: number;
  };
} = categoryData.reduce((acc, value, index) => {
  return {
    ...acc,
    [value.id]: { ...value, order: index, total: 0, completed: 0 },
  };
}, {});

try {
  if (localStorage.getItem('todo_category_data')) {
    categoryMap = JSON.parse(localStorage.getItem('todo_category_data'));
  } else {
    localStorage.setItem(KEY, JSON.stringify(categoryMap));
  }
} catch (e) {
  localStorage.setItem(KEY, JSON.stringify(categoryMap));
}

export function updateCategoryInStorage(data: typeof categoryMap) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export default categoryMap;
