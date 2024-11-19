import React, { useState } from 'react';
import Swal from 'sweetalert2';
import PageView from "./Page";

const Table = ({ cars, handleEdit, handleDelete }) => {
  const [selectedUrl, setSelectedUrl] = useState(null); // Estado para la URL seleccionada

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Esto formatea la fecha de forma legible
  };

  const handleViewPage = (car) => {
    if (car.estado === "desactivado") {
      Swal.fire({
        icon: 'warning',
        title: 'Página desactivada',
        text: `La página '${car.url}' está desactivada.`,
        showConfirmButton: true,
      });
    } else {
      setSelectedUrl(car.url);
    }
  };

  // Si hay una URL seleccionada, muestra PageView
  if (selectedUrl) {
    return <PageView url={selectedUrl} goBack={() => setSelectedUrl(null)} />;
  }

  return (
      <div className="contain-table">
        <table className="striped-table">
          <thead>
          <tr>
            <th>No.</th>
            <th>Url</th>
            <th>Estado</th>
            <th>Último chequeo</th>
            <th colSpan={2} className="text-center">
              Acciones
            </th>
          </tr>
          </thead>
          <tbody>
          {cars.map((car, i) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>
                  <button
                      className="button-link"
                      onClick={() => handleViewPage(car)} // Llama a la función para manejar la navegación
                  >
                    {car.url}
                  </button>
                </td>
                <td>{car.estado}</td>
                <td>{formatDate(car.ultimo_chequeo)}</td>
                <td className="text-right">
                  <button
                      onClick={() => handleEdit(car.id)}
                      className="button muted-button"
                  >
                    Editar
                  </button>
                </td>
                <td className="text-left">
                  <button
                      onClick={() => handleDelete(car.id)}
                      className="button muted-button"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default Table;
