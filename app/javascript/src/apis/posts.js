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

const vote = ({ slug, voteType }) =>
  axios.post(API_ENDPOINTS.VOTE.replace(":slug", slug), {
    vote_type: voteType,
  });

const postsApi = {
  fetch,
  show,
  create,
  update,
  destroy,
  vote,
};

export default postsApi;
