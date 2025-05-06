
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import {
  FaEnvelope, FaLock, FaUser, FaBriefcase, FaIdBadge,
  FaSave, FaEdit, FaTrash, FaUserTag, FaToggleOn, FaFileExcel, FaMapMarkerAlt
} from 'react-icons/fa';
import * as XLSX from 'xlsx';

const schema = yup.object().shape({
  rut: yup.string().required('El RUT es obligatorio'),
  nombres: yup.string().required('El nombre es obligatorio'),
  apellidos: yup.string().required('El apellido es obligatorio'),
  correo: yup.string().email('Correo inválido').required('El correo es obligatorio'),
  contraseña: yup.string().required('La contraseña es obligatoria'),
  cargo: yup.string().required('El cargo es obligatorio'),
  id_faena: yup.string().required('Debes seleccionar una faena'),
  id_perfil: yup.string().required('Debes seleccionar un perfil'),
  activo: yup.string().required('Debes indicar si el usuario está activo'),
});

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [faenas, setFaenas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 5;

  const {
    register, handleSubmit, reset, setValue,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const cargarUsuarios = async () => {
    try {
      const response = await fetch('http://localhost/PGM-PR/backend/obtener_usuarios.php');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const cargarFaenas = async () => {
    try {
      const response = await fetch('http://localhost/PGM-PR/backend/obtener_faenas.php');
      const data = await response.json();
      setFaenas(data);
    } catch (error) {
      console.error('Error al cargar faenas:', error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
    cargarFaenas();
  }, []);

  const onSubmit = async (data) => {
    const url = modoEdicion
      ? 'http://localhost/PGM-PR/backend/editar_usuario.php'
      : 'http://localhost/PGM-PR/backend/crear_usuario.php';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: modoEdicion ? 'Usuario actualizado' : 'Usuario creado correctamente',
        });
        reset();
        setModoEdicion(false);
        cargarUsuarios();
      } else {
        Swal.fire({ icon: 'error', title: 'Error', text: result.message });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error de conexión', text: 'No se pudo conectar con el servidor.' });
    }
  };

  const eliminarUsuario = async (rut) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el usuario permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirmacion.isConfirmed) {
      try {
        const response = await fetch('http://localhost/PGM-PR/backend/eliminar_usuario.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rut }),
        });

        const result = await response.json();

        if (result.success) {
          Swal.fire('Eliminado', result.message, 'success');
          cargarUsuarios();
        } else {
          Swal.fire('Error', result.message, 'error');
        }
      } catch (error) {
        Swal.fire('Error de conexión', 'No se pudo conectar al servidor.', 'error');
      }
    }
  };

  const editarUsuario = (usuario) => {
    setModoEdicion(true);
    Object.keys(usuario).forEach((key) => {
      if (usuario[key] !== null) {
        setValue(key, usuario[key]);
      }
    });
  };

  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(usuarios);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
    XLSX.writeFile(workbook, 'usuarios.xlsx');
  };

  const indiceInicio = (paginaActual - 1) * usuariosPorPagina;
  const indiceFin = indiceInicio + usuariosPorPagina;
  const usuariosPagina = usuarios.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  return (
    <div style={styles.contenedor}>
      <h2 style={styles.titulo}>{modoEdicion ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.formulario}>
        <div style={styles.inputGroup}><FaIdBadge style={styles.icono} />
          <input placeholder="RUT" {...register('rut')} style={styles.input} disabled={modoEdicion} /></div>
        <p style={styles.error}>{errors.rut?.message}</p>
        <div style={styles.inputGroup}><FaUser style={styles.icono} />
          <input placeholder="Nombres" {...register('nombres')} style={styles.input} /></div>
        <p style={styles.error}>{errors.nombres?.message}</p>
        <div style={styles.inputGroup}><FaUser style={styles.icono} />
          <input placeholder="Apellidos" {...register('apellidos')} style={styles.input} /></div>
        <p style={styles.error}>{errors.apellidos?.message}</p>
        <div style={styles.inputGroup}><FaEnvelope style={styles.icono} />
          <input placeholder="Correo electrónico" {...register('correo')} style={styles.input} /></div>
        <p style={styles.error}>{errors.correo?.message}</p>
        <div style={styles.inputGroup}><FaLock style={styles.icono} />
          <input type="password" placeholder="Contraseña" {...register('contraseña')} style={styles.input} /></div>
        <p style={styles.error}>{errors.contraseña?.message}</p>
        <div style={styles.inputGroup}><FaBriefcase style={styles.icono} />
          <input placeholder="Cargo" {...register('cargo')} style={styles.input} /></div>
        <p style={styles.error}>{errors.cargo?.message}</p>
        <div style={styles.inputGroup}><FaMapMarkerAlt style={styles.icono} />
          <select {...register('id_faena')} style={styles.select}>
            <option value="">Selecciona una faena</option>
            {faenas.map((f) => (
              <option key={f.id_faena} value={f.id_faena}>{f.nombre_faena}</option>
            ))}
          </select>
        </div>
        <p style={styles.error}>{errors.id_faena?.message}</p>
        <div style={styles.inputGroup}><FaUserTag style={styles.icono} />
          <select {...register('id_perfil')} style={styles.select}>
            <option value="">Selecciona un perfil</option>
            <option value="1">Administrador</option>
            <option value="2">Supervisor</option>
            <option value="3">Trabajador</option>
          </select></div>
        <p style={styles.error}>{errors.id_perfil?.message}</p>
        <div style={styles.inputGroup}><FaToggleOn style={styles.icono} />
          <select {...register('activo')} style={styles.select}>
            <option value="">Selecciona estado</option>
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </select></div>
        <p style={styles.error}>{errors.activo?.message}</p>
        <button type="submit" style={styles.boton}><FaSave style={{ marginRight: '8px' }} />
          {modoEdicion ? 'Actualizar Usuario' : 'Guardar Usuario'}</button>
      </form>

      <h3 style={styles.subtitulo}>Usuarios Registrados</h3>
      <button onClick={exportarExcel} style={styles.botonExportar}>
        <FaFileExcel style={{ marginRight: '8px' }} /> Exportar a Excel
      </button>

      <div style={styles.tablaContenedor}>
        <table style={styles.tabla}>
          <thead><tr style={styles.encabezadoTabla}>
            <th style={styles.th}>RUT</th><th style={styles.th}>Nombre</th><th style={styles.th}>Correo</th>
            <th style={styles.th}>Cargo</th><th style={styles.th}>Faena</th><th style={styles.th}>Perfil</th><th style={styles.th}>Estado</th><th style={styles.th}>Acciones</th>
          </tr></thead>
          <tbody>
            {usuariosPagina.map((u, i) => (
              <tr key={i} style={styles.fila}>
                <td>{u.rut}</td>
                <td>{u.nombres} {u.apellidos}</td>
                <td>{u.correo}</td>
                <td>{u.cargo}</td>
                <td>{u.nombre_faena || '—'}</td>
                <td>{u.nombre_perfil}</td>
                <td style={{ color: u.activo === "1" ? 'green' : 'gray', fontWeight: 'bold' }}>
                  {u.activo === "1" ? "Activo" : "Inactivo"}</td>
                <td>
                  <span onMouseEnter={(e) => e.currentTarget.firstChild.style.transform = 'scale(1.3)'}
                        onMouseLeave={(e) => e.currentTarget.firstChild.style.transform = 'scale(1)'}>
                    <FaEdit onClick={() => editarUsuario(u)} style={{ ...styles.accionIcono, color: '#4d6fff' }} title="Editar" />
                  </span>
                  <span onMouseEnter={(e) => e.currentTarget.firstChild.style.transform = 'scale(1.3)'}
                        onMouseLeave={(e) => e.currentTarget.firstChild.style.transform = 'scale(1)'}>
                    <FaTrash onClick={() => eliminarUsuario(u.rut)} style={{ ...styles.accionIcono, color: 'crimson' }} title="Eliminar" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.paginacion}>
        <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1} style={styles.botonPaginacion}>← Anterior</button>
        <span style={styles.paginaActual}>Página {paginaActual} de {totalPaginas}</span>
        <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas} style={styles.botonPaginacion}>Siguiente →</button>
      </div>
    </div>
  );
};

