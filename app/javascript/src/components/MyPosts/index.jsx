import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_TABLE_PAGE_SIZE,
} from "constants/pagination";
import routes from "constants/routes";

import React, { useEffect, useState } from "react";

import { PageLoader, Container } from "components/commons";
import { useFetchMyPosts } from "hooks/reactQuery/useMyPostsApi";
import useQueryParams from "hooks/useQueryParams";
import { mergeLeft, propOr } from "ramda";
import { useHistory } from "react-router-dom";
import { buildUrl } from "utils/urls";

import MyPostsPageHeader from "./PageHeader";
import PostsTable from "./Table";

const MyPosts = () => {
  const [checkedTitles, setCheckedTitles] = useState([
    "title",
    "categories",
    "lastPublishedAt",
    "status",
  ]);

  const history = useHistory();
  const queryParams = useQueryParams();

  const pageNumber = Number(propOr(DEFAULT_PAGE_NUMBER, "page", queryParams));
  const pageSize = Number(
    propOr(DEFAULT_TABLE_PAGE_SIZE, "pageSize", queryParams)
  );

  const { data, isLoading } = useFetchMyPosts({
    page: pageNumber,
    pageSize,
  });

  const posts = data?.data.posts || [];
  const {
    total_count: resultCount,
    current_page: resultPageNumber,
    page_size: resultPageSize,
  } = data?.data.meta || {};

  const handlePageNavigation = page => {
    history.replace(
      buildUrl(routes.myPosts, mergeLeft({ page, pageSize }, queryParams))
    );
  };

  useEffect(() => {
    if (isLoading) return;

    if (resultCount && pageNumber > resultCount) {
      handlePageNavigation(DEFAULT_PAGE_NUMBER);
    }
  }, [isLoading, pageNumber, queryParams, resultCount]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8 ">
        <MyPostsPageHeader
          count={resultCount}
          {...{ checkedTitles, setCheckedTitles }}
        />
        <PostsTable
          currentPageNumber={resultPageNumber || pageNumber}
          data={posts}
          defaultPageSize={resultPageSize || pageSize}
          handlePageChange={handlePageNavigation}
          selectedColumns={checkedTitles}
          totalCount={resultCount}
        />
      </div>
    </Container>
  );
};

export default MyPosts;
