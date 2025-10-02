import React from "react";

const Input = ({
  className = "",
  labelClass = "",
  type = "text",
  icon = "",
  isOptional = false,
  isDisabled = false,
  withValidator = false,
  validator = "",
  withLabel = false,
  ...props
}) => {
  return (
    <>
      {!withLabel ? (
        <input
          type={type}
          className={
            (type == "file" ? "file-input " : "input ") +
            className +
            (withValidator ? " validator" : "")
          }
          {...props}
          disabled={isDisabled}
        />
      ) : (
        <label
          className={
            "input " + labelClass + (withValidator ? " validator" : "")
          }
        >
          {icon}
          <input type={type} className={"grow " + className} {...props} />
          {isOptional && (
            <span className="badge badge-neutral badge-xs">Opsional</span>
          )}
        </label>
      )}
      {withValidator && <p className="validator-hint">{validator}</p>}
    </>
  );
};

export default Input;
