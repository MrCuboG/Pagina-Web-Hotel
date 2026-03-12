import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

//importacion de archivos (es diferente)
import './index.css';                
import './styles/navbar.css';       
import './styles/footerbar.css';
import './styles/contenedores.css';
import './styles/styles.css';

// Importamos la imagen desde assets 
import imgInicio from './assets/inicio.png';
import imgLago from './assets/lago.jpeg';
import imgExterior from './assets/hotelExterno.jpeg';

import Habitaciones from './pages/habitaciones';
import Servicios from './pages/servicios';
import Reservaciones from './pages/reservaciones';


function App() {
  return (
    <BrowserRouter>
      {/* Barra de Navegación */}
      <nav className="topnav">
        <Link to="/" className="logo">QUINTA DALAM</Link>
        <div className="nav-links">
          <Link to="/servicios">Agregar Servicios</Link>
          <Link to="#">Productos</Link>
          <Link to="/reservaciones">Reservaciones</Link>
          <Link to="/habitaciones" className="btn-habitaciones">Habitaciones</Link>
        </div>
      </nav>

      {/* Aquí le decimos a React qué mostrar dependiendo de la URL */}
      <Routes>
        
        {/* inicio*/}
        <Route path="/" element={
          <>
            <div>
              <div className="seccion-inicio">
                <img src={imgInicio} alt="Imagen de Inicio del Hotel" className="ampl-img" />
              </div>
            </div>

            <div className="subtitulo">
              <h3>Disfruta de una increíble experiencia con nuestros servicios</h3>
            </div>

            <div className="contenedor-botones">
              <Link to="/habitaciones">
                <button className="btn-menu">Ver Habitaciones</button>
              </Link>
            </div>

            <div className="contenedor-actividades">
              <div className="ficha" >
                <h2>Actividades</h2>
                <div className='contenedor-actividades'>
                  <div className='actividades-card'>
                    <img src={imgLago} alt="Tour" className="card-bg" />
                    <div className="card-overlay">
                      <h4>VISTA AL LAGO</h4>
                    </div>
                  </div>
                  <div className='actividades-card'>
                    <img src={imgExterior} alt="Tour" className="card-bg" />
                    <div className="card-overlay">
                      <h4>LOCALIZACION</h4>
                    </div>
                  </div>
                  <div className='actividades-card'>
                    <img src={imgLago} alt="Tour" className="card-bg" />
                    <div className="card-overlay">
                      <h4>VISTA AL LAGO</h4>
                    </div>
                  </div>
                  <div className='actividades-card'>
                    <img src={imgExterior} alt="Tour" className="card-bg" />
                    <div className="card-overlay">
                      <h4>LOCALIZACION</h4>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>

            <div className="contenedor-nosotros">
              <div className="ficha" id="informacion">
                <h3>Sobre nosotros</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Nam omnis laboriosam 
                  rerum accusantium corporis, voluptates 
                  sint est laborum, hic, dolorem dolore? 
                  Quae provident debitis minima incidunt 
                  ullam laborum porro voluptatem veritatis 
                  deserunt pariatur similique, error vel, 
                  excepturi suscipit. Aspernatur ea placeat 
                  aliquid voluptatibus in consequuntur odio 
                  optio obcaecati expedita dolorem!
                </p>
              </div>
            </div>

            <div className="contenedor-fichas">
              <div className="ficha">
                <h3>MISION</h3>
                <p>Ofrecer a cada uno de nuestros clientes una experiencia única y memorable...</p>
              </div>
              <div className="ficha">
                <h3>VISION</h3>
                <p>Para el año 2028, seremos reconocidos como el hotel líder en la región...</p>
              </div>
              <div className="ficha">
                <h3>VALORES</h3>
                <p>Nuestros valores fundamentales son la base de nuestra cultura organizacional...</p>
                <div className="lista-valores">
                  <ul>
                    <li>Ser el hotel preferido por los viajeros nacionales e internacionales.</li>
                    <li>Implementar prácticas sostenibles que minimicen nuestro impacto ambiental.</li>
                    <li>Fomentar un ambiente de trabajo positivo y colaborativo.</li>
                    <li>Expandir nuestra oferta de servicios.</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        } />

        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/reservaciones" element={<Reservaciones />} />

      </Routes>

      {/* Pie de Página */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Quinta Dalam</h3>
            <p>Derechos registrados © 2026</p>
          </div>
          <div className="footer-section">
            <h4>Contacto</h4>
            <a href="mailto:quintadalam@example.com">quintadalam@example.com</a>
            <p>Morelia, Michoacán</p>
          </div>
          <div className="footer-section">
            <h4>Síguenos</h4>
            <div className="social-links">
              <a href="https://www.instagram.com/quintadalam" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://www.facebook.com/share/1HkG2VXzss/" target="_blank" rel="noreferrer">Facebook</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; Todos los derechos reservados.</p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;