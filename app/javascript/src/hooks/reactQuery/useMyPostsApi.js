import { QUERY_KEYS } from "constants/query";

import myPostsApi from "apis/myPosts";
import { useQuery } from "react-query";

const useFetchMyPosts = ({ selectedCategoryIds = [], page, pageSize }) =>
  useQuery({
    queryKey: [QUERY_KEYS.MY_POSTS],
    queryFn: () =>
      myPostsApi.fetch({
        categoryIds: selectedCategoryIds,
        page,
        pageSize,
      }),
    keepPreviousData: true,
  });

export { useFetchMyPosts };
