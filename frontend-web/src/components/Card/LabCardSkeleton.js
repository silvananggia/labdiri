// LabCardSkeleton.js

import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
const LabCardSkeleton = () => {
  return (
    <div
      style={{
        width: "18rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        padding: "20px", // Adjust padding based on your design preferences
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <Skeleton height={200} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Skeleton height={20} width={150} />
        <Skeleton height={14} width={100} />
        <Skeleton height={60} />
      </div>
    </div>
  );
};

export default LabCardSkeleton;
