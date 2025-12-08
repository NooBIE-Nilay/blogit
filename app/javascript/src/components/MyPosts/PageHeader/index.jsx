import React from "react";

import PageTitle from "components/commons/PageTitle";
import { useTranslation } from "react-i18next";

import BulkActions from "./BulkActions";
import ColumnDropdown from "./ColumnDropdown";
import FilterPane from "./FilterPane";

const PageHeader = ({
  count,
  checkedTitles,
  setCheckedTitles,
  onFiltersApply,
  selectedRowKeys = [],
  onBulkActionComplete,
}) => {
  const selectedRowsCount = selectedRowKeys.length;
  const { t } = useTranslation();

  const isSelected = selectedRowsCount > 0;

  return (
    <>
      <PageTitle title={t("myPosts.title")} />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 ">
          {!!count && (
            <div className="text-xl font-semibold">
              {isSelected
                ? `${selectedRowsCount} ${t("common.selected")}`
                : `${count} ${t("common.articles")}`}
            </div>
          )}
          <div className="flex items-center justify-start gap-2">
            {isSelected && (
              <BulkActions
                selectedRowKeys={selectedRowKeys}
                onActionComplete={onBulkActionComplete}
              />
            )}
          </div>
        </div>
        <div className="flex items-center">
          <ColumnDropdown {...{ checkedTitles, setCheckedTitles }} />
          <FilterPane onApply={onFiltersApply} />
        </div>
      </div>
    </>
  );
};
export default PageHeader;
