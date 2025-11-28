import React, { useState } from "react";

import { Container, PageTitle } from "components/commons";
import Form from "components/Posts/Form";
import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";
import { useTranslation } from "react-i18next";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { t } = useTranslation();

  const { mutate: createPost, isLoading } = useCreatePost({
    onError: error => {
      Logger.error(error);
    },
  });

  const handleSubmit = async event => {
    event.preventDefault();
    createPost({
      title,
      description,
      category_ids: selectedCategories.map(category => category.id),
    });
  };

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title={t("posts.new")} />
        <Form
          {...{
            handleSubmit,
            isLoading,
            title,
            setTitle,
            description,
            selectedCategories,
            setSelectedCategories,
            setDescription,
          }}
        />
      </div>
    </Container>
  );
};

export default Create;
