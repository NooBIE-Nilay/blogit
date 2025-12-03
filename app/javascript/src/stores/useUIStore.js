import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUIStore = create(
  persist(
    set => ({
      isCategoryPaneOpen: false,

      setIsCategoryPaneOpen: valueOrFn =>
        set(state => {
          const nextValue =
            typeof valueOrFn === "function"
              ? valueOrFn(state.isCategoryPaneOpen)
              : valueOrFn;

          return { isCategoryPaneOpen: nextValue };
        }),
    }),
    { name: "uiStore" }
  )
);

export default useUIStore;
