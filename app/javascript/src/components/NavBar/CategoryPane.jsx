import React from "react";

import classNames from "classnames";
import { Close, Plus } from "neetoIcons";
import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const CategoryPane = ({
  categoryPaneRef,
  setIsCategoryPaneOpen,
  isCategoryPaneOpen,
  categories,
  selectedCategoryIds,
  setSelectedCategoryIds,
}) => {
  const { t } = useTranslation();

  const handleCategorySelection = categoryId => {
    setSelectedCategoryIds(selectedCategoryIds =>
      selectedCategoryIds.includes(categoryId)
        ? selectedCategoryIds.filter(id => id !== categoryId)
        : [categoryId, ...selectedCategoryIds]
    );
  };

  if (!isCategoryPaneOpen) return <div />;

  return (
    <div
      className="fixed left-0 h-screen w-72 rounded-r-md border border-gray-800/20 bg-gray-800/20 pt-2 backdrop-blur-sm md:left-20"
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
        </div>
        <Button
          icon={() => <Close />}
          style="text"
          onClick={() => setIsCategoryPaneOpen(false)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {categories?.map(category => {
          const isSelectedCategory = selectedCategoryIds.includes(category.id);

          return (
            <div
              key={category.id}
              className={classNames(
                "relative mx-2  flex items-center justify-center rounded-md  py-2 font-medium ",
                {
                  "bg-gray-500 text-white hover:bg-white hover:text-black":
                    isSelectedCategory,
                  "bg-white  hover:bg-gray-500 hover:text-white":
                    !isSelectedCategory,
                }
              )}
              onClick={() => handleCategorySelection(category.id)}
            >
              {category.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPane;
