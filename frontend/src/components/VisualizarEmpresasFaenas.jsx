import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const VisualizarEmpresasFaenas = () => {
  const [faenas, setFaenas] = useState([]);
  const [nombreFaena, setNombreFaena] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [editando, setEditando] = useState(false);
  const [idFaenaEditar, setIdFaenaEditar] = useState(null);

  const empresaSeleccionada = JSON.parse(localStorage.getItem('empresaSeleccionada'));

  const cargarFaenas = async () => {
    try {
      const response = await fetch('http://localhost/PGM-PR/backend/obtener_faenas.php');
      const data = await response.json();
      const filtradas = data.filter(f => f.empresa_id === empresaSeleccionada.id_empresa);
      setFaenas(filtradas);
    } catch (error) {
      console.error('Error al cargar faenas:', error);
    }
  };

  useEffect(() => {
    cargarFaenas();
  }, [empresaSeleccionada?.id_empresa]);

  const handleAgregarFaena = async () => {
    if (!nombreFaena || !descripcion || !ubicacion) {
      Swal.fire('Campos incompletos', 'Por favor completa todos los campos.', 'warning');
      return;
    }

    const datos = {
      nombre_faena: nombreFaena,
      descripcion,
      ubicacion,
      id_empresa: empresaSeleccionada.id_empresa
    };

    const url = editando
      ? 'http://localhost/PGM-PR/backend/editar_faena.php'
      : 'http://localhost/PGM-PR/backend/crear_faena.php';

    if (editando) datos.id_faena = idFaenaEditar;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });
      const result = await response.json();

      if (result.success) {
        Swal.fire('Éxito', result.message, 'success');
        setNombreFaena('');
        setDescripcion('');
        setUbicacion('');
        setEditando(false);
        setIdFaenaEditar(null);
        cargarFaenas();
      } else {
        Swal.fire('Error', result.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error de conexión', 'No se pudo conectar con el servidor.', 'error');
    }
  };

  const iniciarEdicion = (faena) => {
    setEditando(true);
    setIdFaenaEditar(faena.id_faena);
    setNombreFaena(faena.nombre_faena);
    setDescripcion(faena.descripcion);
    setUbicacion(faena.ubicacion);
  };

  const eliminarFaena = async (id) => {
    const confirmacion = await Swal.fire({
      title: '¿Eliminar faena?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      try {
        const response = await fetch('http://localhost/PGM-PR/backend/eliminar_faena.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_faena: id })
        });
        const result = await response.json();

        if (result.success) {
          Swal.fire('Eliminado', result.message, 'success');
          cargarFaenas();
        } else {
          Swal.fire('Error', result.message, 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo conectar con el servidor.', 'error');
      }
    }
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '1rem' }}>Gestión de Faenas por Empresa</h2>

      <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{editando ? 'Editar Faena' : 'Agregar Nueva Faena'}</h3>

        <input value={nombreFaena} onChange={(e) => setNombreFaena(e.target.value)} placeholder="Nombre de la Faena" style={{ ...estiloInput }} />
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción de la Faena" style={{ ...estiloInput }} />
        <input value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} placeholder="Ubicación" style={{ ...estiloInput }} />
        <button onClick={handleAgregarFaena} style={estiloBoton}>
          {editando ? 'Actualizar Faena' : <><FaPlus style={{ marginRight: '6px' }} /> Agregar Faena</>}
        </button>
      </div>

      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{empresaSeleccionada?.nombre_empresa}</h3>

        {faenas.length === 0 ? (
          <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>No hay faenas registradas</p>
        ) : (
          faenas.map((faena) => (
            <div key={faena.id_faena} style={estiloTarjeta}>
              <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{faena.nombre_faena}</p>
              <p style={{ fontStyle: 'italic' }}>{faena.descripcion}</p>
              <p><FaMapMarkerAlt style={{ marginRight: '6px', color: '#4d6fff' }} /> {faena.ubicacion}</p>
              <div>
                <FaEdit onClick={() => iniciarEdicion(faena)} style={{ cursor: 'pointer', marginRight: '10px', color: '#4d6fff' }} />
                <FaTrash onClick={() => eliminarFaena(faena.id_faena)} style={{ cursor: 'pointer', color: 'crimson' }} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const estiloInput = {
  width: '100%',
  padding: '0.6rem',
  marginBottom: '0.8rem',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const estiloBoton = {
  width: '100%',
  backgroundColor: '#4d6fff',
  color: 'white',
  padding: '0.7rem',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const estiloTarjeta = {
  padding: '1rem',
  borderRadius: '10px',
  backgroundColor: '#f8f8f8',
  marginBottom: '1rem',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3rem'
};

export default VisualizarEmpresasFaenas;
