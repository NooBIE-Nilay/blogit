import authApi from "apis/auth";
import { setAuthHeaders, resetAuthTokens } from "apis/axios";
import { useMutation } from "react-query";
import queryClient from "utils/queryClient";
import { setAuthToLocalStorage } from "utils/storage";

export const useSignup = () => useMutation(authApi.signup);

export const useLogin = () =>
  useMutation(authApi.login, {
    onSuccess: ({ data }) => {
      queryClient.clear();
      setAuthToLocalStorage({
        authToken: data.authentication_token,
        userId: data.id,
        userName: data.name,
        email: data.email,
      });
      setAuthHeaders();
    },
  });

export const useLogout = () =>
  useMutation(authApi.logout, {
    onSuccess: () => {
      queryClient.clear();
      setAuthToLocalStorage({
        authToken: null,
        userId: null,
        userName: null,
        email: null,
      });
      resetAuthTokens();
    },
  });
