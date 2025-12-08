import { POST_STATUS } from "constants";

export const menuItems = [
  { id: "title", labelKey: "table.title", disabled: true },
  { id: "categories", labelKey: "table.category" },
  {
    id: "last_published_at",
    labelKey: "table.lastPublishedAt",
  },
  { id: "status", labelKey: "table.status" },
];

export const getStatusOptions = t => [
  { label: t("post.status.published"), value: POST_STATUS.PUBLISHED },
  { label: t("post.status.draft"), value: POST_STATUS.DRAFT },
];
