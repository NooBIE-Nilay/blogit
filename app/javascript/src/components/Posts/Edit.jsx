import routes from "constants/routes";

import React, { useState, useEffect } from "react";

import postsApi from "apis/posts";
import { Container, PageLoader, PageTitle } from "components/commons";
import Form from "components/Posts/Form";
import { useParams } from "react-router-dom";

const Edit = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await postsApi.update({
        slug,
        payload: { title, description, categories: selectedCategories },
      });
      setLoading(false);
      history.push(routes.dashboard);
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const fetchPostDetails = async () => {
    try {
      const {
        data: {
          post: { title, description, categories },
        },
      } = await postsApi.show(slug);
      setTitle(title);
      setDescription(description);
      setSelectedCategories(categories);
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
