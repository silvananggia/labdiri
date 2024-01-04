import React, { useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardBody,
} from "reactstrap";

const BarChart = ({ data }) => {
  const { skin } = useContext(ThemeColors),
    labelColor = skin === "dark" ? "#b4b7bd" : "#6e6b7b",
    gridLineColor = "rgba(200, 200, 200, 0.2)",
    successColorShade = "#28dac6";

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Generate an array of colors based on the number of data points
  const colors = Array.from({ length: data.length }, (_, index) => {
    // You can replace this with any logic to generate colors dynamically
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.7)`;
  });

  const chartOptions = {
    chart: {
      toolbar: { show: false },
      stacked: true,
    },
    colors: colors,
    xaxis: {
      categories: data.map((item) => item.lab_name || " Tidak Terdaftar di Laboratorium"),
      labels: {
        style: {
          colors: labelColor,
        },
      },
    },
    yaxis: {
      min: 0,
      labels: {
        style: {
          colors: labelColor,
        },
      },
    },
    grid: {
      borderColor: gridLineColor,
    },
    legend: {
      show: false,
    },
  };

  const series = [
    {
      name: "Total Peralatan",
      data: data.map((item) => item.total_peralatan),
    },
  ];

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        <div>
          <CardTitle className="mb-75" tag="h4">
            Statistik
          </CardTitle>
          <CardSubtitle>Jumlah Alat Pada Laboratorium</CardSubtitle>
        </div>
      </CardHeader>

      <CardBody>
        <div style={{ height: "400px" }}>
          <ReactApexChart
            options={chartOptions}
            series={series}
            type="bar"
            height="100%"
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default BarChart;
