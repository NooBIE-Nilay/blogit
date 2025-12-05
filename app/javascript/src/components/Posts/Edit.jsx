import routes from "constants/routes";

import React, { useState, useEffect } from "react";

import { Container, PageLoader } from "components/commons";
import { useShowPost, useUpdatePost } from "hooks/reactQuery/usePostsApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import Logger from "js-logger";
import { isPresent } from "neetoCist";
import { propOr } from "ramda";
import { useParams, useHistory } from "react-router-dom";
import {
  setToLocalStorage,
  getFromLocalStorage,
  deleteFromLocalStorage,
} from "utils/storage";

import { EDIT_POST_PREVIEW_DATA, FORM_TYPE } from "./constants";
import PostForm from "./Form";
import FormHeader from "./FormHeader";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const history = useHistory();
  const { slug } = useParams();

  const { data, isLoading: isPageLoading } = useShowPost(slug);

  const post = data?.data.post || [];

  const { mutate: updatePost, isLoading } = useUpdatePost();

  const handleUpdate = async () => {
    updatePost(
      {
        slug,
        payload: {
          title,
          description,
          status,
          category_ids: selectedCategories.map(category => category.id),
        },
      },
      {
        onSuccess: () => {
          history.push(routes.dashboard);
          deleteFromLocalStorage(`${EDIT_POST_PREVIEW_DATA}:${slug}`);
        },
        onError: error => {
          Logger.error(error);
        },
      }
    );
  };

  useEffect(() => {
    if (isPageLoading) return;

    if (isPresent(post)) {
      const { title, description, categories, status } = post;
      const previewKey = `${EDIT_POST_PREVIEW_DATA}:${slug}`;
      const savedPreview = getFromLocalStorage(previewKey);

      setTitle(propOr(savedPreview.title, title));
      setDescription(propOr(savedPreview.description, description));
      setSelectedCategories(propOr(savedPreview.categories || categories));
      setStatus(propOr(savedPreview.status || status));
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
        <PostForm
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
