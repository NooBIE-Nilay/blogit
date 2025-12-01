import React from "react";

import classNames from "classnames";
import { PageLoader } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { Close, Plus } from "neetoIcons";
import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useCategoryStore from "stores/useCategoryStore";

const CategoryPane = ({
  categoryPaneRef,
  setIsCategoryPaneOpen,
  isCategoryPaneOpen,
}) => {
  const { t } = useTranslation();

  const { data, isLoading } = useFetchCategories();

  const { toggleCategory, isSelected } = useCategoryStore();

  const categories = data?.data.categories;

  if (!isCategoryPaneOpen) return <div />;

  if (isLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

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
        </div>
        <Button
          icon={() => <Close />}
          style="text"
          onClick={() => setIsCategoryPaneOpen(false)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {categories?.map(category => (
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
  );
};

export default CategoryPane;
