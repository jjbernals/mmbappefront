import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from "axios";

const Login = ({ setIsAuthenticated, setIsRegistering }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/user/${email}/${password}`);
      if (response.data) {
        const userName = response.data.nombre;
        const idUser = response.data.id;

        localStorage.setItem('user_name', userName);
        localStorage.setItem('id_user', idUser)
        localStorage.setItem('is_authenticated', true);
        setIsAuthenticated(true);

        Swal.fire({
          icon: 'success',
          title: `¡Bienvenido, ${userName}!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Contraseña o correo incorrectos.',
          showConfirmButton: true,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el servidor',
        text: 'No se pudo conectar al servidor.',
        showConfirmButton: true,
      });
    }
  };

  return (
      <div className="small-container">
        <form onSubmit={handleLogin}>
          <h1>Iniciar Sesión</h1>
          <label htmlFor="email">Correo electrónico</label>
          <input
              type="email"
              placeholder="Introduce tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Contraseña</label>
          <input
              type="password"
              placeholder="Introduce tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Iniciar Sesión" />
          <button
              type="button"
              onClick={() => setIsRegistering(true)}
              style={{ marginLeft: '15px' }}
          >
            Registrarse
          </button>
        </form>
      </div>
  );
};

export default Login;
