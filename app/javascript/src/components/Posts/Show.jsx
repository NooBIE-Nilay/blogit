import routes from "constants/routes";

import React from "react";

import { Container, PageLoader } from "components/commons";
import dayjs from "dayjs";
import { useShowPost } from "hooks/reactQuery/usePostsApi";
import { Edit } from "neetoIcons";
import { Avatar, Button, Tag, Typography } from "neetoui";
import { either, isEmpty, isNil } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { getFromLocalStorage } from "utils/storage";

const Show = () => {
  const { slug } = useParams();

  const history = useHistory();

  const { t } = useTranslation();

  const { data, isLoading: isPageLoading } = useShowPost(slug);
  const post = data?.data.post;

  const updatePost = () => {
    history.push(routes.posts.edit.replace(":slug", slug));
  };

  const userId = getFromLocalStorage("authUserId");

  if (isPageLoading) {
    return <PageLoader />;
  }

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
              {post.categories.map(
                category => (
                  <Tag
                    className="mt-2 capitalize"
                    key={category.id}
                    label={category.name}
                    style="success"
                  />
                ),
                []
              )}
            </div>
          )}
        </div>
        <div className="mt-1 flex w-full items-start justify-between gap-x-6 md:max-w-6xl">
          <div className="flex flex-col gap-y-2">
            <div className="mt-6 flex items-center gap-2">
              <Typography className="font-semibold" style="h1">
                {post?.title}
              </Typography>
              {post.status === "draft" && (
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
                  {dayjs(post.last_published_at).isValid() &&
                    dayjs(post.last_published_at).format("DD MMMM YYYY")}
                </Typography>
              </div>
            </div>
            <pre className="text-wrap">{post?.description}</pre>
          </div>
          {userId === post.user.id && (
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
    </Container>
  );
};

export default Show;
