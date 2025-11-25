import routes from "constants/routes";

import React, { useEffect, useState } from "react";

import categoriesApi from "apis/categories";
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
  loading,
  handleSubmit,
}) => {
  const history = useHistory();
  const [categories, setCategories] = useState([]);

  const { t } = useTranslation();

  const fetchCategories = async () => {
    const {
      data: { categories },
    } = await categoriesApi.fetch();
    setCategories(categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
              initialValues={selectedCategories}
              label={t("common.category")}
              optionRemapping={{ label: "name", value: "id" }}
              options={categories}
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
              loading={loading}
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
