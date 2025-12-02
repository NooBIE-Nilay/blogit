import React, { useState } from "react";

import dayjs from "dayjs";
import { t } from "i18next";
import { capitalize } from "neetoCist";
import { Table as NeetoTable } from "neetoui";

const Table = ({ data = [] }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columnData = [
    { title: t("table.title"), dataIndex: "title" },
    {
      title: t("table.category"),
      dataIndex: "category_names",
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
      render: status => capitalize(status),
    },
  ];

  const rowData = data.map(post => ({
    id: post.id,
    title: post.title,
    last_published_at: post.last_published_at,
    status: post.status,
    category_names: post.categories.map(category => category.name).join(", "),
  }));

  return (
    <div className="inline-block min-w-full">
      <NeetoTable
        rowSelection
        {...{ rowData, columnData, selectedRowKeys }}
        onRowSelect={arg1 => setSelectedRowKeys(arg1)}
      />
    </div>
  );
};

export default Table;
