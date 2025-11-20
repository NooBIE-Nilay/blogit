import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import { Container, PageLoader } from "components/commons";
import Logger from "js-logger";
import { useHistory, useParams } from "react-router-dom";

import { Button } from "../commons";

const Show = () => {
  const [post, setPost] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();

  const fetchTaskDetails = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setPost(post);
      setPageLoading(false);
    } catch (error) {
      Logger.error(error);
      history.push("/");
    }
  };

  const updatePost = () => {
    history.push(`/posts/${post.slug}/edit`);
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <div className="mt-8 flex w-full items-start justify-between gap-x-6">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-3xl font-semibold">{post?.title}</h2>
          </div>
          <div className="flex items-center justify-end gap-x-3">
            <Button
              buttonText="Edit"
              icon="edit-line"
              size="small"
              style="secondary"
              onClick={updatePost}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Show;
