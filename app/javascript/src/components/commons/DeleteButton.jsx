import React, { useState } from "react";

import { Alert, Button } from "neetoui";
import { Trans, useTranslation } from "react-i18next";

const DeleteButton = ({ post: { title }, handleDelete, isLoading }) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <>
      <Button
        fullWidth
        label={t("common.delete")}
        style="danger-text"
        onClick={event => {
          event.stopPropagation();
          setIsDeleteAlertOpen(prev => !prev);
        }}
      />
      <Alert
        isOpen={isDeleteAlertOpen}
        isSubmitting={isLoading}
        submitButtonLabel={t("removeItemConfirmation.button")}
        title={t("removeItemConfirmation.title")}
        message={
          <Trans
            i18nKey="removeItemConfirmation.message"
            values={{ itemName: title }}
          />
        }
        onSubmit={handleDelete}
        onClose={event => {
          event.stopPropagation();
          setIsDeleteAlertOpen(prev => !prev);
        }}
      />
    </>
  );
};
export default DeleteButton;
