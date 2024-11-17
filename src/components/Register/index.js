import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from "axios";

const Register = ({ setIsAuthenticated, setIsRegistering }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Función para manejar el registro
    const handleRegister = async (e) => {
        e.preventDefault();

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden.',
                showConfirmButton: true,
            });
            return;
        }

        try {
            // Realizar la solicitud POST a la API para registrar al usuario
            const response = await axios.post("http://localhost:8080/user", {
                "nombre" : name,
                email,
                "contraseña" : password,
            });


            // Comprobar si la respuesta es exitosa
            if (response.data) {
                const userName = response.data.nombre;

                // Guardar el nombre del usuario en localStorage
                localStorage.setItem('user_name', userName);
                localStorage.setItem('is_authenticated', true);
                setIsAuthenticated(true);

                // Mostrar un mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    title: `¡Registro exitoso, bienvenido ${userName}!`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.data.message || 'Error al registrar usuario.',
                    showConfirmButton: true,
                });
            }
        } catch (error) {
            console.error("Error al registrar:", error);
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
            <form onSubmit={handleRegister}>
                <h1>Registrarse</h1>

                <label htmlFor="name">Nombre</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Introduce tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="email">Correo electrónico</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Introduce tu correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Contraseña</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Introduce tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirma tu contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <input style={{ marginTop: '12px' }} type="submit" value="Registrarse" />

                {/* Botón para ir al inicio de sesión */}
                <button
                    type="button"
                    onClick={() => setIsRegistering(false)}
                    style={{ marginTop: '12px', marginLeft: '15px' }}
                >
                    Volver a Iniciar Sesión
                </button>
            </form>
        </div>
    );
};

export default Register;
