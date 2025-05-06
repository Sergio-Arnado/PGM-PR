// ✅ Componente GraficoTrabajadoresPorFaena.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// 👇 Registro necesario para que funcione Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const GraficoTrabajadoresPorFaena = ({ labels, data }) => {
  const config = {
    labels,
    datasets: [
      {
        label: 'Trabajadores por Faena',
        data,
        backgroundColor: [
          '#4d6fff',
          '#ff6384',
          '#ffcd56',
          '#36a2eb',
          '#9966ff',
          '#4bc0c0',
          '#f67019'
        ],
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  return (
    <div style={{ background: '#fff', padding: '1rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '1rem' }}>
      <h4 style={{ marginBottom: '1rem', color: '#4d6fff' }}>Distribución de Trabajadores por Faena</h4>
      <Doughnut data={config} />
    </div>
  );
};

export default GraficoTrabajadoresPorFaena;
