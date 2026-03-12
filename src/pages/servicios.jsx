import { Link } from 'react-router-dom';

import '../styles/styles.css';
import '../styles/styleservicio.css';

export default function Servicios() {
  return (
  
    <div className="servicios-page">
      <div className="subtitulo">
        <h3>Bienvenido al modo administrador para el agregado de servicios</h3>
      </div>

      <div className="contenedor-form">
        <div className="formulario">
          <form action="/procesar" method="post">
            <h2>Agregar nuevo servicio</h2>

            <label htmlFor="nombreServicio">Nombre del servicio:</label>
            <input type="text" id="nombreServicio" name="nombreServicio" required />
            <br /><br />

            <label htmlFor="descripcionServicio">Descripción:</label>
            <textarea id="descripcionServicio" name="descripcionServicio" required></textarea>
            <br /><br />

            <label htmlFor="costoServicio">Costo:</label>
            <input type="number" id="costoServicio" name="costoServicio" required />
            <br /><br />

            <button type="submit">Enviar</button>
            <button type="reset">Limpiar</button>
            <Link to="/">
              <button type="button" id="cancelar">Volver al inicio</button>
            </Link>
          </form>
        </div>
      </div>

      <div className="contenedor-tabla">
        <h2>Gestión de Servicios Registrados</h2>
        <table className="tabla-servicios">
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Descripción</th>
              <th>Costo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Limpieza Premium</td>
              <td>Servicio de limpieza profunda diaria.</td>
              <td>$500</td>
              <td>
                <button className="btn-editar">Editar</button>
                <button className="btn-eliminar">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}