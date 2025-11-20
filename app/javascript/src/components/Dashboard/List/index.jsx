import React from "react";

import { isNil, isEmpty, either } from "ramda";

const List = ({ data, showPost }) => {
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
              className="text-indigo-600"
              onClick={event => {
                event.preventDefault();
                showPost(post.slug);
              }}
            >
              Show
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
