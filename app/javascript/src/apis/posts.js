import { API_ENDPOINTS } from "constants/axios";

import axios from "axios";

const fetch = (params = {}) => axios.get(API_ENDPOINTS.POSTS, { params });

const show = slug => axios.get(`${API_ENDPOINTS.POSTS}/${slug}`);

const create = payload =>
  axios.post(API_ENDPOINTS.POSTS, {
    post: payload,
  });

const update = ({ slug, payload }) =>
  axios.put(`${API_ENDPOINTS.POSTS}/${slug}`, {
    post: payload,
  });

const destroy = slug => axios.delete(`${API_ENDPOINTS.POSTS}/${slug}`);

const fetchMyPosts = (params = {}) =>
  axios.get(API_ENDPOINTS.MY_POSTS, { params });

const postsApi = {
  fetch,
  show,
  create,
  update,
  destroy,
  fetchMyPosts,
};

export default postsApi;
