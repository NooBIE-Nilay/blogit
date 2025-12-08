import { POST_STATUS } from "constants";

import React from "react";

import { useBulkUpdateStatus } from "hooks/reactQuery/useMyPostsApi";
import { Dropdown, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import BulkDeleteAction from "./BulkDeleteAction";

const BulkActions = ({ selectedRowKeys, onActionComplete }) => {
  const { t } = useTranslation();

  const { mutate: bulkUpdateStatus, isLoading } = useBulkUpdateStatus();

  const { Menu, MenuItem } = Dropdown;

  const handleStatusChange = status => {
    bulkUpdateStatus(
      { postIds: selectedRowKeys, status },
      {
        onSuccess: () => {
          onActionComplete?.();
        },
      }
    );
  };

  return (
    <>
      <Dropdown
        buttonStyle="secondary"
        disabled={isLoading}
        label={t("common.status")}
      >
        <Menu>
          <MenuItem
            className=" px-1 py-2 "
            onClick={() => handleStatusChange(POST_STATUS.DRAFT)}
          >
            <Typography className=" font-semibold" style="h5">
              {t("status.update.unpublish")}
            </Typography>
          </MenuItem>
          <MenuItem
            className="px-1 py-2 "
            onClick={() => handleStatusChange(POST_STATUS.PUBLISHED)}
          >
            <Typography className=" font-semibold" style="h5">
              {t("status.update.publish")}
            </Typography>
          </MenuItem>
        </Menu>
      </Dropdown>
      <BulkDeleteAction {...{ selectedRowKeys, onActionComplete }} />
    </>
  );
};

export default BulkActions;
