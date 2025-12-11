import { API_ENDPOINTS } from "constants/axios";

import axios from "axios";

const fetch = (params = {}) =>
  axios.get(API_ENDPOINTS.ORGANIZATIONS, { params });

const create = payload =>
  axios.post(API_ENDPOINTS.ORGANIZATIONS, {
    organization: payload,
  });

const organizationsApi = { fetch, create };

export default organizationsApi;
