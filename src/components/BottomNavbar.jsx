import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegUser, FaUserGraduate, FaUserTie } from "react-icons/fa6";
import { PiProjectorScreen } from "react-icons/pi";
import { Link } from "react-router";

const BottomNavbar = () => {
  return (
    <div>
      <div className="dock bg-gradient-to-r from-green-100 to-green-200 text-base-100 rounded-t-4xl">
        <Link to="/">
          <AiOutlineHome className="size-[1.8em]" />
        </Link>

        <Link to="/absen">
          <FaRegUser className="size-[1.8em]" />
        </Link>

        <Link>
          <FaUserGraduate className="size-[1.8em]" />
        </Link>

        <Link>
          <PiProjectorScreen className="size-[1.8em]" />
        </Link>
        <Link>
          <FaUserTie className="size-[1.8em]" />
        </Link>
      </div>
    </div>
  );
};

export default BottomNavbar;
