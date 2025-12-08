import { API_ENDPOINTS } from "constants/axios";

import axios from "axios";

const fetch = (params = {}) =>
  axios.get(API_ENDPOINTS.MY_POSTS.INDEX, { params });

const bulkUpdateStatus = payload =>
  axios.patch(`${API_ENDPOINTS.MY_POSTS.BULK_UPDATE_STATUS}`, {
    post_ids: payload.postIds,
    status: payload.status,
  });

const bulkDelete = payload =>
  axios.delete(`${API_ENDPOINTS.MY_POSTS.BULK_DELETE}`, {
    post_ids: payload.postIds,
  });

const myPostsApi = { fetch, bulkUpdateStatus, bulkDelete };

export default myPostsApi;
