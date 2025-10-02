import React from "react";
import { Link } from "react-router";

const ErrorBoundary = () => {
  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Woops!</h1>
          <p className="py-6">Terjadi kesalahan saat mengakses menu ini</p>
          <Link className="btn btn-primary mr-5" to="/">
            Beranda
          </Link>
          <button className="btn btn-info" onClick={reload}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
