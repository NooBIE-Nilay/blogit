import routes from "constants/routes";

import React, { useState } from "react";

import { t } from "i18next";
import { NoData, Tooltip, Table as NeetoTable } from "neetoui";
import { either, isEmpty, isNil } from "ramda";
import { useHistory } from "react-router-dom";
import { formatLastPublishedDate } from "utils/date";

import StatusField from "./StatusField";

const Table = ({ data: rowData = [] }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const history = useHistory();

  const columnData = [
    {
      title: t("table.title"),
      dataIndex: "title",
      render: (title, post) => (
        <div
          onClick={() => {
            history.push(routes.posts.show.replace(":slug", post.slug));
          }}
        >
          <Tooltip content={title}>
            <div className="max-w-60 truncate">{title}</div>
          </Tooltip>
        </div>
      ),
    },
    {
      title: t("table.category"),
      dataIndex: "categories",
      render: categories =>
        isEmpty(categories)
          ? t("common.unknown")
          : categories.map(category => category.name).join(", "),
    },
    {
      title: t("table.lastPublishedAt"),
      dataIndex: "last_published_at",
      render: last_published_at => (
        <div className="flex flex-row items-center ">
          {formatLastPublishedDate(last_published_at)}
        </div>
      ),
    },
    {
      title: t("table.status"),
      dataIndex: "status",
      render: (_, post) => <StatusField {...{ post }} />,
    },
  ];

  if (either(isNil, isEmpty)(rowData)) {
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
        fixedHeight
        rowSelection
        className="min-h-4xl"
        {...{ rowData, columnData, selectedRowKeys }}
        onRowSelect={selectedRowKeys => setSelectedRowKeys(selectedRowKeys)}
      />
    </div>
  );
};

export default Table;
