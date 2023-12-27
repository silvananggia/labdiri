
import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from "reactstrap";

const Home = () => {

  const { user: currentUser } = useSelector((state) => state.auth.user);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }


  return (
    <div>
      <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Name:</strong> {currentUser.name}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.role}
      </ul>
    </div>
    </div>
  );
};

export default Home;
