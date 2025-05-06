import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const VisualizarLogs = () => {
  const [logs, setLogs] = useState('');

  const obtenerLogs = async () => {
    try {
      const response = await fetch('http://localhost/PGM-PR/backend/obtener_logs.php');
      const data = await response.text();
      setLogs(data);
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar los logs', 'error');
    }
  };

  const limpiarLogs = async () => {
    const confirmar = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará todos los registros de logs del sistema.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirmar.isConfirmed) {
      try {
        const response = await fetch('http://localhost/PGM-PR/backend/limpiar_logs.php');
        const data = await response.text();
        if (data.trim() === 'success') {
          Swal.fire('Listo', 'Logs limpiados correctamente', 'success');
          setLogs('');
        } else {
          Swal.fire('Error', 'No se pudieron limpiar los logs', 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo conectar al servidor', 'error');
      }
    }
  };

  const colorearLinea = (linea) => {
    if (linea.includes('ERROR')) {
      return <span style={{ color: 'crimson', fontWeight: 'bold' }}>{linea}</span>;
    }
    if (linea.includes('ADVERTENCIA')) {
      return <span style={{ color: 'orange' }}>{linea}</span>;
    }
    if (linea.includes('ÉXITO')) {
      return <span style={{ color: 'green' }}>{linea}</span>;
    }
    return <span>{linea}</span>;
  };

  useEffect(() => {
    obtenerLogs();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Logs del Sistema</h2>
      <div style={styles.buttonGroup}>
        <button onClick={obtenerLogs} style={styles.reloadBtn}>🔄 Recargar</button>
        <button onClick={limpiarLogs} style={styles.clearBtn}>🗑️ Limpiar Logs</button>
      </div>
      <div style={styles.logBox}>
        <pre style={styles.pre}>
          {logs.split('\n').map((linea, index) => (
            <div key={index}>{colorearLinea(linea)}</div>
          ))}
        </pre>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
  },
  reloadBtn: {
    backgroundColor: '#4d6fff',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  clearBtn: {
    backgroundColor: 'crimson',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  logBox: {
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '5px',
    height: '300px',
    overflowY: 'auto',
    fontFamily: 'monospace',
    fontSize: '0.95rem',
    border: '1px solid #ccc',
  },
  pre: {
    margin: 0,
  },
};

export default VisualizarLogs;
