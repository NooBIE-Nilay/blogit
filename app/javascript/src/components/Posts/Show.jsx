import routes from "constants/routes";

import React from "react";

import { Container, PageLoader } from "components/commons";
import { useShowPost } from "hooks/reactQuery/usePostsApi";
import { isPresent } from "neetoCist";
import { Edit } from "neetoIcons";
import { Avatar, Button, Tag, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { getLastUpdatedDateString } from "utils/date";

import DownloadDocument from "./DownloadDocument";
import { isDraft, isOwner } from "./utils";

const Show = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { data, isLoading: isPageLoading } = useShowPost(slug);
  const history = useHistory();

  const post = data?.data.post || {};

  const updatePost = () => {
    history.push(routes.posts.edit.replace(":slug", slug));
  };

  const lastUpdatedDateString = getLastUpdatedDateString(post);

  const {
    categories,
    title,
    status,
    description,
    user: { name: username, id: userId } = {},
  } = post;

  if (isPageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="my-10 flex flex-col">
        <div>
          {isPresent(categories) ? (
            <div className="flex gap-2">
              {categories.map(category => (
                <Tag
                  className="mt-2 capitalize"
                  key={category.id}
                  label={category.name}
                  style="success"
                />
              ))}
            </div>
          ) : (
            <Tag
              className=" capitalize"
              label={t("common.unknown")}
              style="success"
            />
          )}
        </div>
        <div className="mt-1 flex w-full items-start justify-between gap-x-6 md:max-w-6xl">
          <div className="flex flex-col gap-y-2">
            <div className="mt-6 flex items-center gap-2">
              <Typography className="font-semibold" style="h1">
                {title}
              </Typography>
              {isDraft(status) && (
                <Tag
                  className="border-red-500 bg-white  px-4 text-red-500"
                  label={t("status.draftTitle")}
                />
              )}
            </div>
            <div className="flex  items-center gap-3">
              <Avatar className="-z-10" user={{ username }} />
              <div className="">
                <Typography className="text-lg font-bold text-gray-700">
                  {username}
                </Typography>
                <Typography className="text-sm font-semibold text-gray-500">
                  {lastUpdatedDateString}
                </Typography>
              </div>
            </div>
            <pre className="text-wrap">{description}</pre>
          </div>
          <div className="flex gap-2">
            <DownloadDocument {...{ slug }} />
            {isOwner(userId) && (
              <div className="flex items-center justify-end gap-x-3">
                <Button
                  icon={() => <Edit />}
                  size="small"
                  style="secondary"
                  tooltipProps={{ content: t("posts.edit") }}
                  onClick={updatePost}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Show;
