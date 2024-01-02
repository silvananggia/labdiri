import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { AlertCircle } from "react-feather";

const NotFoundPage = () => {
  return (
    <div className="text-center mt-5">
      <AlertCircle size={80} color="#f86c6b" />
      <h1 className="mt-3">404 - Halaman Tidak Ditemukan</h1>
      <p className="lead">Maaf, halaman yang anda cari tidak ditemukan.</p>
      <Link to="/">
        <Button color="primary">Ke Halaman Utama</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
