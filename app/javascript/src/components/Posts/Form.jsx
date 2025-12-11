import React from "react";

import { PageLoader } from "components/commons";
import {
  useFetchCategories,
  useCreateCategory,
} from "hooks/reactQuery/useCategoriesApi";
import { Input, Textarea, Select } from "neetoui";
import { useTranslation } from "react-i18next";

import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "./constants";

const Form = ({
  title = "",
  setTitle,
  description = "",
  setDescription,
  selectedCategories,
  setSelectedCategories,
  isLoading,
}) => {
  const { t } = useTranslation();

  const {
    data: { data: { categories } = {} } = {},
    isLoading: isCategoriesLoading,
  } = useFetchCategories();

  const { mutate: createCategory } = useCreateCategory();

  const handleCreateCategory = categoryName => {
    createCategory({
      name: categoryName,
    });
  };

  if (isLoading && isCategoriesLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <form className="mb-4 w-full">
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="space-y-4">
          <Input
            required
            label={t("common.title")}
            placeholder={t("common.titlePlaceholder")}
            value={title}
            onChange={e => setTitle(e.target.value.slice(0, MAX_TITLE_LENGTH))}
          />
          <div>
            <Select
              isCreateable
              isMulti
              isDisabled={isCategoriesLoading && isLoading}
              label={t("common.category")}
              optionRemapping={{ label: "name", value: "id" }}
              options={categories}
              placeholder={t("common.categoryPlaceholder")}
              value={selectedCategories}
              onChange={setSelectedCategories}
              onCreateOption={handleCreateCategory}
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-800">
                {t("common.description")}*
              </div>
              <div className="text-xs text-gray-500">
                {description.length}/{MAX_DESCRIPTION_LENGTH}
              </div>
            </div>
            <div className="mt-1">
              <Textarea
                required
                placeholder={t("common.descriptionPlaceholder")}
                rows={8}
                value={description}
                onChange={e =>
                  setDescription(
                    e.target.value.slice(0, MAX_DESCRIPTION_LENGTH)
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
