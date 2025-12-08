import { QUERY_KEYS } from "constants/query";

import myPostsApi from "apis/myPosts";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useFetchMyPosts = ({
  selectedCategoryIds = [],
  page,
  pageSize,
  title = "",
  status = [],
}) =>
  useQuery({
    queryKey: [
      QUERY_KEYS.MY_POSTS,
      page,
      pageSize,
      selectedCategoryIds,
      title,
      status,
    ],
    queryFn: () =>
      myPostsApi.fetch({
        categoryIds: selectedCategoryIds,
        page,
        pageSize,
        title,
        status,
      }),
    keepPreviousData: true,
  });

const useBulkUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payload => myPostsApi.bulkUpdateStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
    },
  });
};

const useBulkDeletePosts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payload => myPostsApi.bulkDelete(payload),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
    },
  });
};

export { useFetchMyPosts, useBulkUpdateStatus, useBulkDeletePosts };
