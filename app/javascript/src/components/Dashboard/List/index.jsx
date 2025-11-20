import React from "react";

import PropTypes from "prop-types";
import { isNil, isEmpty, either } from "ramda";

const List = ({ data, showPost, destroyPost }) => {
  if (either(isNil, isEmpty)(data)) {
    return <div>No posts available</div>;
  }

  return (
    <div className="flex flex-col gap-8 ">
      {data.map(post => (
        <div className="flex w-full items-center justify-around" key={post.id}>
          <div>
            <div className="text-2xl font-bold">{post.title}</div>
            <div className=" my-2 line-clamp-2 max-h-[2lh] text-ellipsis  font-medium text-gray-800">
              {post.description}
            </div>
            <div className="text-sm font-semibold text-gray-400">
              {new Date(post.created_at).toDateString()}
              <hr />
            </div>
          </div>
          <div>
            <a
              className="text-indigo-500 hover:text-indigo-700"
              onClick={event => {
                event.preventDefault();
                showPost(post.slug);
              }}
            >
              Show
            </a>
            <a
              className="text-red-500 hover:text-red-700"
              onClick={() => destroyPost(post.slug)}
            >
              Delete
            </a>
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
