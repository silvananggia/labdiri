import React from "react";
import Layout from "./layouts/Layout";
import MyRouter from "./router/index.js";

function App() {
  return (
    <div>
      <Layout>
        <MyRouter />
      </Layout>

    </div>
  );
}

export default App;
