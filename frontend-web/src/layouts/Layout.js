import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <div className="content-wrapper">
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
