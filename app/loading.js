import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-t-4 border-secondary border-solid rounded-full animate-spin"></div>
      <p className="ml-2 text-secondary">Loading...</p>
    </div>
  );
};

export default Loading;
