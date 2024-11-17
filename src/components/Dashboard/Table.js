import React, {useEffect, useState} from 'react';
import axios from "axios";

const Table = ({ cars, handleEdit, handleDelete }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Esto formatea la fecha de forma legible
  };

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Url</th>
            <th>Estado</th>
            <th>Ultimo chequeo</th>
            <th colSpan={2} className="text-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
        {cars.map((car, i) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.url} </td>
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
