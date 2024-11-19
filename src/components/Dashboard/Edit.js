import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from "axios";

const Edit = ({ cars, selectedCar, setCar, setIsEditing }) => {

  const [marca, setMarca] = useState(selectedCar.url);
  const [modelo, setModelo] = useState(selectedCar.estado);
  const [color, setColor] = useState();

  const handleUpdate = e => {
    e.preventDefault();

    if (!marca || !modelo || !color) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'No pueden ir campos vacios.',
        showConfirmButton: true,
      });
    }

    const formattedDate = `${color}T00:00:00`;
    const payload = {
      "url" : marca,
      "estado" : modelo,
      "ultimo_chequeo" : formattedDate,
    };

    axios.patch(`http://localhost:8080/pagina/${selectedCar.id}`, payload).then((response)=>{
      setIsEditing(false);
    })


    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `Se actualizo la pagina`,
      showConfirmButton: false,
      timer: 1500,
    }).then(()=>{
      window.location.reload()
    })
  };

  return (
      <div className="small-container">
        <form onSubmit={handleUpdate}>
          <h1>Editar pagina web</h1>

          <label htmlFor="marca">Url</label>
          <input
              id="marca"
              type="text"
              name="marca"
              value={marca}
              onChange={e => setMarca(e.target.value)}
          />

          <label htmlFor="modelo">Estado</label>
          <select
              id="modelo"
              name="modelo"
              value={modelo}
              onChange={e => setModelo(e.target.value)}
          >
            <option value="activado">Activado</option>
            <option value="desactivado">Desactivado</option>
          </select>

          <label htmlFor="color">Ultimo chequeo</label>
          <input
              id="color"
              type="date"
              name="color"
              value={color}
              onChange={e => setColor(e.target.value)}
          />

          <div style={{marginTop: '30px'}}>
            <input type="submit" value="Actualizar"/>
            <input
                style={{ marginLeft: '12px' }}
                className="muted-button"
                type="button"
                value="Cancelar"
                onClick={() => setIsEditing(false)}
            />
          </div>
        </form>
      </div>
  );
};

export default Edit;
