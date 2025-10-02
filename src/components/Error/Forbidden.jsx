import React from "react";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Forbidden</h1>
          <p className="py-6">
            Anda tidak memiliki akses untuk memasuki menu ini
          </p>
          <Link className="btn btn-primary" to="/">
            Beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
