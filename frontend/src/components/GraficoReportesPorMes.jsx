// GraficoReportesPorMes.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

const GraficoReportesPorMes = () => {
  const data = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Reportes 2025',
        data: [0, 1, 3, 0, 0, 2, 1, 0, 0, 4, 0, 0], // ← Reemplazar por datos reales después
        fill: true,
        borderColor: '#4d6fff',
        backgroundColor: 'rgba(77, 111, 255, 0.2)',
        tension: 0.4,
        pointBackgroundColor: '#4d6fff',
        pointRadius: 5
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div style={{ background: '#fff', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
      <h4 style={{ marginBottom: '1rem' }}>📈 Reportes por Mes</h4>
      <Line data={data} options={options} />
    </div>
  );
};

export default GraficoReportesPorMes;
