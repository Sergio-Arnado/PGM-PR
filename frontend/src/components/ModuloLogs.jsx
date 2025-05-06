
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ModuloLogs = () => {
  const [logs, setLogs] = useState('');

  const obtenerLogs = async () => {
    try {
      const res = await fetch('http://localhost/PGM-PR/backend/obtener_logs.php');
      const texto = await res.text();
      setLogs(texto);
    } catch (error) {
      console.error('Error al obtener logs:', error);
      setLogs('No se pudo cargar el contenido del log.');
    }
  };

  const limpiarLogs = async () => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará todo el contenido del log.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, limpiar',
      cancelButtonText: 'Cancelar',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch('http://localhost/PGM-PR/backend/limpiar_logs.php', {
          method: 'POST',
        });
        const result = await res.json();
        if (result.success) {
          Swal.fire('¡Listo!', result.message, 'success');
          obtenerLogs();
        } else {
          Swal.fire('Error', result.message, 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo conectar con el servidor.', 'error');
      }
    }
  };

  useEffect(() => {
    obtenerLogs();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Registro de Actividades</h2>
      <div style={styles.logBox}>
        <pre style={styles.logText}>{logs}</pre>
      </div>
      <div style={styles.buttons}>
        <a
          href="http://localhost/PGM-PR/backend/logs_empresas.txt"
          download
          style={styles.downloadBtn}
        >
          Descargar Log
        </a>
        <button onClick={limpiarLogs} style={styles.clearBtn}>
          Limpiar Log
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  logBox: {
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '5px',
    maxHeight: '400px',
    overflowY: 'auto',
    border: '1px solid #ccc',
    marginBottom: '1rem',
  },
  logText: {
    whiteSpace: 'pre-wrap',
    fontFamily: 'monospace',
    fontSize: '0.9rem',
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
  },
  downloadBtn: {
    backgroundColor: '#4d6fff',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  clearBtn: {
    backgroundColor: 'crimson',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
  },
};

export default ModuloLogs;
