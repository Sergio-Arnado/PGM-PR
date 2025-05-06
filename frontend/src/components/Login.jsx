import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const schema = yup.object().shape({
  correo: yup.string().email('Correo inválido').required('El correo es obligatorio'),
  contraseña: yup.string().required('La contraseña es obligatoria'),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [verContrasena, setVerContrasena] = useState(false);
  const [hover, setHover] = useState(false);

  const toggleVerContrasena = () => setVerContrasena(!verContrasena);

  const obtenerSaludo = () => {
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) return '¡Buenos días! Bienvenido';
    else if (hora >= 12 && hora < 19) return '¡Buenas tardes! Bienvenido';
    else return '¡Buenas noches! Bienvenido';
  };

  const saludo = obtenerSaludo();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost/PGM-PR/backend/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("usuario", JSON.stringify(result));

        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión correcto',
          text: `¡Bienvenido ${result.nombre}!`,
        });

        const rol = parseInt(result.rol);

        // 👇 Redirigir según el rol
        if (rol === 1) {
          window.location.href = '/selector-empresa'; // ✅ Vista exclusiva para administrador
        } else if (rol === 2) {
          window.location.href = '/supervisor';
        } else if (rol === 3) {
          window.location.href = '/trabajador';
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo conectar al servidor',
      });
      console.error('Error en login:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{saludo}</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <h3 style={styles.subtitle}>Iniciar sesión</h3>

        <label>Correo electrónico</label>
        <input
          type="email"
          placeholder="Introduce tu correo electrónico"
          {...register('correo')}
          style={styles.input}
        />
        <p style={styles.error}>{errors.correo?.message}</p>

        <label>Contraseña</label>
        <div style={styles.passwordContainer}>
          <input
            type={verContrasena ? 'text' : 'password'}
            placeholder="Introduce tu contraseña"
            {...register('contraseña')}
            style={{ ...styles.input, paddingRight: '2.5rem' }}
          />
          {verContrasena ? (
            <FaEyeSlash style={styles.icon} onClick={toggleVerContrasena} />
          ) : (
            <FaEye style={styles.icon} onClick={toggleVerContrasena} />
          )}
        </div>
        <p style={styles.error}>{errors.contraseña?.message}</p>

        <button
          type="submit"
          style={{
            ...styles.button,
            ...(hover ? styles.buttonHover : {})
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Iniciar sesión
        </button>

        <p style={styles.forgot}>¿Olvidaste tu contraseña?</p>
      </form>
      <footer style={styles.footer}>
        © 2025 Plataforma de Prevención de Riesgos. Todos los derechos reservados. <br />
        Términos y condiciones | Política de privacidad
      </footer>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#4d6fff',
    minHeight: '100vh',
    padding: '2rem',
    color: 'white',
    fontFamily: 'sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: { marginTop: '1rem', fontSize: '1.8rem', fontWeight: 'bold' },
  form: {
    backgroundColor: 'white',
    color: 'black',
    padding: '2rem',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  subtitle: { textAlign: 'center', marginBottom: '1rem' },
  input: {
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  },
  error: { color: 'red', fontSize: '0.8rem' },
  button: {
    backgroundColor: '#4d6fff',
    color: 'white',
    padding: '0.6rem',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#3b58d1',
    transform: 'scale(1.03)',
  },
  forgot: {
    fontSize: '0.85rem',
    color: '#4d6fff',
    marginTop: '0.5rem',
    textAlign: 'center',
  },
  footer: {
    marginTop: '3rem',
    fontSize: '0.75rem',
    textAlign: 'center',
    color: 'white',
  },
  passwordContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    right: '10px',
    cursor: 'pointer',
    color: '#ccc',
  },
};

export default Login;
