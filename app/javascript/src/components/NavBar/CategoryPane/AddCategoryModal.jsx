import React, { useState } from "react";

import { useCreateCategory } from "hooks/reactQuery/useCategoriesApi";
import Logger from "js-logger";
import { Plus } from "neetoIcons";
import { Button, Modal, Input, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const AddCategoryModal = ({ isAddCategoryOpen, setIsAddCategoryOpen }) => {
  const [categoryTitle, setCategoryTitle] = useState("");

  const { t } = useTranslation();

  const { mutate: createCategory, isLoading: isAddCategoryLoading } =
    useCreateCategory({
      onSuccess: () => {
        setIsAddCategoryOpen(false);
      },
      onError: error => {
        Logger.error(error);
      },
    });

  const handleSubmit = event => {
    event.preventDefault();
    createCategory({
      name: categoryTitle,
    });
  };

  return (
    <>
      <Button
        icon={() => <Plus />}
        size="small"
        style="text"
        onClick={() => {
          setIsAddCategoryOpen(prevState => !prevState);
        }}
      />
      <Modal
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
      >
        <Modal.Header>
          <Typography className="font-semibold" style="h3">
            {t("category.new.title")}
          </Typography>
        </Modal.Header>
        <Modal.Body>
          <Input
            label={t("category.new.label")}
            placeholder={t("category.new.placeholder")}
            value={categoryTitle}
            onChange={event => setCategoryTitle(event.target.value)}
          />
        </Modal.Body>
        <Modal.Footer className="flex gap-2">
          <Button
            disabled={isAddCategoryLoading}
            label="Add"
            onClick={handleSubmit}
          />
          <Button
            disabled={isAddCategoryLoading}
            label="Cancel"
            style="secondary"
            onClick={() => setIsAddCategoryOpen(false)}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddCategoryModal;
