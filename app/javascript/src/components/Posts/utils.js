import { isPresent } from "neetoCist";
import { getFromLocalStorage } from "utils/storage";

import {
  CREATE_POST_PREVIEW_DATA,
  EDIT_POST_PREVIEW_DATA,
  POST_STATUS,
} from "./constants";

export const getPreviewKey = (source, slug) =>
  source === "edit" && slug
    ? `${EDIT_POST_PREVIEW_DATA}:${slug}`
    : CREATE_POST_PREVIEW_DATA;

export const isOwner = userId => {
  const authUserId = getFromLocalStorage("authUserId");

  return isPresent(authUserId) && authUserId === userId;
};

export const isDraft = status => status === POST_STATUS.DRAFT;
