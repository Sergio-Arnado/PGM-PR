import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaTrash, FaDownload } from 'react-icons/fa';

const LogsEmpresas = () => {
  const [logContenido, setLogContenido] = useState('');

  const cargarLogs = async () => {
    try {
      const res = await fetch('http://localhost/PGM-PR/backend/obtener_logs.php');
      const data = await res.text(); // 👈 importante: es texto plano
      setLogContenido(data);
    } catch (error) {
      Swal.fire('Error', 'No se pudo cargar el archivo de logs', 'error');
    }
  };

  const limpiarLogs = async () => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se eliminarán todos los registros del log',
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
          Swal.fire('Listo', result.message, 'success');
          setLogContenido('');
        } else {
          Swal.fire('Error', result.message, 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo conectar al servidor', 'error');
      }
    }
  };

  useEffect(() => {
    cargarLogs();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Logs de Registro de Empresas</h2>
      <div style={styles.buttonContainer}>
        <button onClick={limpiarLogs} style={styles.deleteBtn}>
          <FaTrash style={{ marginRight: '6px' }} /> Limpiar Logs
        </button>
        <a
          href="http://localhost/PGM-PR/backend/logs_empresas.txt"
          download
          style={styles.downloadBtn}
        >
          <FaDownload style={{ marginRight: '6px' }} /> Descargar Logs
        </a>
      </div>
      <pre style={styles.logBox}>{logContenido || 'No hay registros por mostrar.'}</pre>
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    gap: '1rem',
  },
  deleteBtn: {
    backgroundColor: 'crimson',
    color: 'white',
    padding: '0.6rem 1.2rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  downloadBtn: {
    backgroundColor: '#4d6fff',
    color: 'white',
    padding: '0.6rem 1.2rem',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  logBox: {
    backgroundColor: '#f7f7f7',
    padding: '1rem',
    borderRadius: '5px',
    minHeight: '200px',
    whiteSpace: 'pre-wrap',
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    overflowX: 'auto',
  },
};

export default LogsEmpresas;
