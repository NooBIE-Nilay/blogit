import React from "react";

import PageTitle from "components/commons/PageTitle";
import { withTranslation } from "react-i18next";

import ColumnDropdown from "./ColumnDropdown";
import FilterPane from "./FilterPane";

const PageHeader = ({ count, t, checkedTitles, setCheckedTitles }) => (
  <>
    <PageTitle title={t("myPosts.title")} />
    <div className="flex items-center justify-between">
      {!!count && (
        <div className="text-xl font-semibold">
          {`${count} ${t("common.articles")}`}
        </div>
      )}
      <div className="flex items-center justify-end gap-1">
        <ColumnDropdown {...{ checkedTitles, setCheckedTitles }} />
        <FilterPane />
      </div>
    </div>
  </>
);
export default withTranslation()(PageHeader);
