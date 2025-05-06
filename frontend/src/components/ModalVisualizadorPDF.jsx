import React from 'react';

const ModalVisualizadorPDF = ({ visible, urlPDF, cerrarModal }) => {
  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={cerrarModal} style={styles.cerrar}>X</button>
        <iframe
          src={urlPDF}
          title="Visualizador PDF"
          style={styles.iframe}
        />
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  modal: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '10px',
    width: '80%',
    height: '80%',
    position: 'relative',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  cerrar: {
    position: 'absolute',
    top: 10,
    right: 10,
    background: 'crimson',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  }
};

export default ModalVisualizadorPDF;
