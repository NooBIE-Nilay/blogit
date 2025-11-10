import React from "react";

import { isNil, isEmpty, either } from "ramda";

const List = ({ data }) => {
  if (either(isNil, isEmpty)(data)) {
    return <div>No posts available</div>;
  }

  return (
    <div className="flex flex-col gap-8 ">
      {data.map(post => (
        <div key={post.id}>
          <div className="text-2xl font-bold">{post.title}</div>
          <div className=" my-2 line-clamp-2 max-h-[2lh] text-ellipsis  font-medium text-gray-800">
            {post.description}
          </div>
          <div className="text-sm font-semibold text-gray-400">
            {new Date(post.created_at).toDateString()}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default List;
