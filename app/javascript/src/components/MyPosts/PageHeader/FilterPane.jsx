import React, { useState } from "react";

import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { Filter } from "neetoIcons";
import { Button, Pane, Typography, Input, Select } from "neetoui";
import { useTranslation } from "react-i18next";

import { getStatusOptions } from "./constants";
import { categoryOptions } from "./utils";

const FilterPane = ({ onApply }) => {
  const [title, setTitle] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  const { t } = useTranslation();
  const { data: categoriesData } = useFetchCategories();
  const categories = categoriesData?.data.categories || [];

  const { Header, Body, Footer } = Pane;

  const clearFilters = () => {
    setTitle("");
    setSelectedCategories([]);
    setSelectedStatus([]);
  };

  const handleClose = () => setIsPaneOpen(false);

  const handleApply = () => {
    onApply?.({
      title,
      selectedCategoryIds: selectedCategories.map(({ value: id }) => id),
      status: selectedStatus.map(({ value }) => value),
    });
    handleClose();
  };

  const handleClear = () => {
    clearFilters();
  };

  return (
    <>
      <Button
        icon={() => <Filter />}
        style="text"
        onClick={() => setIsPaneOpen(true)}
      />
      <Pane isOpen={isPaneOpen} onClose={handleClose}>
        <Header>
          <Typography className="text-3xl font-bold text-slate-700">
            {t("common.filters")}
          </Typography>
        </Header>
        <Body>
          <div className="flex w-full flex-col gap-5">
            <Input
              label={t("common.title")}
              placeholder={t("common.titlePlaceholder")}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <Select
              isMulti
              label={t("common.category")}
              options={categoryOptions(categories)}
              value={selectedCategories}
              onChange={selected => setSelectedCategories(selected)}
            />
            <Select
              isMulti
              label={t("common.status")}
              options={getStatusOptions(t)}
              value={selectedStatus}
              onChange={selected => {
                setSelectedStatus(selected);
              }}
            />
          </div>
        </Body>
        <Footer>
          <div className="flex items-center justify-start gap-2">
            <Button label={t("common.apply")} onClick={handleApply} />
            <Button
              label={t("common.clearFilter")}
              style="secondary"
              onClick={handleClear}
            />
          </div>
        </Footer>
      </Pane>
    </>
  );
};

export default FilterPane;
