import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "constants/pagination";
import routes from "constants/routes";

import React, { useEffect } from "react";

import { PageLoader, PageTitle, Container } from "components/commons";
import List from "components/Dashboard/List";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import useQueryParams from "hooks/useQueryParams";
import { Button, Pagination } from "neetoui";
import { mergeLeft, propOr } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import useCategoryStore from "stores/useCategoryStore";
import { buildUrl } from "utils/urls";

const Dashboard = () => {
  const history = useHistory();

  const queryParams = useQueryParams();

  const { t } = useTranslation();

  const { selectedCategories } = useCategoryStore();

  const pageNumber = Number(propOr(DEFAULT_PAGE_NUMBER, "page", queryParams));
  const pageSize = Number(propOr(DEFAULT_PAGE_SIZE, "pageSize", queryParams));

  const { data, isLoading } = useFetchPosts({
    selectedCategoryIds: selectedCategories.map(category => category.id),
    page: pageNumber,
    pageSize,
  });

  const posts = data?.data.posts || [];
  const meta = data?.data.meta || {};

  const handlePageNavigation = page => {
    history.replace(
      buildUrl(
        routes.root,
        mergeLeft({ page, page_size: pageSize }, queryParams)
      )
    );
  };

  useEffect(() => {
    if (isLoading) return;

    if (meta.total_pages && pageNumber > meta.total_pages) {
      handlePageNavigation(DEFAULT_PAGE_NUMBER);
    }
  }, [meta, isLoading, pageNumber, queryParams]);

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
        <div className="flex flex-col justify-between sm:flex-row sm:items-center">
          <PageTitle title={t("posts.title")} />
          <div className="ml-4">
            <Button
              label={t("posts.add")}
              style="primary"
              onClick={() => history.push(routes.posts.create)}
            />
          </div>
        </div>
        <List data={posts} />
        <div className="flex items-center justify-end">
          <Pagination
            count={meta.total_count}
            navigate={handlePageNavigation}
            pageNumber={meta.current_page || pageNumber}
            pageSize={meta.page_size || pageSize}
          />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
