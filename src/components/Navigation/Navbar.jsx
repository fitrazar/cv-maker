/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Dock from "./Dock";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              Laravel Tools
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Beranda</a>
              </li>
              <li>
                <a>Laravel</a>
                <ul className="p-2">
                  <li>
                    <Link to="/generate/controller">Controller</Link>
                  </li>
                  <li>
                    <Link to="/generate/model">Model</Link>
                  </li>
                  <li>
                    <Link to="/generate/view">View</Link>
                  </li>
                </ul>
              </li>
              <li>
                <a>Kontak</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Laravel Tools</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Beranda</a>
            </li>
            <li>
              <details>
                <summary>Generate</summary>
                <ul className="p-2">
                  <li>
                    <Link to="/generate/controller">Controller</Link>
                  </li>
                  <li>
                    <Link to="/generate/model">Model</Link>
                  </li>
                  <li>
                    <Link to="/generate/view">View</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Kontak</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Dokumentasi</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
