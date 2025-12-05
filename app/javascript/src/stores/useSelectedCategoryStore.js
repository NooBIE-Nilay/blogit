import { findById, removeById } from "@bigbinary/neeto-cist";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSelectedCategoryStore = create(
  persist(
    (set, get) => ({
      selectedCategories: [],

      toggleCategory: category => {
        const { selectedCategories } = get();

        const updated = findById(category.id, selectedCategories)
          ? removeById(category.id, selectedCategories)
          : [...selectedCategories, category];

        set({ selectedCategories: updated });
      },

      clear: () => set({ selectedCategories: [] }),

      isSelected: categoryId =>
        !!findById(categoryId, get().selectedCategories),
    }),
    { name: "categoryStore" }
  )
);

export default useSelectedCategoryStore;
