import dayjs from "dayjs";
import { t } from "i18next";

export const getLastUpdatedDateString = post => {
  if (!post) return "";

  return dayjs(post?.last_published_at).isValid()
    ? `${t("date.published")}: ${dayjs(post?.last_published_at).format(
        "DD MMMM YYYY"
      )}`
    : `${t("date.created")}: ${dayjs(post.updated_at).format("DD MMMM YYYY")}`;
};

export const getLastPublishedDateString = lastPublishedAt =>
  dayjs(lastPublishedAt).isValid()
    ? dayjs(lastPublishedAt).format("MMM D, YYYY, h:mm A	")
    : "-";
