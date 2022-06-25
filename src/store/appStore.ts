import categoriesData from 'data/categoriesData';
import taskData from 'data/taskData';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import isToday from 'dayjs/plugin/isToday';
import { derived, get, writable } from 'svelte/store';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekStart: 1,
});
dayjs.extend(isToday);

type taskDataByTime = {
  label: string;
  tasks: Array<typeof taskData[0]>;
};

type tasksData = {
  past: taskDataByTime;
  today: taskDataByTime;
  tomorrow: taskDataByTime;
  week: taskDataByTime;
  month: taskDataByTime;
  future: taskDataByTime;
};

export const categories = writable(categoriesData);

export const allTasks = writable(taskData);

export const tasks = derived([allTasks], ([$allTasks]) => {
  const categoryData = get(categories);
  const categoryDataMap = categoryData.reduce((acc, value, index) => {
    return {
      ...acc,
      [value.id]: { ...value, order: index, total: 0, completed: 0 },
    };
  }, {});
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
  };

  $allTasks.forEach(task => {
    const dueDate = dayjs(task.dueDate);
    if (task.delete) return;
    const isPast = dueDate.isBefore(dayjs());
    if (categoryDataMap[task.category]) {
      categoryDataMap[task.category].total += 1;
      if (task.done) {
        categoryDataMap[task.category].completed += 1;
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
  categories.set(
    Object.keys(categoryDataMap).reduce((acc, key) => {
      acc[categoryDataMap[key].order] = categoryDataMap[key];
      return acc;
    }, [])
  );
  // sort tasks pending at top
  return finalObj;
});
