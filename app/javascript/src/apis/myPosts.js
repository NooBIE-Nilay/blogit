import { API_ENDPOINTS } from "constants/axios";

import axios from "axios";

const fetch = (params = {}) => axios.get(API_ENDPOINTS.MY_POSTS, { params });

const myPostsApi = { fetch };

export default myPostsApi;
