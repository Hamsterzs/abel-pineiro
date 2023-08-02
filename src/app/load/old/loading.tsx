import React from "react";
import { BiLoader } from "react-icons/bi";

const Loading = () => {
  return (
    <div className="my-auto">
      <BiLoader className="mx-auto animate-spin text-6xl" />
      <h1 className="text-4xl">Loading</h1>
    </div>
  );
};

export default Loading;
