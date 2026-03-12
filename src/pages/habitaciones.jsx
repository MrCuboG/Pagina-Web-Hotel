import { useNavigate } from 'react-router-dom'; 
import "../styles/styles.css";
import "../styles/contenedores.css"; 

import imgHabitacion1 from '../assets/habitacion1.png';
import imgHabitacion2 from '../assets/habitacion2.png';
import imgHabitacion3 from '../assets/habitacion3.png';
import imgHabitacion4 from '../assets/habitacion4.png';
import imgHabitacion5 from '../assets/habitacion5.png';

function Habitaciones() {
  const navigate = useNavigate();

  const listaHabitaciones = [
    {
      id: 1,
      imagen: imgHabitacion1,
      nombre: "Suite Doble",
      huespedes: "3 a 4 Personas",
      amenidades: "2 Camas King Size, Balcón, Frigobar",
      precio: "$1,500 MXN / noche"
    },
    {
      id: 2,
      imagen: imgHabitacion2,
      nombre: "Suite Doble",
      huespedes: "3 a 4 Personas",
      amenidades: "2 Camas King Size, Balcón, Frigobar",
      precio: "$1,500 MXN / noche"
    },
    {
      id: 3,
      imagen: imgHabitacion3,
      nombre: "Suite Doble",
      huespedes: "3 a 4 Personas",
      amenidades: "2 Camas King Size, Balcón, Frigobar",
      precio: "$1,500 MXN / noche"
    },
    {
      id: 4,
      imagen: imgHabitacion4,
      nombre: "Habitación Sencilla",
      huespedes: "1 a 2 Personas",
      amenidades: "Cama Matrimonial, Wi-Fi, TV por cable",
      precio: "$800 MXN / noche"
    },
    {
      id: 5,
      imagen: imgHabitacion5,
      nombre: "Habitación Sencilla",
      huespedes: "1 a 2 Personas",
      amenidades: "Cama Matrimonial, Wi-Fi, TV por cable",
      precio: "$800 MXN / noche"
    }

  ];

  return (
    <>
      <header>
        <div className="titulo">
          <h1>ELIGE TU HABITACIÓN PERFECTA</h1>
        </div>
        <div className="subtitulo">
          <h2>Contamos con una gran cantidad de habitaciones con diferentes servicios y comodidades.</h2>
        </div>
      </header>

      <main className="contenedor-fichas">
        
        {listaHabitaciones.map((cuarto) => (
          <div className="ficha" key={cuarto.id}>
            <img src={cuarto.imagen} alt={cuarto.nombre} className="imagen-ficha" />
            
            <div className="info-habitacion">
              <h3>{cuarto.nombre}</h3>
              <p><strong>Huéspedes:</strong> {cuarto.huespedes}</p>
              <p><strong>Amenidades:</strong> {cuarto.amenidades}</p>
              <h4 className="precio-habitacion">{cuarto.precio}</h4>
            </div>

            <button className="btn-reservar" onClick={() => {
              navigate('/reservaciones');
              window.scrollTo(0, 0);
            }}>
              RESERVAR
            </button>
          </div>
        ))}

      </main>
    </>
  );
}

export default Habitaciones;
// Pudimos ahorrarnos mucho codigo referenciando la navbar y el footer desde App.jsx,
// ya que se muestra en todas las páginas. De esta forma 
// solo nos enfocamos en el contenido es
// pecífico de cada página.