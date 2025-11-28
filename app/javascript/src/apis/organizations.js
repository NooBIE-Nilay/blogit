import { API_ENDPOINTS } from "constants/axios";

import axios from "axios";

const fetch = (params = {}) =>
  axios.get(API_ENDPOINTS.ORGANIZATIONS, { params });

const organizationsApi = { fetch };

export default organizationsApi;
