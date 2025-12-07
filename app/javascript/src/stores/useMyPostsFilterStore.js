import { findById, removeById } from "@bigbinary/neeto-cist";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { POST_STATUS } from "../constants";

const useMyPostsFilterStore = create(
  persist(
    (set, get) => ({
      title: "",
      selectedCategories: [],
      status: POST_STATUS.DRAFT,

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
    { name: "myPostsFilter" }
  )
);

export default useMyPostsFilterStore;
