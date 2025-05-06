import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AgregarEmpresa = ({ onEmpresaAgregada }) => {
  const [empresa, setEmpresa] = useState({
    nombre_empresa: '',
    rut_empresa: '',
    direccion: '',
    telefono: '',
    correo_empresa: ''
  });

  const handleChange = (e) => {
    setEmpresa({ ...empresa, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost/PGM-PR/backend/crear_empresa.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(empresa)
      });

      const result = await res.json();
      if (result.success) {
        Swal.fire('¡Éxito!', result.message, 'success');
        setEmpresa({
          nombre_empresa: '',
          rut_empresa: '',
          direccion: '',
          telefono: '',
          correo_empresa: ''
        });

        // Notificar al componente padre que se agregó una empresa nueva
        if (typeof onEmpresaAgregada === 'function') {
          onEmpresaAgregada();
        }

      } else {
        Swal.fire('Error', result.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'No se pudo conectar al servidor.', 'error');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gestión de Empresas</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="nombre_empresa"
          placeholder="Nombre de la Empresa"
          value={empresa.nombre_empresa}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="rut_empresa"
          placeholder="RUT de la Empresa"
          value={empresa.rut_empresa}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={empresa.direccion}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={empresa.telefono}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="email"
          name="correo_empresa"
          placeholder="Correo Electrónico"
          value={empresa.correo_empresa}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Agregar Empresa
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '1rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  input: {
    padding: '0.7rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '0.7rem',
    backgroundColor: '#4d6fff',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default AgregarEmpresa;
