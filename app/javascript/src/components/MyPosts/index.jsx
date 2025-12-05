import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_TABLE_PAGE_SIZE,
} from "constants/pagination";
import routes from "constants/routes";

import React, { useEffect } from "react";

import { PageLoader, PageTitle, Container } from "components/commons";
import { useFetchMyPosts } from "hooks/reactQuery/useMyPostsApi";
import useQueryParams from "hooks/useQueryParams";
import { Pagination } from "neetoui";
import { mergeLeft, propOr } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import useSelectedCategoryStore from "stores/useSelectedCategoryStore";
import { buildUrl } from "utils/urls";

import Table from "./Table";

const MyPosts = () => {
  const history = useHistory();

  const queryParams = useQueryParams();

  const { t } = useTranslation();

  const { selectedCategories } = useSelectedCategoryStore();

  const pageNumber = Number(propOr(DEFAULT_PAGE_NUMBER, "page", queryParams));
  const pageSize = Number(
    propOr(DEFAULT_TABLE_PAGE_SIZE, "pageSize", queryParams)
  );

  const { data, isLoading } = useFetchMyPosts({
    selectedCategoryIds: selectedCategories.map(category => category.id),
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
      buildUrl(
        routes.myPosts,
        mergeLeft({ page, page_size: pageSize }, queryParams)
      )
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
        <PageTitle count={resultCount} title={t("myPosts.title")} />
        <Table data={posts} />
        <div className="flex items-center justify-end">
          <Pagination
            count={resultCount}
            navigate={handlePageNavigation}
            pageNo={resultPageNumber || pageNumber}
            pageSize={resultPageSize || pageSize}
          />
        </div>
      </div>
    </Container>
  );
};

export default MyPosts;
