/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Dock from "./Dock";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <>
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-md px-6">
        <div className="flex-1">
          <a className="text-2xl font-bold text-primary">CV Maker</a>
        </div>
        <div className="flex-none gap-2">
          <a href="#templates" className="btn btn-ghost">
            Templates
          </a>
          <a href="#create" className="btn btn-primary">
            Buat CV
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
