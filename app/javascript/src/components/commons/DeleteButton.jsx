import routes from "constants/routes";

import React from "react";

import { useDeletePost } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";
import { Alert, Button } from "neetoui";
import PropTypes from "prop-types";
import { Trans, useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const DeleteButton = ({
  post,
  isDeleteAlertOpen,
  setIsDeleteAlertOpen,
  redirectRoute = routes.root,
}) => {
  const history = useHistory();

  const { mutate: deletePost, isLoading } = useDeletePost();

  const handleDelete = () => {
    deletePost(post.slug, {
      onSuccess: () => {
        history.push(redirectRoute);
      },
      onError: error => {
        Logger.error(error);
      },
    });
    setIsDeleteAlertOpen(false);
  };

  const { t } = useTranslation();

  return (
    <>
      <Button
        fullWidth
        label={t("common.delete")}
        loading={isLoading}
        style="danger-text"
        onClick={() => {
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
            values={{ itemName: post.title }}
          />
        }
        onSubmit={handleDelete}
        onClose={() => {
          setIsDeleteAlertOpen(prev => !prev);
        }}
      />
    </>
  );
};

DeleteButton.propTypes = {
  post: PropTypes.object.isRequired,
  isDeleteAlertOpen: PropTypes.bool.isRequired,
  setIsDeleteAlertOpen: PropTypes.func.isRequired,
  redirectRoute: PropTypes.string,
};

export default DeleteButton;
