import React from 'react';
import ReactApexChart from 'react-apexcharts';


const PieChart = ({ data }) => {

    const filteredData = data.map(item => ({
        lokasi_kawasan: item.lokasi_kawasan || "Lokasi Tidak Terdaftar",
        total: item.total,
      }));
    
      const labels = filteredData.map(item => item.lokasi_kawasan);
      const values = filteredData.map(item => item.total);

  // Define chart options
  const options = {
    labels: labels,
  };

  // Define series data
  const series = values;

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        height="300"
      />
    </div>
  );
};

export default PieChart;