const styles = {
  contenedor: { maxWidth: '950px', margin: '0 auto' },
  titulo: { fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: 'bold' },
  subtitulo: { marginTop: '3rem', marginBottom: '1rem', fontSize: '1.4rem', fontWeight: 'bold' },
  formulario: { backgroundColor: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  inputGroup: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.7rem' },
  icono: { color: '#4d6fff', fontSize: '1.1rem' },
  input: { flex: 1, padding: '0.6rem', borderRadius: '5px', border: '1px solid #ccc' },
  select: { flex: 1, padding: '0.6rem', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '0.5rem' },
  error: { color: 'red', fontSize: '0.8rem', marginBottom: '0.5rem' },
  boton: { backgroundColor: '#4d6fff', color: 'white', padding: '0.7rem', border: 'none', borderRadius: '5px', fontWeight: 'bold', marginTop: '1rem', cursor: 'pointer', transition: 'all 0.3s ease' },
  botonExportar: { backgroundColor: '#198754', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '1rem' },
  tablaContenedor: { overflowX: 'auto', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', marginTop: '1rem' },
  tabla: { width: '100%', borderCollapse: 'collapse', fontFamily: 'sans-serif', fontSize: '0.9rem' },
  encabezadoTabla: { backgroundColor: '#f1a300', color: 'white', textAlign: 'left' },
  th: { padding: '12px 10px', fontWeight: 'bold' },
  fila: { borderBottom: '1px solid #eee', transition: 'background 0.2s ease' },
  accionIcono: { cursor: 'pointer', fontSize: '1.1rem', marginRight: '10px', transition: 'transform 0.2s' },
  paginacion: { display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1.5rem', gap: '1rem' },
  botonPaginacion: { backgroundColor: '#4d6fff', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.3s ease' },
  paginaActual: { fontWeight: 'bold' }
};

export default GestionUsuarios;
