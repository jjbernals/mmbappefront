import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const PageView = ({ url, goBack }) => {
    useEffect(() => {
        if (url) {
            Swal.fire({
                icon: 'info',
                title: 'Bienvenidos',
                text: `La página '${url}' se encuentra activa`,
                showConfirmButton: true,
            });
        }
    }, [url]);

    return (
        <div className="page-view">
            <h1>Página: {url}</h1>
            <button
                className="button muted-button"
                onClick={goBack} // Llama a la función para regresar a la tabla
                style={{ marginTop: '20px' }}
            >
                Volver a la Tabla
            </button>
        </div>
    );
};

export default PageView;
