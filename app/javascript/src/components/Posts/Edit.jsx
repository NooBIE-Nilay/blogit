import routes from "constants/routes";

import React, { useState, useEffect } from "react";

import { Container, PageLoader } from "components/commons";
import { useShowPost, useUpdatePost } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";
import { useParams, useHistory } from "react-router-dom";

import Form from "./Form";
import FormHeader from "./FormHeader";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const history = useHistory();
  const { slug } = useParams();

  const { data: { data: { post = {} } = {} } = {}, isLoading: isPageLoading } =
    useShowPost(slug);

  const { mutate: updatePost, isLoading } = useUpdatePost({
    onSuccess: () => {
      history.push(routes.dashboard);
    },
    onError: error => {
      Logger.error(error);
    },
  });

  const handleUpdate = async event => {
    event.preventDefault();
    updatePost({
      slug,
      payload: {
        title,
        description,
        status,
        category_ids: selectedCategories.map(category => category.id),
      },
    });
  };

  useEffect(() => {
    if (isPageLoading) return;

    if (post) {
      setTitle(post.title);
      setDescription(post.description);
      setSelectedCategories(post.categories);
      setStatus(post.status);
    }
  }, [post, isPageLoading]);

  if (isPageLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <FormHeader
          handleSubmit={handleUpdate}
          type="update"
          {...{
            status,
            setStatus,
            post,
          }}
        />
        <Form
          {...{
            isLoading,
            title,
            setTitle,
            description,
            setDescription,
            selectedCategories,
            setSelectedCategories,
          }}
        />
      </div>
    </Container>
  );
};

export default Edit;
