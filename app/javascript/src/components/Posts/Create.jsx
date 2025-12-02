import routes from "constants/routes";

import React, { useState } from "react";

import { Container } from "components/commons";
import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";
import { useHistory } from "react-router-dom";

import Form from "./Form";
import FormHeader from "./FormHeader";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("draft");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const history = useHistory();

  const { mutate: createPost, isLoading } = useCreatePost({
    onSuccess: () => {
      history.push(routes.root);
    },
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
      status,
    });
  };

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <FormHeader {...{ status, setStatus, handleSubmit }} />
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

export default Create;
