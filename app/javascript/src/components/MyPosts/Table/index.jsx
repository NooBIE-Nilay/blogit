import routes from "constants/routes";

import React, { useState } from "react";

import dayjs from "dayjs";
import { t } from "i18next";
import { Tooltip, Table as NeetoTable } from "neetoui";
import { isEmpty } from "ramda";
import { useHistory } from "react-router-dom";

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
          {dayjs(last_published_at).isValid()
            ? dayjs(last_published_at).format("MMM D, YYYY, h:mm A	")
            : "-"}
        </div>
      ),
    },
    {
      title: t("table.status"),
      dataIndex: "status",
      render: (_, post) => <StatusField {...{ post }} />,
    },
  ];

  return (
    <div className="inline-block min-w-full">
      <NeetoTable
        rowSelection
        {...{ rowData, columnData, selectedRowKeys }}
        onRowSelect={selectedRowKeys => setSelectedRowKeys(selectedRowKeys)}
      />
    </div>
  );
};

export default Table;
