import routes from "constants/routes";

import React, { useState } from "react";

import postsApi from "apis/posts";
import { Container, PageTitle } from "components/commons";
import Form from "components/Posts/Form";
import Logger from "js-logger";

const Create = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.create({
        title,
        description,
        category_ids: selectedCategories.map(category => category.id),
      });
      setLoading(false);
      history.push(routes.dashboard);
    } catch (error) {
      Logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="New blog post" />
        <Form
          {...{
            handleSubmit,
            loading,
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
