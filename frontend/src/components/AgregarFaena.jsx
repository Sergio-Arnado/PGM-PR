
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AgregarFaena = ({ onFaenaAgregada }) => {
  const [nombreFaena, setNombreFaena] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  const empresaSeleccionada = JSON.parse(localStorage.getItem('empresaSeleccionada'));
  const idEmpresa = empresaSeleccionada?.id_empresa;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreFaena || !descripcion || !ubicacion || !idEmpresa) {
      Swal.fire('Faltan datos', 'Por favor completa todos los campos.', 'warning');
      return;
    }

    try {
      const response = await fetch('http://localhost/PGM-PR/backend/crear_faena.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre_faena: nombreFaena,
          descripcion,
          ubicacion,
          id_empresa: idEmpresa,
        }),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire('Éxito', result.message, 'success');
        setNombreFaena('');
        setDescripcion('');
        setUbicacion('');
        if (onFaenaAgregada) onFaenaAgregada(); // ✅ se llama solo si fue pasada como prop
      } else {
        Swal.fire('Error', result.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error de conexión', 'No se pudo conectar con el servidor.', 'error');
    }
  };

  return (
    <div style={styles.contenedor}>
      <h2 style={styles.titulo}>Agregar Nueva Faena</h2>
      <form onSubmit={handleSubmit} style={styles.formulario}>
        <input
          type="text"
          placeholder="Nombre de la Faena"
          value={nombreFaena}
          onChange={(e) => setNombreFaena(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Descripción de la Faena"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={styles.textarea}
        />
        <input
          type="text"
          placeholder="Ubicación de la Faena"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.boton}>Guardar Faena</button>
      </form>
    </div>
  );
};

const styles = {
  contenedor: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  titulo: {
    fontSize: '1.6rem',
    marginBottom: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.8rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  textarea: {
    padding: '0.8rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    resize: 'vertical',
  },
  boton: {
    backgroundColor: '#4d6fff',
    color: 'white',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

export default AgregarFaena;
