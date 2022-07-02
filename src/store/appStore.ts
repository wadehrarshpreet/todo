import categoriesData, { updateCategoryInStorage } from 'data/categoriesData';
import taskData, { updateItemInStorage } from 'data/taskData';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import isToday from 'dayjs/plugin/isToday';
import { derived, Writable, writable } from 'svelte/store';

function resetCount(categoryData: typeof categoriesData) {
  return Object.keys(categoryData).reduce((acc, key) => {
    acc[key] = { ...categoryData[key], total: 0, completed: 0 };
    return acc;
  }, {});
}

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekStart: 1,
});
dayjs.extend(isToday);

type taskDataByTime = {
  label: string;
  tasks: Array<{
    id: string;
    label: string;
    done: boolean;
    category: string;
    dueDate: Date;
    createdAt: number;
    delete: number;
  }>;
};

let sorted = false;

type tasksData = {
  past: taskDataByTime;
  today: taskDataByTime;
  tomorrow: taskDataByTime;
  week: taskDataByTime;
  month: taskDataByTime;
  future: taskDataByTime;
  categories: typeof categoriesData;
};

// only for set
export const categories = writable(categoriesData);

export const allTasks: Writable<taskDataByTime['tasks']> = writable(taskData);

export const selectedCategory: Writable<string> = writable('');

export const taskProgress = writable(0);

export const appData = derived([allTasks, categories], ([$allTasks, $categories]) => {
  const categoryDataMap = resetCount($categories);
  let done = 0;
  let total = 0;
  updateItemInStorage($allTasks);
  // process and form Data structure consumable by app
  const finalObj: tasksData = {
    past: {
      label: 'Past Due',
      tasks: [],
    },
    today: {
      label: "Today's Tasks",
      tasks: [],
    },
    tomorrow: {
      label: "Tomorrow's Tasks",
      tasks: [],
    },
    week: {
      label: "This week's Tasks",
      tasks: [],
    },
    month: {
      label: "This month's Tasks",
      tasks: [],
    },
    future: {
      label: "Somewhere in Future's Tasks",
      tasks: [],
    },
    categories: categoryDataMap,
  };

  $allTasks.forEach(task => {
    const dueDate = dayjs(task.dueDate);
    if (task.delete) return;
    total += 1;
    if (task.done) {
      done += 1;
    }
    const isPast = dueDate.isBefore(dayjs());
    if (categoryDataMap[task.category]) {
      finalObj.categories[task.category].total += 1;
      if (task.done) {
        finalObj.categories[task.category].completed += 1;
      }
    }
    if (isPast) {
      finalObj.past.tasks.push(task);
      return;
    }
    if (dueDate.isToday()) {
      finalObj.today.tasks.push(task);
      return;
    }
    if (
      dueDate.isAfter(dayjs().endOf('day')) &&
      dueDate.isBefore(dayjs().add(1, 'day').endOf('day'))
    ) {
      finalObj.tomorrow.tasks.push(task);
    }
    if (dueDate.isBefore(dayjs().endOf('week'))) {
      finalObj.week.tasks.push(task);
    }
    if (dueDate.isBefore(dayjs().endOf('month'))) {
      finalObj.month.tasks.push(task);
    }
    finalObj.future.tasks.push(task);
  });
  if (!sorted) {
    // sort once
    sorted = true;
    Object.keys(finalObj).forEach(key => {
      if (Array.isArray(finalObj[key].label)) {
        (finalObj[key] as taskDataByTime).tasks.sort((a, b) => {
          return a.done ? 1 : b.done ? -1 : 0;
        });
      }
    });
  }
  updateCategoryInStorage(finalObj.categories);

  taskProgress.set((done * 100) / total);
  // sort tasks pending at top
  return finalObj;
});
