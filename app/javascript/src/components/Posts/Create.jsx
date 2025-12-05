import routes from "constants/routes";

import React, { useState, useEffect } from "react";

import { Container } from "components/commons";
import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import Logger from "js-logger";
import { isPresent } from "neetoCist";
import { useHistory } from "react-router-dom";
import {
  setToLocalStorage,
  getFromLocalStorage,
  deleteFromLocalStorage,
} from "utils/storage";

import { CREATE_POST_PREVIEW_DATA, POST_STATUS } from "./constants";
import PostForm from "./Form";
import FormHeader from "./FormHeader";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(POST_STATUS.DRAFT);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const history = useHistory();

  const { mutate: createPost, isLoading } = useCreatePost({
    onSuccess: () => {
      deleteFromLocalStorage(CREATE_POST_PREVIEW_DATA);
      history.push(routes.root);
    },
    onError: error => {
      Logger.error(error);
    },
  });

  const handleSubmit = async () => {
    createPost({
      title,
      description,
      category_ids: selectedCategories.map(category => category.id),
      status,
    });
  };

  const savePreview = () => {
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

    setToLocalStorage({
      key: CREATE_POST_PREVIEW_DATA,
      value: JSON.stringify(payload),
    });
  };

  const debouncedSave = useFuncDebounce(savePreview);

  useEffect(() => {
    const savedPreview = getFromLocalStorage(CREATE_POST_PREVIEW_DATA);
    if (isPresent(savedPreview)) {
      setTitle(savedPreview.title);
      setDescription(savedPreview.description);
      setSelectedCategories(savedPreview.categories);
      setStatus(savedPreview.status);
    }
  }, []);

  useEffect(() => {
    debouncedSave();
  }, [title, description, selectedCategories, status]);

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <FormHeader {...{ status, setStatus, handleSubmit }} />
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

export default Create;
