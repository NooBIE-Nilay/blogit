import routes from "constants/routes";

import React from "react";

import { isPresent } from "neetoCist";
import { Tag, Typography } from "neetoui";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { getLastPublishedShortDateString } from "utils/date";

import VoteAction from "./VoteAction";

const Item = ({ post }) => {
  const history = useHistory();

  const { t } = useTranslation();

  const {
    title,
    slug,
    categories,
    vote: { vote_type: voteType, net_votes: voteCount },
    user: { name: userName },
    last_published_at: lastPublishedAt,
    is_bloggable: isBloggable,
  } = post;

  return (
    <div
      className="w-full  cursor-pointer rounded-md border-b border-gray-200 px-4 py-6 hover:bg-slate-100"
      onClick={() => history.push(routes.posts.show.replace(":slug", slug))}
    >
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex-1">
          <div className="flex gap-2">
            <div className="items-center justify-center text-xl font-semibold text-gray-900">
              {title}
            </div>
            {isBloggable && (
              <Tag
                className="my-1 border-green-600 bg-white px-5 text-green-600"
                label={t("title")}
              />
            )}
          </div>
          {isPresent(categories) ? (
            <div className="flex gap-2">
              {categories.map(({ id, name }) => (
                <Tag
                  className="my-2 px-4 font-semibold capitalize"
                  key={id}
                  label={name}
                  style="success"
                />
              ))}
            </div>
          ) : (
            <Tag
              className="my-2 capitalize"
              label={t("common.unknown")}
              style="success"
            />
          )}
          <Typography className="ml-1 font-semibold text-gray-600" style="h5">
            {userName}
          </Typography>
          <div className="ml-1  text-sm text-gray-500">
            {getLastPublishedShortDateString(lastPublishedAt)}
          </div>
        </div>
        <VoteAction {...{ slug, voteType, voteCount }} />
      </div>
    </div>
  );
};

Item.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Item;
