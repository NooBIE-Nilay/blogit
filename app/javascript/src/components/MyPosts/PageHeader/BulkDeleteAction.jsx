import React, { useState } from "react";

import { Alert, Button } from "@bigbinary/neetoui";
import { useBulkDeletePosts } from "hooks/reactQuery/useMyPostsApi";
import { Trans, useTranslation } from "react-i18next";

const BulkDeleteAction = ({ selectedRowKeys, onActionComplete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { t } = useTranslation();
  const { mutate: bulkDelete, isLoading } = useBulkDeletePosts();

  const handleDeleteConfirm = () => {
    bulkDelete(
      { postIds: selectedRowKeys },
      {
        onSuccess: () => {
          setShowDeleteConfirm(false);
          onActionComplete?.();
        },
      }
    );
  };

  return (
    <>
      <Button
        disabled={isLoading}
        label={t("common.delete")}
        style="danger"
        onClick={() => setShowDeleteConfirm(true)}
      />
      {showDeleteConfirm && (
        <Alert
          isOpen={showDeleteConfirm}
          isSubmitLoading={isLoading}
          submitButtonLabel={t("removeBulkConfirmation.button")}
          title={t("removeBulkConfirmation.title")}
          message={
            <Trans
              i18nKey="removeBulkConfirmation.message"
              values={{
                count: selectedRowKeys.length,
                entity: t("post.plural"),
              }}
            />
          }
          onClose={() => setShowDeleteConfirm(false)}
          onSubmit={handleDeleteConfirm}
        />
      )}
    </>
  );
};
export default BulkDeleteAction;
