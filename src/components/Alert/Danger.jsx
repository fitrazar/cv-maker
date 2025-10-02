import React from "react";

const Danger = ({ msg }) => {
  const renderMessageContent = (message) => {
    // Check if message is an object with nested arrays
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
    <div role="alert" className="alert alert-error mb-4">
      <div className="flex flex-col">
        <ul className="menu p-0 [&_li>*]:rounded-none">
          {renderMessageContent(msg)}
        </ul>
      </div>
    </div>
  );
};

export default Danger;
