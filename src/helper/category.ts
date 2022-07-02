import { categories } from 'store/appStore';

export function addCategory(categoryData: { id: string; label: string; color: string }) {
  categories.update(categoryMap => {
    return { ...categoryMap, [categoryData.id]: { ...categoryData, total: 0, completed: 0 } };
  });
}
