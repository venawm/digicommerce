import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <AiOutlineLoading3Quarters className=" text-6xl animate-spin text-secondary" />
    </div>
  );
};

export default Loading;
