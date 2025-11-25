import React from "react";

import { Button, Tag, Typography } from "@bigbinary/neetoui";
import PropTypes from "prop-types";
import { isNil, isEmpty, either } from "ramda";

const List = ({ data, showPost, destroyPost }) => {
  if (either(isNil, isEmpty)(data)) {
    return <div>No posts available</div>;
  }

  return (
    <div className="w-full">
      {data.map(post => (
        <div
          className="w-full  cursor-pointer rounded-md border-b border-gray-200 px-4 py-6 hover:bg-slate-100"
          key={post.id}
          onClick={() => showPost(post.slug)}
        >
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex-1">
              <div className="text-xl font-semibold text-gray-900">
                {post.title}
              </div>
              <div className="mt-2 line-clamp-2 text-sm text-gray-700">
                {post.description}
              </div>
              {either(isEmpty, isNil)(post.categories) ? (
                <Tag
                  className="my-2 capitalize"
                  label="Unknown"
                  style="success"
                />
              ) : (
                <div className="flex gap-2">
                  {post.categories?.map(category => (
                    <Tag
                      className="my-2 capitalize"
                      key={category}
                      label={category}
                      style="success"
                    />
                  ))}
                </div>
              )}
              <Typography className="font-semibold text-gray-600" style="h5">
                {post.user?.name}
              </Typography>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <div className="text-sm text-gray-500">
                {new Date(post.created_at).toDateString()}
              </div>
              <div className="flex items-center gap-3">
                <Button
                  label="Delete"
                  style="danger"
                  onClick={event => {
                    event.stopPropagation();
                    destroyPost(post.slug);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

List.propTypes = {
  data: PropTypes.array.isRequired,
  destroyPost: PropTypes.func,
  showPost: PropTypes.func,
};

export default List;
