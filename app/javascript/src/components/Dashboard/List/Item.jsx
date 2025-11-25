import routes from "constants/routes";

import React, { useState } from "react";

import postsApi from "apis/posts";
import Logger from "js-logger";
import { Alert, Button, Tag, Typography } from "neetoui";
import PropTypes from "prop-types";
import { either, isEmpty, isNil } from "ramda";
import { Trans, useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const Item = ({ post, fetchPosts }) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const { t } = useTranslation();

  const history = useHistory();

  const destroyPost = async slug => {
    try {
      await postsApi.destroy(slug);
      await fetchPosts();
    } catch (error) {
      Logger.error(error);
    }
  };

  const showPost = slug => {
    if (isDeleteAlertOpen) return;
    history.push(routes.posts.show.replace(":slug", slug));
  };

  return (
    <div
      className="w-full  cursor-pointer rounded-md border-b border-gray-200 px-4 py-6 hover:bg-slate-100"
      onClick={() => showPost(post.slug)}
    >
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex-1">
          <div className="text-xl font-semibold text-gray-900">
            {post.title}
          </div>
          {either(isEmpty, isNil)(post.categories) ? (
            <Tag className="my-2 capitalize" label="Unknown" style="success" />
          ) : (
            <div className="flex gap-2">
              {post.categories.map(category => (
                <Tag
                  className="my-2 capitalize"
                  key={category.id}
                  label={category.name}
                  style="success"
                />
              ))}
            </div>
          )}
          <Typography className="ml-1 font-semibold text-gray-600" style="h5">
            {post.user?.name}
          </Typography>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="text-sm text-gray-500">
            {new Date(post.created_at).toDateString()}
          </div>
          <div className="flex items-center gap-3">
            <Button
              label="Delete"
              style="danger"
              onClick={event => {
                event.stopPropagation();
                setIsDeleteAlertOpen(prev => !prev);
              }}
            />
            <Alert
              isOpen={isDeleteAlertOpen}
              submitButtonLabel={t("removeItemConfirmation.button")}
              title={t("removeItemConfirmation.title")}
              message={
                <Trans
                  i18nKey="removeItemConfirmation.message"
                  values={{ itemName: post.title }}
                />
              }
              onClose={event => {
                event?.stopPropagation();
                setIsDeleteAlertOpen(prev => !prev);
              }}
              onSubmit={event => {
                event?.stopPropagation();
                setIsDeleteAlertOpen(prev => !prev);
                destroyPost(post.slug);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  post: PropTypes.object.isRequired,
  fetchPosts: PropTypes.func,
};

export default Item;
