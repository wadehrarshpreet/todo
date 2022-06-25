import categoryData from './categoriesData';
const aDay = 24 * 60 * 60 * 1000;
const categoryIds = categoryData.map(category => category.id);

const tasks = ['Pay rent', 'Meeting with client', 'happy bday', 'Reunion'];

export default [...Array(50)].map((_, i) => ({
  id: 'id-' + i,
  label: tasks[Math.floor(Math.random() * tasks.length)],
  done: Math.random() * 3 < 1,
  category: categoryIds[Math.floor(Math.random() * categoryIds.length)],
  dueDate: new Date(
    new Date().getTime() +
      Math.ceil(Math.random() * 10 * aDay) -
      Math.ceil(Math.random() * 1 * aDay)
  ),
  createdAt: new Date().getTime(),
  delete: 0,
}));
