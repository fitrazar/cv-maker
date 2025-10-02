import React from "react";

const Success = ({ msg }) => {
  const renderMessageContent = (message) => {
    if (typeof message === "object" && message !== null) {
      return Object.keys(message).map((key) => {
        if (Array.isArray(message[key])) {
          return message[key].map((item, index) => (
            <li key={`${key}-${index}`}>
              {key} : {item}
            </li>
          ));
        } else {
          return <li key={key}>{message[key]}</li>;
        }
      });
    } else {
      return <li>{message}</li>;
    }
  };

  return (
    <div className="toast toast-top toast-start z-10">
      <div className="alert alert-success">
        <span>{renderMessageContent(msg)}</span>
      </div>
    </div>
  );
};

export default Success;
