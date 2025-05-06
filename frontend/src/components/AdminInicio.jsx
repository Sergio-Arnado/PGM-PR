import React, { useEffect, useState } from 'react';
import { FaUsers, FaFileAlt, FaBuilding } from 'react-icons/fa';
import UltimosRegistros from './UltimosRegistros';
import GraficoFaenasPorEmpresa from './GraficoFaenasPorEmpresa';
import GraficoReportesPorMes from './GraficoReportesPorMes';
import GraficoTrabajadoresPorFaena from './GraficoTrabajadoresPorFaena';

const AdminInicio = () => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const obtenerRegistros = async () => {
      try {
        const response = await fetch('http://localhost/PGM-PR/backend/ultimos_registros.php');
        const data = await response.json();
        setRegistros(data);
      } catch (error) {
        console.error('Error al obtener registros:', error);
        setRegistros([]);
      }
    };

    obtenerRegistros();
  }, []);

  // 🧪 Datos simulados por ahora
  const labelsEmpresas = ['Clinica Los Carrera', 'Inmobiliaria Los Pinos', 'Minera Quilpué'];
  const faenasPorEmpresa = [3, 5, 2];

  const labelsFaenas = ['Clinica Los Carrera', 'Inmobiliaria Los Pinos', 'Minera Quilpué'];
  const trabajadoresPorFaena = [10, 5, 8];

  return (
    <div>
      <h2 style={styles.titulo}>Panel General</h2>

      {/* ✅ Tarjetas resumidas */}
      <div style={styles.tarjetasContainer}>
        <div style={styles.tarjeta}>
          <div style={styles.icono}><FaUsers /></div>
          <h3 style={styles.tarjetaTitulo}>Usuarios Registrados</h3>
          <p style={styles.valor}>—</p>
        </div>
        <div style={styles.tarjeta}>
          <div style={styles.icono}><FaFileAlt /></div>
          <h3 style={styles.tarjetaTitulo}>Reportes Recientes</h3>
          <p style={styles.valor}>—</p>
        </div>
        <div style={styles.tarjeta}>
          <div style={styles.icono}><FaBuilding /></div>
          <h3 style={styles.tarjetaTitulo}>Faenas Activas</h3>
          <p style={styles.valor}>—</p>
        </div>
      </div>

      {/* ✅ Gráficos del Dashboard */}
      <div style={styles.graficosContainer}>
        <h3 style={styles.subtitulo}>Dashboard Analítico</h3>

        {/* 📊 Faenas por empresa */}
        <div style={styles.graficoBox}>
          <GraficoFaenasPorEmpresa labels={labelsEmpresas} data={faenasPorEmpresa} />
        </div>

        {/* 📈 Reportes por mes */}
        <div style={styles.graficoBox}>
          <GraficoReportesPorMes />
        </div>

        {/* 🍩 Trabajadores por faena */}
        <div style={styles.graficoBox}>
          <GraficoTrabajadoresPorFaena labels={labelsFaenas} data={trabajadoresPorFaena} />
        </div>
      </div>

      {/* 📄 Últimos registros */}
      <UltimosRegistros registros={registros} />
    </div>
  );
};

const styles = {
  titulo: {
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  tarjetasContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  tarjeta: {
    backgroundColor: '#4d6fff',
    color: 'white',
    padding: '1rem',
    borderRadius: '10px',
    width: '220px',
    boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.3rem',
  },
  tarjetaTitulo: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  valor: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  icono: {
    fontSize: '1.6rem',
  },
  graficosContainer: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
  },
  subtitulo: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  graficoBox: {
    width: '100%',
    maxWidth: '600px', // 📏 Máximo de 600px
    minWidth: '350px', // ✔️ Nunca más pequeño que esto
  }
};

export default AdminInicio;
