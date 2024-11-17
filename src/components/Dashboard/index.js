import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import axios from "axios";
import Login from "../Login";
import Logout from "../Logout";

const Dashboard = ({ setIsAuthenticated }) => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/pagina/"+localStorage.getItem('id_user')).then((response)=>{
      setCars(response.data)
    })
  }, []);


  const handleEdit = id => {
    const [car] = cars.filter(car => car.id === id);
    setSelectedCar(car);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      title: "Eliminar Pagina",
      text: "¿Estás seguro de eliminar esta pagina?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2AACA5",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, eliminar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8080/pagina/${id}`);
        Swal.fire({
          title: "Eliminado!",
          text: "La pagina se ha eliminado con éxito",
          icon: "success",
          confirmButtonColor: "#E77833"
        }).then(() => {
          window.location.reload();
        });
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Logout setIsAuthenticated={setIsAuthenticated} />
          <Table
            cars={cars}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          cars={cars}
          setCars={setCars}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          cars={cars}
          selectedCar={selectedCar}
          setCars={setCars}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
