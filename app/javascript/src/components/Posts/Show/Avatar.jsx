import React from "react";

const Avatar = ({ name }) => (
  <div className="flex h-[2em] w-[2em] items-center justify-center rounded-full bg-indigo-500 text-xl font-bold text-white/90">
    {name[0]}
  </div>
);

export default Avatar;
