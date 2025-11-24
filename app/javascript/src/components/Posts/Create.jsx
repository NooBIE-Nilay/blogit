import React, { useState } from "react";

import { Container, PageTitle } from "components/commons";
import Logger from "js-logger";

import Form from "./Form";

import postsApi from "../../apis/posts";

const Create = ({ history }) => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.create({ title, description });
      setLoading(false);
      history.push("/dashboard");
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
            setDescription,
          }}
        />
      </div>
    </Container>
  );
};

export default Create;
