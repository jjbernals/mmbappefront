import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from "axios";

const Add = ({ cars, setCars, setIsAdding }) => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [color, setColor] = useState('');
  const [placa, setPlaca] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [precio, setPrecio] = useState('');

  const handleAdd = e => {
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

    axios.post("http://localhost:8080/pagina/"+localStorage.getItem('id_user'), payload).then((response)=>{
      setIsAdding(false)
    })


    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `Se agrego la pagina web`,
      showConfirmButton: false,
      timer: 1500,
    }).then(()=>{
      window.location.reload()
    })
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Añadir pagina web</h1>
        <label htmlFor="marca">Url</label>
        <input
          id="marca"
          type="text"
          name="marca"
          value={marca}
          onChange={e => setMarca(e.target.value)}
        />
        <label htmlFor="modelo">Estado</label>
        <input
          id="modelo"
          type="text"
          name="modelo"
          value={modelo}
          onChange={e => setModelo(e.target.value)}
        />
        <label htmlFor="color">Ultimo chequeo</label>
        <input
          id="color"
          type="date"
          name="color"
          value={color}
          onChange={e => setColor(e.target.value)}
        />

        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Crear" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancelar"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
