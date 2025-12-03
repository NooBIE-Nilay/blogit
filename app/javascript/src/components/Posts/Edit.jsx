import routes from "constants/routes";

import React, { useState, useEffect } from "react";

import { Container, PageLoader } from "components/commons";
import { useShowPost, useUpdatePost } from "hooks/reactQuery/usePostsApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import Logger from "js-logger";
import { useParams, useHistory } from "react-router-dom";
import {
  setToLocalStorage,
  getFromLocalStorage,
  deleteFromLocalStorage,
} from "utils/storage";

import { EDIT_POST_PREVIEW_DATA, FORM_TYPE } from "./constants";
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
      deleteFromLocalStorage(`${EDIT_POST_PREVIEW_DATA}:${slug}`);
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
      const previewKey = `${EDIT_POST_PREVIEW_DATA}:${slug}`;
      const savedPreview = getFromLocalStorage(previewKey);

      if (savedPreview && savedPreview.updated_at > post.updated_at) {
        setTitle(savedPreview.title || post.title);
        setDescription(savedPreview.description || post.description);
        setSelectedCategories(savedPreview.categories || post.categories);
        setStatus(savedPreview.status || post.status);
      } else {
        setTitle(post.title);
        setDescription(post.description);
        setSelectedCategories(post.categories);
        setStatus(post.status);
      }
    }
  }, [post, isPageLoading, slug]);

  const savePreview = () => {
    const previewKey = `${EDIT_POST_PREVIEW_DATA}:${slug}`;
    const payload = {
      title,
      description,
      categories: selectedCategories,
      status,
      user: {
        id: getFromLocalStorage("authUserId"),
        name: getFromLocalStorage("authUserName"),
      },
      updated_at: new Date().toISOString(),
    };

    setToLocalStorage({ key: previewKey, value: JSON.stringify(payload) });
  };

  const debouncedSave = useFuncDebounce(savePreview);

  useEffect(() => {
    if (!slug) return;
    debouncedSave();
  }, [title, description, selectedCategories, status, slug]);

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
          type={FORM_TYPE.UPDATE}
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
