import routes from "constants/routes";

import React, { useState, useEffect } from "react";

import { Container, PageLoader, PageTitle } from "components/commons";
import Form from "components/Posts/Form";
import { useShowPost, useUpdatePost } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { history } = useHistory();
  const { slug } = useParams();

  const { t } = useTranslation();

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

  const handleSubmit = async event => {
    event.preventDefault();
    updatePost({
      slug,
      payload: {
        title,
        description,
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
        <PageTitle title={t("posts.edit")} />
        <Form
          {...{
            handleSubmit,
            isLoading,
            title,
            setTitle,
            description,
            setDescription,
            selectedCategories,
            setSelectedCategories,
          }}
          type="update"
        />
      </div>
    </Container>
  );
};

export default Edit;
