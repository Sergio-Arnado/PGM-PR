import React, { useState, useEffect } from 'react';
import AgregarEmpresa from './AgregarEmpresa';
import Swal from 'sweetalert2';
import './SelectorEmpresa.css'; // Asegúrate que este archivo CSS esté bien enlazado

const SelectorEmpresa = () => {
  const [empresas, setEmpresas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const cargarEmpresas = async () => {
    try {
      const res = await fetch('http://localhost/PGM-PR/backend/obtener_empresas.php');
      const data = await res.json();
      setEmpresas(data);
    } catch (error) {
      console.error('Error al cargar empresas', error);
    }
  };

  useEffect(() => {
    cargarEmpresas();
  }, []);

  const seleccionarEmpresa = (empresa) => {
    // Guardar empresa seleccionada en localStorage
    localStorage.setItem('empresaSeleccionada', JSON.stringify(empresa));

    Swal.fire({
      title: `Empresa seleccionada: ${empresa.nombre_empresa}`,
      text: 'Serás redirigido al panel de gestión de esta empresa.',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      window.location.href = '/admin'; // Aquí se puede cambiar luego si hay paneles específicos
    }, 1600);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('empresaSeleccionada'); // Limpiar también la empresa
    window.location.href = '/';
  };

  return (
    <div className="selector-wrapper">
      <div className="selector-container-v2">
        <h2 className="selector-title">Bienvenido Administrador</h2>

        <div className="selector-buttons-v2">
          <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
            {mostrarFormulario ? 'Ocultar Formulario' : 'Ingresar Empresa'}
          </button>

          <button className="select-btn" disabled>
            Seleccionar Empresa
          </button>

          <button onClick={() => {
            Swal.fire({
              title: 'Información Relevante',
              html: 'Nueva Ley 20.123 entró en vigencia sobre prevención de riesgos laborales.<br/>Actualiza tus protocolos.',
              icon: 'info',
              confirmButtonText: 'Entendido'
            });
          }}>
            Información Importante
          </button>
        </div>

        {mostrarFormulario && (
          <div className="form-container">
            <AgregarEmpresa />
          </div>
        )}

        <div className="tarjetas-empresa">
          {empresas.map((empresa) => (
            <div
              key={empresa.id_empresa}
              className="tarjeta"
              onClick={() => seleccionarEmpresa(empresa)}
            >
              <h4>{empresa.nombre_empresa}</h4>
              <p>{empresa.correo_empresa}</p>
            </div>
          ))}
        </div>

        <button className="cerrar-sesion-bajo" onClick={cerrarSesion}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default SelectorEmpresa;
