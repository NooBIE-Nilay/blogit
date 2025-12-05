import { QUERY_KEYS } from "constants/query";

import authApi from "apis/auth";
import { useMutation, useQueryClient } from "react-query";

const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payload => authApi.signup(payload),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.USER]);
    },
  });
};

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payload => authApi.login(payload),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.USER]);
    },
  });
};

export { useSignup, useLogin };
