import routes from "constants/routes";

import React from "react";

import { PageLoader } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { Input, Textarea, Button, Select } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const Form = ({
  type = "create",
  title = "",
  setTitle,
  description = "",
  setDescription,
  selectedCategories,
  setSelectedCategories,
  isLoading,
  handleSubmit,
}) => {
  const history = useHistory();
  const { t } = useTranslation();

  const {
    data: { data: { categories } = {} } = {},
    isLoading: isCategoriesLoading,
  } = useFetchCategories();

  if (isLoading && isCategoriesLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <form className="mb-4 w-full" onSubmit={handleSubmit}>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="space-y-4">
          <Input
            required
            label={t("common.title")}
            placeholder={t("common.titlePlaceholder")}
            value={title}
            onChange={e => setTitle(e.target.value.slice(0, 50))}
          />
          <div>
            <Select
              isMulti
              required
              disabled={isCategoriesLoading && isLoading}
              label={t("common.category")}
              optionRemapping={{ label: "name", value: "id" }}
              options={categories}
              value={selectedCategories}
              onChange={value => setSelectedCategories(value)}
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-800">
                {t("common.description")}*
              </div>
              <div className="text-xs text-gray-500">
                {description.length}/10000
              </div>
            </div>
            <div className="mt-1">
              <Textarea
                required
                placeholder={t("common.descriptionPlaceholder")}
                rows={8}
                value={description}
                onChange={e => setDescription(e.target.value.slice(0, 10000))}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-x-3 gap-y-2 sm:flex-row sm:justify-end">
          <div className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto"
              label={t("common.cancel")}
              style="secondary"
              type="button"
              onClick={() => history.push(routes.dashboard)}
            />
          </div>
          <div className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto"
              loading={isLoading}
              style="primary"
              type="submit"
              label={
                type === "create" ? t("common.submit") : t("common.update")
              }
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
