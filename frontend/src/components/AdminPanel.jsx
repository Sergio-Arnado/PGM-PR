import React, { useEffect, useState } from 'react';
import {
  FaHome,
  FaUsers,
  FaFileAlt,
  FaShieldAlt,
  FaCog,
  FaSignOutAlt,
  FaBuilding,
  FaClipboardList,
  FaExchangeAlt
} from 'react-icons/fa';

import AdminInicio from './AdminInicio';
import GestionUsuarios from './GestionUsuarios';
import Reportes from './Reportes';
import ProtocoloSeguridadAdmin from './ProtocoloSeguridadAdmin';
import Configuracion from './Configuracion';
import VisualizarLogs from './VisualizarLogs';
import VisualizarEmpresasFaenas from './VisualizarEmpresasFaenas';
import './AdminPanel.css';

const AdminPanel = () => {
  const [seccionActiva, setSeccionActiva] = useState('inicio');
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);

  useEffect(() => {
    const empresaGuardada = localStorage.getItem('empresaSeleccionada');
    if (!empresaGuardada) {
      window.location.href = '/selector-empresa';
    } else {
      const empresa = JSON.parse(empresaGuardada);
      setEmpresaSeleccionada(empresa);
      document.title = `Panel - ${empresa.nombre_empresa}`;
    }
  }, []);

  const renderContenido = () => {
    switch (seccionActiva) {
      case 'usuarios':
        return <GestionUsuarios empresaId={empresaSeleccionada?.id_empresa} />;
      case 'empresas_faenas':
        return <VisualizarEmpresasFaenas empresaId={empresaSeleccionada?.id_empresa} />;
      case 'reportes':
        return <Reportes empresaId={empresaSeleccionada?.id_empresa} />;
      case 'protocolos':
        return <ProtocoloSeguridadAdmin empresaId={empresaSeleccionada?.id_empresa} />;
      case 'logs':
        return <VisualizarLogs />;
      case 'config':
        return <Configuracion />;
      default:
        return <AdminInicio />;
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('empresaSeleccionada');
    window.location.href = '/';
  };

  const cambiarEmpresa = () => {
    localStorage.removeItem('empresaSeleccionada');
    window.location.href = '/selector-empresa';
  };

  const styles = {
    icono: { marginRight: '8px' },
    badge: {
      position: 'fixed',
      top: '10px',
      right: '10px',
      backgroundColor: '#4d6fff',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      fontWeight: 'bold',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      zIndex: 999
    },
    cambiarEmpresaBtn: {
      backgroundColor: '#f1c40f',
      color: '#333',
      fontWeight: 'bold',
      padding: '0.6rem 1rem',
      border: 'none',
      borderRadius: '6px',
      marginTop: '0.8rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div className="panel-admin">
      <aside className="sidebar-admin">
        <h2 className="logo-admin">Panel de Administración</h2>

        <div className="menu-container-admin">
          <ul className="menu-admin">
            <li className="menu-item-admin" onClick={() => setSeccionActiva('inicio')}>
              <FaHome style={styles.icono} /> Inicio
            </li>
            <li className="menu-item-admin" onClick={() => setSeccionActiva('usuarios')}>
              <FaUsers style={styles.icono} /> Gestión de Usuarios
            </li>
            <li className="menu-item-admin" onClick={() => setSeccionActiva('empresas_faenas')}>
              <FaBuilding style={styles.icono} /> Gestión Faena
            </li>
            <li className="menu-item-admin" onClick={() => setSeccionActiva('reportes')}>
              <FaFileAlt style={styles.icono} /> Reportes
            </li>
            <li className="menu-item-admin" onClick={() => setSeccionActiva('protocolos')}>
              <FaShieldAlt style={styles.icono} /> Protocolos de Seguridad
            </li>
            <li className="menu-item-admin" onClick={() => setSeccionActiva('config')}>
              <FaCog style={styles.icono} /> Configuración
            </li>
            <li className="menu-item-admin" onClick={() => setSeccionActiva('logs')}>
              <FaClipboardList style={styles.icono} /> Ver Logs del Sistema
            </li>
          </ul>
          {/* 🔄 Botón para cambiar empresa (verde y con clase de CSS) */}
          <button className="switch-empresa-button" onClick={cambiarEmpresa}>
            <FaExchangeAlt style={{ marginRight: '6px' }} />
            Cambiar Empresa
          </button>

          <button className="logout-button-admin" onClick={cerrarSesion}>
            <FaSignOutAlt style={styles.icono} /> Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="main-admin">
        {empresaSeleccionada && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: '#4d6fff' }}>
                Trabajando con empresa: <strong>{empresaSeleccionada.nombre_empresa}</strong>
              </h2>
            </div>
            <div style={styles.badge}>
              🏢 {empresaSeleccionada.nombre_empresa}
            </div>
          </>
        )}
        {renderContenido()}
      </main>
    </div>
  );
};

export default AdminPanel;
