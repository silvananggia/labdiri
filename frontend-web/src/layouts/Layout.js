import React from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <div>
        <div>
          <Navbar />

          <div>
            <div>
              <main>{children}</main>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
