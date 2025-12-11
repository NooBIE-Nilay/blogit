import routes from "constants/routes";

import React from "react";

import { Container } from "components/commons";
import useQueryParams from "hooks/useQueryParams";
import { isPresent, isNotPresent } from "neetoCist";
import { Avatar, Tag, Typography, NoData } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { getLastUpdatedDateString } from "utils/date";
import { getFromLocalStorage } from "utils/storage";

import { getPreviewKey, isDraft } from "./utils";

const Preview = () => {
  const { slug, source } = useQueryParams();

  const history = useHistory();

  const { t } = useTranslation();

  const previewKey = getPreviewKey(source, slug);

  const post = getFromLocalStorage(previewKey) || {};
  const isPostInvalid = isNotPresent(post);

  const {
    title = "",
    categories = "",
    user: { name: username = "" } = {},
    description = "",
    status = "",
  } = post;

  if (isPostInvalid) {
    return (
      <div className="flex h-screen items-center justify-center">
        <NoData
          title={t("posts.preview.empty")}
          primaryButtonProps={{
            label: t("common.home"),
            onClick: () => history.push(routes.root),
          }}
        />
      </div>
    );
  }

  const lastUpdatedDate = getLastUpdatedDateString(post);

  return (
    <Container>
      <div className="my-10 flex flex-col">
        <div>
          {isPresent(categories) ? (
            <div className="flex gap-2">
              {categories.map(({ id, name }) => (
                <Tag
                  className="mt-2 capitalize"
                  key={id}
                  label={name}
                  style="success"
                />
              ))}
            </div>
          ) : (
            <Tag
              className=" capitalize"
              label={t("common.unknown")}
              style="success"
            />
          )}
        </div>
        <div className="mt-1 flex w-full items-start justify-between gap-x-6 md:max-w-6xl">
          <div className="flex flex-col gap-y-2">
            <div className="mt-6 flex items-center gap-2">
              <Typography className="font-semibold" style="h1">
                {title}
              </Typography>
              {isDraft(status) && (
                <Tag
                  className="border-red-500 bg-white  px-4 text-red-500"
                  label={t("status.draftTitle")}
                />
              )}
            </div>
            <div className="flex  items-center gap-3">
              <Avatar className="-z-10" user={{ username }} />
              <div className="">
                <Typography className="text-lg font-bold text-gray-700">
                  {username}
                </Typography>
                <Typography className="text-sm font-semibold text-gray-500">
                  {lastUpdatedDate}
                </Typography>
              </div>
            </div>
            <pre className="text-wrap">{description}</pre>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Preview;
