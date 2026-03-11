import { useNavigate } from 'react-router-dom'; 
import "../styles/styles.css";

import imgHabitacion1 from '../assets/habitacion1.png';
import imgHabitacion2 from '../assets/habitacion2.png';

function Habitaciones() {
  // Inicializamos la herramienta para navegar
  const navigate = useNavigate();

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

      <main className="contenedor-galeria">
        <div className="tarjeta-habitacion">
          <img src={imgHabitacion1} alt="Habitación 1" className="imagen-habitacion" />
          {/* Usamos el evento onClick para cambiar de página */}
          <button className="btn-reservar" onClick={() => navigate('/reservaciones')}>
            RESERVAR
          </button>
        </div>

        <div className="tarjeta-habitacion">
          <img src={imgHabitacion2} alt="Habitación 2" className="imagen-habitacion" />
          <button className="btn-reservar" onClick={() => navigate('/reservaciones')}>
            RESERVAR
          </button>
        </div>
      </main>
    </>
  );
}

export default Habitaciones;
// Pudimos ahorrarnos mucho codigo referenciando la navbar y el footer desde App.jsx,
// ya que se muestra en todas las páginas. De esta forma 
// solo nos enfocamos en el contenido es
// pecífico de cada página.