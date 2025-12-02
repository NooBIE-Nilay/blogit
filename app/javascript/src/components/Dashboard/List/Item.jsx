import routes from "constants/routes";

import React from "react";

import dayjs from "dayjs";
import { Tag, Typography } from "neetoui";
import PropTypes from "prop-types";
import { either, isEmpty, isNil } from "ramda";
import { useHistory } from "react-router-dom";

const Item = ({ post }) => {
  const history = useHistory();

  return (
    <div
      className="w-full  cursor-pointer rounded-md border-b border-gray-200 px-4 py-6 hover:bg-slate-100"
      onClick={() =>
        history.push(routes.posts.show.replace(":slug", post.slug))
      }
    >
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex-1">
          <div className="text-xl font-semibold text-gray-900">
            {post.title}
          </div>
          {either(isEmpty, isNil)(post.categories) ? (
            <Tag className="my-2 capitalize" label="Unknown" style="success" />
          ) : (
            <div className="flex gap-2">
              {post.categories.map(category => (
                <Tag
                  className="my-2 capitalize"
                  key={category.id}
                  label={category.name}
                  style="success"
                />
              ))}
            </div>
          )}
          <Typography className="ml-1 font-semibold text-gray-600" style="h5">
            {post.user?.name}
          </Typography>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="text-sm text-gray-500">
            {dayjs(post.updated_at).format("DD MMMM YYYY")}
          </div>
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Item;
