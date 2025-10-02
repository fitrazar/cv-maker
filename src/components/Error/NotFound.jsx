import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Woops!</h1>
          <p className="py-6">Halaman yang kamu akses tidak ditemukan</p>
          <Link className="btn btn-primary mr-5" to="/">
            Beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
