import React, { useEffect, useMemo, useRef, useState } from "react";

import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { Close, Search } from "neetoIcons";
import { Button, Typography, Input } from "neetoui";
import { useTranslation } from "react-i18next";

import AddCategoryModal from "./AddCategoryModal";
import FilteredCategories from "./FilteredCategories";

const CategoryPane = ({ setIsCategoryPaneOpen, isCategoryPaneOpen }) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const categoryPaneRef = useRef();

  const { t } = useTranslation();

  const { data } = useFetchCategories();

  const categories = data?.data.categories;

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        categoryPaneRef.current &&
        !categoryPaneRef.current.contains(event.target) &&
        !isAddCategoryOpen
      ) {
        setIsCategoryPaneOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [categoryPaneRef, isAddCategoryOpen]);

  const filteredCategories = useMemo(() => {
    if (!categories) return [];
    const term = searchTerm.trim().toLowerCase();
    if (!term) return categories;

    return categories.filter(c => c.name?.toLowerCase().includes(term));
  }, [categories, searchTerm]);

  if (!isCategoryPaneOpen) return <div />;

  return (
    <div
      className="fixed left-0 z-0 h-screen w-72 rounded-r-md border border-gray-800/20 bg-gray-800/20 pt-2 backdrop-blur-sm md:left-20"
      ref={categoryPaneRef}
    >
      <div className="flex h-8 w-full items-center justify-between">
        <div className="flex items-center justify-center gap-1">
          <Typography
            className="pl-3 font-semibold uppercase text-gray-600"
            style="h5"
          >
            {t("common.category")}
          </Typography>
          <AddCategoryModal {...{ isAddCategoryOpen, setIsAddCategoryOpen }} />
          <Button
            icon={() => <Search />}
            size="small"
            style="text"
            onClick={() => setShowSearchInput(prevState => !prevState)}
          />
        </div>
        <Button
          icon={() => <Close />}
          style="text"
          onClick={() => setIsCategoryPaneOpen(false)}
        />
      </div>
      <div>
        {showSearchInput && (
          <Input
            className="w-full rounded-md px-2 py-1 text-sm"
            placeholder={t("category.searchPlaceholder")}
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
        )}
        <FilteredCategories {...{ filteredCategories }} />
      </div>
    </div>
  );
};

export default CategoryPane;
