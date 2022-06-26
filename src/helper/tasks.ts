import { allTasks } from 'store/appStore';

export function invertTaskDoneStatus(taskId: string) {
  allTasks.update(existing => {
    return existing.map(taskData => {
      if (taskData.id === taskId) {
        return { ...taskData, done: !taskData.done };
      }
      return taskData;
    });
  });
}

export function deleteTask(taskId: string, deletion = true) {
  allTasks.update(existing => {
    return existing.map(taskData => {
      if (taskData.id === taskId) {
        return { ...taskData, delete: deletion ? 1 : 0 };
      }
      return taskData;
    });
  });
}

export function addTask(taskData: {
  id: string;
  label: string;
  done?: boolean;
  category: string;
  dueDate: Date;
  createdAt?: number;
  delete?: number;
}) {
  allTasks.update(existing => {
    return [{ ...taskData, done: false, delete: 0, createdAt: new Date().getTime() }, ...existing];
  });
}
