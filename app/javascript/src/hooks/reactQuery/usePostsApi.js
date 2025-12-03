import { QUERY_KEYS } from "constants/query";

import postsApi from "apis/posts";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useFetchPosts = ({ selectedCategoryIds = [], page, perPage }) =>
  useQuery({
    queryKey: [QUERY_KEYS.POSTS, selectedCategoryIds, page, perPage],
    queryFn: () =>
      postsApi.fetch({ categoryIds: selectedCategoryIds, page, perPage }),
    keepPreviousData: true,
  });

const useFetchMyPosts = ({ selectedCategoryIds = [], page, perPage }) =>
  useQuery({
    queryKey: [QUERY_KEYS.MY_POSTS],
    queryFn: () =>
      postsApi.fetchMyPosts({
        categoryIds: selectedCategoryIds,
        page,
        perPage,
      }),
    keepPreviousData: true,
  });

const useShowPost = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.POST, slug],
    queryFn: () => postsApi.show(slug),
    enabled: !!slug,
  });

const useCreatePost = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payload => postsApi.create(payload),
    onSuccess: (...args) => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
  });
};

const useUpdatePost = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, slug }) => postsApi.update({ payload, slug }),
    onSuccess: (data, slug) => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.POST, slug]);
      onSuccess?.(data);
    },
    onError: (...args) => {
      onError?.(...args);
    },
  });
};

const useDeletePost = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: slug => postsApi.destroy(slug),
    onSuccess: (data, slug) => {
      queryClient.removeQueries([QUERY_KEYS.POST, slug]);
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
      onSuccess?.(data);
    },
    onError: (...args) => {
      onError?.(...args);
    },
  });
};

export {
  useFetchPosts,
  useFetchMyPosts,
  useShowPost,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
};
