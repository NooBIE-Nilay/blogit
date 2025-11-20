import axios from "axios";

const fetch = () => axios.get("/posts");

const show = slug => axios.get(`/posts/${slug}`);

const create = payload =>
  axios.post("/posts", {
    post: payload,
  });

const update = ({ slug, payload }) =>
  axios.put(`/posts/${slug}`, {
    task: payload,
  });

const destroy = slug => axios.delete(`/posts/${slug}`);

const postsApi = {
  fetch,
  show,
  create,
  update,
  destroy,
};

export default postsApi;
