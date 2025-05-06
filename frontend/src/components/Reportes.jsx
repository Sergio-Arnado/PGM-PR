import React, { useEffect, useState } from 'react';
import { FaDownload, FaFilePdf, FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';
import ModalVisualizadorPDF from './ModalVisualizadorPDF';

const Reportes = () => {
  const [reportes, setReportes] = useState([]);
  const [filtros, setFiltros] = useState({
    titulo: '',
    autor: '',
    fecha: '',
    faena: ''
  });
  const [mostrarModal, setMostrarModal] = useState(false);
  const [urlPDF, setUrlPDF] = useState('');

  const obtenerReportes = async () => {
    try {
      const response = await fetch('http://localhost/PGM-PR/backend/obtener_reportes.php');
      const data = await response.json();
      if (Array.isArray(data)) {
        setReportes(data);
      } else {
        Swal.fire('Error', 'No se pudieron cargar los reportes', 'error');
      }
    } catch (error) {
      console.error('Error al obtener reportes:', error);
      Swal.fire('Error', 'Error de conexión con el servidor', 'error');
    }
  };

  useEffect(() => {
    obtenerReportes();
  }, []);

  const abrirModal = (archivo) => {
    setUrlPDF(`http://localhost/PGM-PR/backend/reportes/${archivo}`);
    setMostrarModal(true);
  };

  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const filtrarReportes = () => {
    return reportes.filter((r) => {
      const autor = (r.nombres + ' ' + r.apellidos).toLowerCase();
      return (
        r.titulo.toLowerCase().includes(filtros.titulo.toLowerCase()) &&
        autor.includes(filtros.autor.toLowerCase()) &&
        r.fecha_creacion.includes(filtros.fecha) &&
        r.nombre_faena.toLowerCase().includes(filtros.faena.toLowerCase())
      );
    });
  };

  const reportesFiltrados = filtrarReportes();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Reportes Subidos</h2>

      <div style={styles.filtros}>
        <div style={styles.searchGroup}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar por título"
            name="titulo"
            value={filtros.titulo}
            onChange={handleFiltroChange}
            style={styles.input}
          />
        </div>
        <input
          type="text"
          placeholder="Buscar por autor"
          name="autor"
          value={filtros.autor}
          onChange={handleFiltroChange}
          style={styles.input}
        />
        <input
          type="date"
          name="fecha"
          value={filtros.fecha}
          onChange={handleFiltroChange}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Buscar por faena"
          name="faena"
          value={filtros.faena}
          onChange={handleFiltroChange}
          style={styles.input}
        />
      </div>

      {reportesFiltrados.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Título</th>
              <th style={styles.th}>Autor</th>
              <th style={styles.th}>Fecha</th>
              <th style={styles.th}>Faena</th>
              <th style={styles.th}>Ver</th>
              <th style={styles.th}>Descargar</th>
            </tr>
          </thead>
          <tbody>
            {reportesFiltrados.map((r, index) => (
              <tr key={index} style={styles.row}>
                <td>{r.titulo}</td>
                <td>{r.nombres} {r.apellidos}</td>
                <td>{r.fecha_creacion}</td>
                <td>{r.nombre_faena}</td>
                <td>
                  <button onClick={() => abrirModal(r.archivo_pdf)} style={styles.verBtn}>
                    <FaFilePdf style={{ marginRight: '6px' }} />
                    Ver PDF
                  </button>
                </td>
                <td>
                  <a
                    href={`http://localhost/PGM-PR/backend/reportes/${r.archivo_pdf}`}
                    download
                    style={styles.download}
                    title="Descargar PDF"
                  >
                    <FaDownload />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={styles.sinResultados}>No se encontraron reportes con los filtros aplicados.</p>
      )}

      <ModalVisualizadorPDF
        visible={mostrarModal}
        urlPDF={urlPDF}
        cerrarModal={() => setMostrarModal(false)}
      />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  title: {
    marginBottom: '1rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  filtros: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1.2rem',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  searchGroup: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: '10px',
    color: '#aaa',
    fontSize: '0.9rem',
  },
  input: {
    padding: '0.5rem 0.5rem 0.5rem 2rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '0.9rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.95rem',
  },
  th: {
    textAlign: 'left',
    backgroundColor: '#f1a300',
    color: 'white',
    padding: '10px',
  },
  row: {
    borderBottom: '1px solid #ccc',
    transition: 'background 0.2s ease',
  },
  download: {
    color: '#4d6fff',
    fontSize: '1.1rem',
  },
  verBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'crimson',
    cursor: 'pointer',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  sinResultados: {
    textAlign: 'center',
    marginTop: '1rem',
    fontStyle: 'italic',
    color: '#999',
  }
};

export default Reportes;
