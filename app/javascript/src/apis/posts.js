import axios from "axios";

const fetch = () => axios.get("/posts");

const show = slug => axios.get(`/posts/${slug}`);

const create = payload =>
  axios.post("/posts", {
    post: payload,
  });

const update = ({ slug, payload }) =>
  axios.put(`/tasks/${slug}`, {
    task: payload,
  });

const destroy = slug => axios.delete(`/tasks/${slug}`);

const postsApi = {
  fetch,
  show,
  create,
  update,
  destroy,
};

export default postsApi;
