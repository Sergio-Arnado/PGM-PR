import React, { useEffect, useState } from 'react';

const VisualizarFaenas = () => {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    const obtenerEmpresasYFaenas = async () => {
      try {
        const res = await fetch('http://localhost/PGM-PR/backend/obtener_empresas_faenas.php');
        const data = await res.json();
        if (Array.isArray(data)) {
          setEmpresas(data);
        } else {
          console.error("Formato inválido desde backend");
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    obtenerEmpresasYFaenas();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Faenas por Empresa</h2>
      <div style={styles.cardContainer}>
        {empresas.map((empresa, i) => (
          <div key={i} style={styles.empresaCard}>
            <h3 style={styles.empresaNombre}>{empresa.nombre_empresa}</h3>
            <p style={styles.info}><strong>RUT:</strong> {empresa.rut_empresa}</p>
            <p style={styles.info}><strong>Dirección:</strong> {empresa.direccion}</p>
            <p style={styles.info}><strong>Teléfono:</strong> {empresa.telefono}</p>
            <p style={styles.info}><strong>Correo:</strong> {empresa.correo_empresa}</p>

            <h4 style={styles.faenasTitle}>Faenas asociadas:</h4>
            {empresa.faenas && empresa.faenas.length > 0 ? (
              <ul style={styles.faenaLista}>
                {empresa.faenas.map((faena, idx) => (
                  <li key={idx} style={styles.faenaItem}>
                    <strong>{faena.nombre_faena}</strong> - {faena.ubicacion}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={styles.sinFaenas}>Esta empresa aún no tiene faenas registradas.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '2rem',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    fontWeight: 'bold',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
  },
  empresaCard: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    flex: '1 1 320px',
    minWidth: '300px',
  },
  empresaNombre: {
    fontSize: '1.3rem',
    marginBottom: '0.5rem',
    color: '#4d6fff',
  },
  info: {
    margin: '0.3rem 0',
    fontSize: '0.9rem',
  },
  faenasTitle: {
    marginTop: '1rem',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  faenaLista: {
    listStyle: 'none',
    paddingLeft: 0,
    marginTop: '0.5rem',
  },
  faenaItem: {
    background: '#f7f7f7',
    padding: '0.4rem 0.6rem',
    marginBottom: '0.3rem',
    borderRadius: '5px',
    fontSize: '0.9rem',
  },
  sinFaenas: {
    fontStyle: 'italic',
    color: '#777',
    marginTop: '0.5rem',
  },
};

export default VisualizarFaenas;
