import React from "react";

const ModalDefault = ({ name, title = "", className = "", children }) => {
  return (
    <>
      <dialog
        id={name}
        className={"modal modal-bottom sm:modal-middle " + className}
      >
        <div className="modal-box w-full">
          <h3 className="font-bold text-lg">{title}</h3>
          {children}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost">Tutup</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Tutup</button>
        </form>
      </dialog>
    </>
  );
};

export default ModalDefault;
