import React from "react";

const Button = ({
  children,
  className = "",
  isResponsive = false,
  isDash = false,
  isSoft = false,
  isOutline = false,
  isDisabled = false,
  ...props
}) => {
  return (
    <button
      className={
        "btn " +
        className +
        (isResponsive
          ? " btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
          : "") +
        (isDash ? " btn-dash" : "") +
        (isSoft ? " btn-soft" : "") +
        (isOutline ? " btn-outline" : "") +
        (isDisabled ? " btn-disabled" : "")
      }
      disabled={isDisabled}
      {...props}
    >
      {children && <div>{children}</div>}
    </button>
  );
};

export default Button;
