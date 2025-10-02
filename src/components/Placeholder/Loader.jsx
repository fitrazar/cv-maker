import React from "react";

const Loader = ({ message = "" }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
      {message && <p className="ml-2">{message}</p>}
    </div>
  );
};

export default Loader;
