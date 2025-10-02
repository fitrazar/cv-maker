import React from "react";

const Badge = ({
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
    <div
      className={
        "badge " +
        className +
        (isResponsive
          ? " badge-xs sm:badge-sm md:badge-md lg:badge-lg xl:badge-xl"
          : "") +
        (isDash ? " badge-dash" : "") +
        (isSoft ? " badge-soft" : "") +
        (isOutline ? " badge-outline" : "") +
        (isDisabled ? " disabled" : "")
      }
      disabled={isDisabled}
      {...props}
    >
      {children && <div>{children}</div>}
    </div>
  );
};

export default Badge;
