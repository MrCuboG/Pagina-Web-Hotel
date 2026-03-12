import { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/styles.css';
import '../styles/stylereservaciones.css';

export default function Reservaciones() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <>
      <div className="subtitulo">
        <h3>Realiza tu reservación</h3>
      </div>

      <div className="reservaciones-page">
        
        <form action="/procesar" method="post">
          <h2>Datos de habitación</h2>

          <label htmlFor="nombreHabitaciones">Habitación:</label>
          <input type="text" id="nombreHabitaciones" name="nombreHabitaciones" required />
          <br /><br />

          <label htmlFor="fechaInicio">Fecha de entrada:</label>
          <input type="date" id="fechaInicio" name="fechaInicio" required />
          <br /><br />

          <label htmlFor="fechaFinal">Fecha de salida:</label>
          <input type="date" id="fechaFinal" name="fechaFinal" required />
          <br /><br />

          <label htmlFor="habitacion">Huéspedes</label>
          <input type="number" id="habitacion" name="habitacion" placeholder="Número de huéspedes" required />
          <br /><br />

          <button 
            type="button" 
            className={`accordion ${isAccordionOpen ? "active" : ""}`} 
            onClick={toggleAccordion}
          >
            Habitaciones disponibles
          </button>
          
          <div className="panel" style={{ display: isAccordionOpen ? 'block' : 'none' }}>
            <ul>    
              <li>Habitación 1</li>
              <li>Habitación 2</li>
              <li>Habitación 3</li>
            </ul>
          </div>

          <h2>Datos personales</h2>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" placeholder="Escribe tu nombre" required />
          <br /><br />

          <label htmlFor="BornDate">Fecha de nacimiento:</label>
          <input type="date" id="BornDate" name="BornDate" required />
          <br /><br />

          <label htmlFor="email">Correo electrónico:</label>
          <input type="email" id="email" name="email" placeholder="ejemplo@correo.com" required />
          <br /><br />

          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" required />
          <br /><br />

          <button type="submit">Enviar</button>
          <button type="reset">Limpiar</button>
          <Link to="/">
            <button type="button" id="cancelar">Volver al inicio</button>
          </Link>
        </form>
        
      </div>
    </>
  );
}