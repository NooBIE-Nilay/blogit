import routes from "constants/routes";

import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import { Container, PageLoader } from "components/commons";
import Avatar from "components/Posts/Show/Avatar";
import Logger from "js-logger";
import { Edit } from "neetoIcons";
import { Button, Tag, Typography } from "neetoui";
import { either, isEmpty, isNil } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";

const Show = () => {
  const [post, setPost] = useState({});
  const [pageLoading, setPageLoading] = useState(true);

  const { slug } = useParams();

  const history = useHistory();

  const { t } = useTranslation();

  const fetchPostDetails = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setPost(post);
      setPageLoading(false);
    } catch (error) {
      Logger.error(error);
      history.push(routes.root);
    }
  };

  const updatePost = () => {
    history.push(routes.posts.edit.replace(":slug", slug));
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="my-10 flex flex-col">
        <div>
          {either(isEmpty, isNil)(post?.categories) ? (
            <Tag
              className="my-2 capitalize"
              label={t("common.unknown")}
              style="success"
            />
          ) : (
            <div className="flex gap-2">
              {post.categories.map(
                category => (
                  <Tag
                    className="my-2 capitalize"
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
        <div className="mt-2 flex w-full items-start justify-between gap-x-6 md:max-w-6xl">
          <div className="flex flex-col gap-y-2">
            <Typography className="font-semibold" style="h1">
              {post?.title}
            </Typography>
            <div className="flex items-center  gap-3">
              <Avatar name={post.user.name} />
              <div className="">
                <Typography className="text-lg font-bold text-gray-700">
                  {post.user.name}
                </Typography>
                <Typography className="text-sm font-semibold text-gray-500">
                  {new Date(post.created_at).toDateString()}
                </Typography>
              </div>
            </div>
            <pre className="text-wrap">{post?.description}</pre>
          </div>
          <div className="flex items-center justify-end gap-x-3">
            <Button
              icon={() => <Edit />}
              size="small"
              style="secondary"
              tooltipProps={{ content: t("posts.edit") }}
              onClick={updatePost}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Show;
