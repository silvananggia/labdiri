import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { AlertCircle } from "react-feather";

const NotFoundPage = () => {
  return (
    <div className="text-center mt-5">
      <AlertCircle size={80} color="#f86c6b" />
      <h1 className="mt-3">404 - Page Not Found</h1>
      <p className="lead">Sorry, the page you are looking for might be in another castle.</p>
      <Link to="/">
        <Button color="primary">Go Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
