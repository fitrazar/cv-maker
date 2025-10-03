import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="hero flex-1">
        <div className="hero-content text-center py-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
              Buat <span className="text-primary">CV Profesional</span> Dalam
              Hitungan Menit
            </h1>
            <p className="py-6 text-gray-600">
              Pilih template elegan, isi data, dan unduh CV Anda dengan mudah.
              Modern, responsif, dan gratis untuk digunakan!
            </p>
            <a href="#create" className="btn btn-primary btn-lg gap-2">
              Mulai Sekarang <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Templates Section */}
      <section id="templates" className="py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Pilih Template</h2>
          <p className="text-gray-500">Berbagai pilihan desain CV modern</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Template Card */}
          {["Template 1", "Template 2", "Template 3"].map((name, i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition rounded-2xl"
            >
              <figure className="h-56 bg-gray-100">
                <img
                  src={`https://placehold.co/300x400?text=${name}`}
                  alt={name}
                  className="object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">{name}</h3>
                <p className="text-gray-500">
                  Desain {name.toLowerCase()} untuk CV Anda.
                </p>
                <div className="card-actions mt-4">
                  <Link
                    to="/template/1"
                    className="btn btn-outline btn-primary"
                  >
                    Gunakan
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="create"
        className="bg-gradient-to-r from-primary to-secondary text-white py-16"
      >
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Siap Membuat CV Anda?</h2>
          <p className="mb-6">
            Mulailah sekarang dan buat CV profesional yang akan menarik
            perhatian HRD.
          </p>
          <a
            href="/create"
            className="btn btn-lg bg-white text-primary font-semibold hover:bg-gray-200"
          >
            Buat CV Sekarang
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-6 bg-base-200 text-base-content">
        <aside>
          <p>© {new Date().getFullYear()} CV Maker. All rights reserved.</p>
        </aside>
      </footer>
    </div>
  );
};

export default Home;
