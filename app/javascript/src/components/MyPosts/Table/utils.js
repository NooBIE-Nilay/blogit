import { POST_STATUS } from "constants";

import { t } from "i18next";

export const getStatusLabel = status =>
  status === POST_STATUS.PUBLISHED
    ? t("status.update.unpublish")
    : t("status.update.publish");

export const toggleStatus = status =>
  status === POST_STATUS.PUBLISHED ? POST_STATUS.DRAFT : POST_STATUS.PUBLISHED;
