// LabCard.js

import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import { MapPin } from "react-feather";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const AlatCard = ({ item }) => {
  const isLoading = !item; // You can customize this condition based on your loading logic

  return (
    <Card
      style={{
        width: "14rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        transition:
          "transform 0.3s, border-color 0.3s, box-shadow 0.3s, background-color 0.3s",
        color: "black", // Set default text color
      }}
      className="mx-auto"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "red";
        e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
        e.currentTarget.style.backgroundColor = "rgba(220, 53, 69, 1)";
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.color = "white"; // Set text color to white on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.backgroundColor = "";
        e.currentTarget.style.transform = "";
        e.currentTarget.style.color = "black"; // Reset text color on mouse leave
      }}
    >
      {isLoading ? (
        <Skeleton height={200} />
      ) : (
        <>
          <CardImg
            src={item.images[0].url}
            alt={item.nama}
            top
            width="100%"
            height="auto"
            style={{ objectFit: "cover" }}
          />
          <CardBody>
            <CardTitle tag="h5">{item.nama}</CardTitle>
            <CardSubtitle className="mb-2"
                  tag="h6"
                  style={{ fontSize: "14px", color: "#274380" }}> {item.laboratorium || ""}</CardSubtitle>
            {item.lokasi_kawasan ? (
              <>
                <CardSubtitle
                  className="mb-2"
                  tag="h6"
                  style={{ fontSize: "12px", color: "#274380" }}
                >
                  <MapPin size={14} color="#274380" className="me-2" />
                  {item.lokasi_kawasan}
                </CardSubtitle>
              </>
            ) : null}
            <CardText className="mb-2" style={{ fontSize: "12px" }}>
              {item.spesifikasi || ""}
            </CardText>
          </CardBody>
        </>
      )}
    </Card>
  );
};

export default AlatCard;
