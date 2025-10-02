import React from "react";

const CardDefault = ({ title = "", className = "", children }) => {
  return (
    <>
      <div className={"card bg-secondary shadow-sm " + className}>
        <div className="card-body">
          {title && <h2 className="card-title">{title}</h2>}
          {children}
        </div>
      </div>
    </>
  );
};

export default CardDefault;
