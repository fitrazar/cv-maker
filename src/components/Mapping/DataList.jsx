import React from "react";
import Skeleton from "@components/Skeleton/Skeleton";
import Danger from "@components/Alert/Danger";
import Spinner from "@components/Placeholder/Spinner";
import DangerText from "@components/Alert/DangerText";
import Warning from "@components/Alert/Warning";

const DataList = ({
  data,
  loading,
  error,
  renderItem,
  loader = "skeleton",
  skeletonType = "basic",
  dangerType = "basic",
  skeletonClass = "h-32 w-32",
  errorMsg,
}) => {
  const skeletonAttributes = skeletonType === "post" && { type: "post" };
  const isDataEmpty = !data || data.length === 0 || data < 0;

  return (
    <>
      {loading ? (
        loader === "skeleton" ? (
          <Skeleton className={skeletonClass} {...skeletonAttributes} />
        ) : (
          <Spinner />
        )
      ) : isDataEmpty ? (
        <Warning msg="Data Tidak Ditemukan" />
      ) : error ? (
        dangerType === "basic" ? (
          <Danger msg={errorMsg || "An error occurred"} />
        ) : (
          <DangerText msg={errorMsg || "An error occurred"} />
        )
      ) : (
        data.map((item, index) => (
          <React.Fragment key={index}>{renderItem(item, index)}</React.Fragment>
        ))
      )}
    </>
  );
};

export default DataList;
