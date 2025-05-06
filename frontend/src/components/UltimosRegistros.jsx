import React from 'react';

const UltimosRegistros = ({ registros = [] }) => {
  return (
    <div style={styles.container}>
      <h3 style={styles.titulo}>Últimos Registros</h3>

      <table style={styles.tabla}>
        <thead>
          <tr style={styles.filaCabecera}>
            <th style={styles.th}>Tipo</th>
            <th style={styles.th}>Descripción</th>
            <th style={styles.th}>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {registros.length === 0 ? (
            <tr>
              <td colSpan="3" style={styles.sinDatos}>No hay registros recientes aún.</td>
            </tr>
          ) : (
            registros.map((item, index) => (
              <tr key={index}>
                <td style={styles.td}>{item.tipo}</td>
                <td style={styles.td}>{item.descripcion}</td>
                <td style={styles.td}>{item.fecha}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginTop: '2rem',
  },
  titulo: {
    marginBottom: '1rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#4d6fff',
  },
  tabla: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#4d6fff',
    color: 'white',
    padding: '0.75rem',
    textAlign: 'left',
    fontWeight: 'bold',
    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px',
  },
  td: {
    padding: '0.75rem',
    borderBottom: '1px solid #ddd',
  },
  filaCabecera: {
    borderBottom: '2px solid #4d6fff',
  },
  sinDatos: {
    textAlign: 'center',
    padding: '1rem',
    fontStyle: 'italic',
    color: '#999',
  },
};

export default UltimosRegistros;
