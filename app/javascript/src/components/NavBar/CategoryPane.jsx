import React, { useMemo, useState } from "react";

import classNames from "classnames";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { Close, Plus, Search } from "neetoIcons";
import { Button, Typography, Input } from "neetoui";
import { useTranslation } from "react-i18next";
import useCategoryStore from "stores/useCategoryStore";

const CategoryPane = ({
  categoryPaneRef,
  setIsCategoryPaneOpen,
  isCategoryPaneOpen,
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { t } = useTranslation();

  const { data } = useFetchCategories();

  const { toggleCategory, isSelected } = useCategoryStore();

  const categories = data?.data.categories;

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
          <Button icon={() => <Plus />} size="small" style="text" />
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
        <div className="mt-4 flex flex-col gap-2">
          {filteredCategories?.map(category => (
            <div
              key={category.id}
              className={classNames(
                "relative mx-2  flex items-center justify-center rounded-md  py-2 font-medium ",
                {
                  "bg-gray-500 text-white hover:bg-white hover:text-black":
                    isSelected(category),
                  "bg-white  hover:bg-gray-500 hover:text-white":
                    !isSelected(category),
                }
              )}
              onClick={() => toggleCategory(category)}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPane;
