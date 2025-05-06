import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import SelectorEmpresa from './components/SelectorEmpresa'; // ✅ Importación nueva
// Luego puedes agregar SupervisorPanel y TrabajadorPanel

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/selector-empresa" element={<SelectorEmpresa />} /> {/* ✅ Nueva ruta */}
        <Route path="/admin" element={<AdminPanel />} />
        {/* Agrega estas más adelante */}
        {/* <Route path="/supervisor" element={<SupervisorPanel />} /> */}
        {/* <Route path="/trabajador" element={<TrabajadorPanel />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
