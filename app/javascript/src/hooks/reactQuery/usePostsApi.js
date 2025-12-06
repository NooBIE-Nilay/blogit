import { QUERY_KEYS } from "constants/query";

import postsApi from "apis/posts";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useFetchPosts = ({ selectedCategoryIds = [], page, pageSize }) =>
  useQuery({
    queryKey: [QUERY_KEYS.POSTS, selectedCategoryIds, page, pageSize],
    queryFn: () =>
      postsApi.fetch({ categoryIds: selectedCategoryIds, page, pageSize }),
    keepPreviousData: true,
  });

const useShowPost = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.POST, slug],
    queryFn: () => postsApi.show(slug),
    enabled: !!slug,
  });

const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payload => postsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
    },
  });
};

const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, slug }) => postsApi.update({ payload, slug }),
    onSuccess: (_, { slug }) => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.POST, slug]);
    },
  });
};

const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: slug => postsApi.destroy(slug),
    onSuccess: (_, slug) => {
      queryClient.removeQueries([QUERY_KEYS.POST, slug]);
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
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
