import React from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { CiSquarePlus, CiStar } from "react-icons/ci";
import { IoWalletOutline } from "react-icons/io5";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { Link, useLocation } from "react-router";
import { LuNotepadText } from "react-icons/lu";
import { TbQrcode } from "react-icons/tb";
import { FaRegUser, FaUserGraduate } from "react-icons/fa6";
import { PiProjectorScreen } from "react-icons/pi";

const Dock = () => {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (to) => path === to;

  return (
    <>
      <div className="dock rounded-t-4xl">
        <Link to="/" className={isActive("/") ? "dock-active" : ""}>
          <AiOutlineHome size={24} className="font-medium" />
          <span className="dock-label">Beranda</span>
        </Link>

        <Link
          to="/generate"
          className={isActive("/generate") ? "dock-active" : ""}
        >
          <FaRegUser size={24} className="font-bold " />
          <span className="dock-label">Generate</span>
        </Link>

        <Link
          to="/contact"
          className={isActive("/contact") ? "dock-active" : ""}
        >
          <FaUserGraduate size={24} className="font-medium" />
          <span className="dock-label">Kontak</span>
        </Link>

        <Link
          to="/documentation"
          className={isActive("/documentation") ? "dock-active" : ""}
        >
          <PiProjectorScreen size={24} className="font-medium" />
          <span className="dock-label">Dokumentasi</span>
        </Link>
      </div>
    </>
  );
};

export default Dock;
