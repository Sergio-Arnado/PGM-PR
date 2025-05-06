import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoFaenasPorEmpresa = ({ labels = [], data = [] }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Faenas por Empresa',
        data: data,
        backgroundColor: '#4d6fff',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Cantidad de Faenas por Empresa' },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default GraficoFaenasPorEmpresa;
