import { QUERY_KEYS } from "constants/query";

import postsApi from "apis/posts";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useFetchPosts = ({ selectedCategoryIds = [] }) =>
  useQuery({
    queryKey: [QUERY_KEYS.POSTS, selectedCategoryIds],
    queryFn: () => postsApi.fetch({ categoryIds: selectedCategoryIds }),
  });

const useShowPost = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.POSTS, slug],
    queryFn: () => postsApi.show(slug),
    enabled: !!slug,
  });

const useCreatePost = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payload => postsApi.create(payload),
    onSuccess: (...args) => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
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
    mutationFn: ({ payload, slug }) => postsApi.update(payload, slug),
    onSuccess: (...args) => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      onSuccess?.(...args);
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
    onSuccess: (...args) => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
  });
};

export {
  useFetchPosts,
  useShowPost,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
};
