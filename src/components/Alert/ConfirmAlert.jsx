import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const ConfirmAlert = ({ title, message, onConfirm, onCancel }) => {
  const showConfirm = () => {
    confirmAlert({
      title: title,
      message: message,
      buttons: [
        {
          label: "Ya",
          onClick: onConfirm,
        },
        {
          label: "Tidak",
          onClick: onCancel || (() => {}),
        },
      ],
    });
  };

  showConfirm();
};

export default ConfirmAlert;
