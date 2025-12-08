export const categoryOptions = categories =>
  categories.map(category => ({
    label: category.name,
    value: category.id,
  }));
