import React from "react";

const Hero = () => {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Selamat Datang</h1>
            <p className="mb-5">
              Kami menyediakan layanan auto generate mvc laravel dengan cepat
              dan mudah.
            </p>
            <button className="btn btn-primary">Mulai Sekarang</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
