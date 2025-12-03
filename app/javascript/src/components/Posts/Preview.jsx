import routes from "constants/routes";

import React from "react";

import { Container } from "components/commons";
import useQueryParams from "hooks/useQueryParams";
import { Avatar, Tag, Typography, NoData } from "neetoui";
import { either, isEmpty, isNil } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { getLastUpdatedDate } from "utils/date";
import { getFromLocalStorage } from "utils/storage";

import {
  CREATE_POST_PREVIEW_DATA,
  EDIT_POST_PREVIEW_DATA,
  POST_STATUS,
} from "./constants";

const Preview = () => {
  const { slug, source } = useQueryParams();

  const history = useHistory();

  const { t } = useTranslation();

  const previewKey =
    source === "edit" && slug
      ? `${EDIT_POST_PREVIEW_DATA}:${slug}`
      : CREATE_POST_PREVIEW_DATA;

  const post = getFromLocalStorage(previewKey);
  const isPostInvalid = isNil(post) || isEmpty(post);

  if (isPostInvalid) {
    return (
      <div className="flex h-screen items-center justify-center">
        <NoData
          title={t("posts.preview.empty")}
          primaryButtonProps={{
            label: t("common.home"),
            onClick: () => history.push(routes.root),
          }}
        />
      </div>
    );
  }

  const lastUpdatedDate = getLastUpdatedDate(post);

  const isDraft = post.status === POST_STATUS.DRAFT;

  return (
    <Container>
      <div className="my-10 flex flex-col">
        <div>
          {either(isEmpty, isNil)(post?.categories) ? (
            <Tag
              className=" capitalize"
              label={t("common.unknown")}
              style="success"
            />
          ) : (
            <div className="flex gap-2">
              {post.categories.map(category => (
                <Tag
                  className="mt-2 capitalize"
                  key={category.id}
                  label={category.name}
                  style="success"
                />
              ))}
            </div>
          )}
        </div>
        <div className="mt-1 flex w-full items-start justify-between gap-x-6 md:max-w-6xl">
          <div className="flex flex-col gap-y-2">
            <div className="mt-6 flex items-center gap-2">
              <Typography className="font-semibold" style="h1">
                {post.title}
              </Typography>
              {isDraft && (
                <Tag
                  className="border-red-500 px-4  text-red-500"
                  label={t("status.draftTitle")}
                  style=""
                />
              )}
            </div>
            <div className="flex  items-center gap-3">
              <Avatar className="-z-10" user={post.user} />
              <div className="">
                <Typography className="text-lg font-bold text-gray-700">
                  {post.user.name}
                </Typography>
                <Typography className="text-sm font-semibold text-gray-500">
                  {lastUpdatedDate}
                </Typography>
              </div>
            </div>
            <pre className="text-wrap">{post?.description}</pre>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Preview;
