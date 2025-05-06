// ProtocoloSeguridadAdmin.jsx
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FaUpload, FaDownload, FaFilePdf, FaTrash } from 'react-icons/fa';

const ProtocoloSeguridadAdmin = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [protocolos, setProtocolos] = useState([]);

  const subirProtocolo = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('subido_por', 1); // Simulado
    formData.append('archivo_pdf', archivo);

    try {
      const response = await fetch('http://localhost/PGM-PR/backend/subir_protocolo.php', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire('¡Listo!', result.message, 'success');
        setTitulo('');
        setDescripcion('');
        setArchivo(null);
        cargarProtocolos();
      } else {
        Swal.fire('Error', result.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'No se pudo conectar al servidor.', 'error');
    }
  };

  const cargarProtocolos = async () => {
    try {
      const response = await fetch('http://localhost/PGM-PR/backend/obtener_protocolos.php');
      const data = await response.json();
      if (Array.isArray(data)) {
        setProtocolos(data);
      }
    } catch (error) {
      console.error('Error al cargar protocolos:', error);
    }
  };

  const eliminarProtocolo = async (id_protocolo) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este protocolo se eliminará permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch('http://localhost/PGM-PR/backend/eliminar_protocolo.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_protocolo }), // Envío correcto
        });

        const result = await res.json();
        if (result.success) {
          Swal.fire('Eliminado', result.message, 'success');
          cargarProtocolos();
        } else {
          Swal.fire('Error', result.message, 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo conectar al servidor', 'error');
      }
    }
  };

  useEffect(() => {
    cargarProtocolos();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Subir Protocolo de Seguridad</h2>
      <form onSubmit={subirProtocolo} style={styles.form}>
        <input
          type="text"
          placeholder="Título del protocolo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={styles.textarea}
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setArchivo(e.target.files[0])}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          <FaUpload style={{ marginRight: '6px' }} />
          Subir Protocolo
        </button>
      </form>

      <h3 style={styles.subtitle}>Protocolos Subidos</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Título</th>
            <th style={styles.th}>Fecha</th>
            <th style={styles.th}>Archivo</th>
            <th style={styles.th}>Descargar</th>
            <th style={styles.th}>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {protocolos.map((p, i) => (
            <tr key={i}>
              <td>{p.titulo}</td>
              <td>{p.fecha_subida}</td>
              <td><FaFilePdf style={{ color: 'crimson' }} /></td>
              <td>
                <a
                  href={`http://localhost/PGM-PR/backend/protocolos/${p.archivo_pdf}`}
                  download
                  style={styles.download}
                  title="Descargar PDF"
                >
                  <FaDownload />
                </a>
              </td>
              <td>
                <button onClick={() => eliminarProtocolo(p.id_protocolo)} style={styles.deleteBtn}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  title: {
    marginBottom: '1rem',
    fontSize: '1.6rem',
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: '2rem',
    marginBottom: '1rem',
    fontSize: '1.3rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.7rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '0.9rem',
  },
  textarea: {
    padding: '0.7rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    minHeight: '80px',
    fontSize: '0.9rem',
  },
  button: {
    backgroundColor: '#4d6fff',
    color: 'white',
    padding: '0.5rem 1.5rem',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    marginTop: '1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    transition: 'all 0.3s ease',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.95rem',
  },
  th: {
    backgroundColor: '#f1a300',
    color: 'white',
    textAlign: 'left',
    padding: '10px',
  },
  download: {
    color: '#4d6fff',
    fontSize: '1.1rem',
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: 'crimson',
    fontSize: '1.1rem',
    cursor: 'pointer',
  }
};

export default ProtocoloSeguridadAdmin;
