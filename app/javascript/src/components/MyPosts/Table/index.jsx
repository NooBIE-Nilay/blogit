import routes from "constants/routes";

import React from "react";

import { t } from "i18next";
import { isPresent, isNotPresent } from "neetoCist";
import { NoData, Tooltip, Table as NeetoTable } from "neetoui";
import { useHistory, Link } from "react-router-dom";
import { getLastPublishedDateString } from "utils/date";

import StatusField from "./StatusField";

const Table = ({
  data: rowData = [],
  defaultPageSize,
  currentPageNumber,
  handlePageChange,
  totalCount,
  selectedColumns,
  selectedRowKeys = [],
  onRowSelect = () => {},
}) => {
  const history = useHistory();

  const columnProps = [
    {
      title: t("table.title"),
      dataIndex: "title",
      render: (_, { title, slug }) => (
        <Link
          className="text-black no-underline"
          to={routes.posts.show.replace(":slug", slug)}
        >
          <Tooltip content={title}>
            <div className="max-w-60 truncate">{title}</div>
          </Tooltip>
        </Link>
      ),
    },
    {
      title: t("table.category"),
      dataIndex: "categories",
      width: "25%",
      render: categories =>
        isPresent(categories)
          ? categories.map(category => category.name).join(", ")
          : t("common.unknown"),
    },
    {
      title: t("table.lastPublishedAt"),
      dataIndex: "last_published_at",
      width: "20%",
      render: lastPublishedAt => (
        <div className="flex flex-row items-center ">
          {getLastPublishedDateString(lastPublishedAt)}
        </div>
      ),
    },
    {
      title: t("table.status"),
      width: "20%",
      dataIndex: "status",
      render: (_, post) => <StatusField {...{ post }} />,
    },
  ];

  const columnData = columnProps.filter(({ dataIndex }) =>
    selectedColumns.includes(dataIndex)
  );

  if (isNotPresent(rowData)) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <NoData
          title={t("posts.empty")}
          primaryButtonProps={{
            label: t("posts.add"),
            onClick: () => history.push(routes.posts.create),
          }}
        />
      </div>
    );
  }

  return (
    <div className=" inline-block min-w-full ">
      <NeetoTable
        rowSelection
        className="h-4xl"
        {...{
          rowData,
          columnData,
          selectedRowKeys,
          onRowSelect,
          defaultPageSize,
          currentPageNumber,
          handlePageChange,
          totalCount,
        }}
      />
    </div>
  );
};

export default Table;
