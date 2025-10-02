import React from "react";

const DangerText = ({ msg }) => {
  const renderMessageContent = (message) => {
    if (typeof message === "object" && message !== null) {
      return Object.keys(message).map((key) => {
        if (Array.isArray(message[key])) {
          const items = message[key].join(", ");
          return (
            <p key={key}>
              {key} : {items}
            </p>
          );
        } else {
          return <p key={key}>{message[key]}</p>;
        }
      });
    } else {
      return <p>{message}</p>;
    }
  };

  return (
    <div className="text-error gap-2 flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-4 w-4 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
      {renderMessageContent(msg)}
    </div>
  );
};

export default DangerText;
