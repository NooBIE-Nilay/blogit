import React, { useState, useEffect } from "react";

import postsApi from "apis/posts";
import { Container, PageLoader, PageTitle } from "components/commons";
import { useParams } from "react-router-dom";

import Form from "./Form";

const Edit = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await postsApi.update({
        slug,
        payload: { title, description },
      });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const fetchPostDetails = async () => {
    try {
      const {
        data: {
          post: { title, description },
        },
      } = await postsApi.show(slug);
      setTitle(title);
      setDescription(description);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="Edit post" />
        <Form
          {...{
            handleSubmit,
            loading,
            title,
            setTitle,
            description,
            setDescription,
          }}
          type="update"
        />
      </div>
    </Container>
  );
};

export default Edit;
