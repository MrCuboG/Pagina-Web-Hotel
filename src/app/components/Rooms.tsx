import { useNavigate } from 'react-router';
import { Bed, Users, Wifi, Coffee, Tv, Wind, ArrowRight, LayoutGrid } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import img5 from "../../imports/suite_quencio.jpg";
import img6 from "../../imports/paracho.jpg";
import img7 from "../../imports/morelia.jpg";

import { useState, useEffect } from 'react';

const SobreNosotros = () => {
  const [contenidos, setContenidos] = useState<Record<string, string>>({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerContenidos = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contenidos`);
        const datos = await res.json();

        // Transformamos el array en un objeto simple: { mision: "texto", vision: "texto" }
        const datosFormateados = datos.reduce((acumulador: { [x: string]: any; }, item: { clave: string | number; valor: any; }) => {
          acumulador[item.clave] = item.valor;
          return acumulador;
        }, {});

        setContenidos(datosFormateados);
        setCargando(false);
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        setCargando(false);
      }
    };

    obtenerContenidos();
  }, []);

  if (cargando) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-500 font-semibold animate-pulse">
          Cargando información de la Quinta...
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-4">Sobre Quinta Dalam</h2>
        <div className="h-1 w-24 bg-primary mx-auto rounded"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tarjeta de Misión */}
        <div className="card-primary p-8 rounded-2xl hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-foreground">Nuestra Misión</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {contenidos.mision || "Misión no definida aún en la base de datos."}
          </p>
        </div>

        {/* Tarjeta de Visión */}
        <div className="card-primary p-8 rounded-2xl hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-foreground">Nuestra Visión</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {contenidos.vision || "Visión no definida aún en la base de datos."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SobreNosotros;
// ... tus imports (img5, img6, img7, etc.)

export function Rooms() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // 1. Estado para las habitaciones de la DB
  const [habitacionesDb, setHabitacionesDb] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  // 2. Fetch de los datos
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/habitaciones/cards`);
        const data = await res.json();
        setHabitacionesDb(data);
        setCargando(false);
      } catch (error) {
        console.error("Error:", error);
        setCargando(false);
      }
    };
    fetchRooms();
  }, []);

  // Mapeo de imágenes temporales (mientras no estén en la DB)
  const imagenesDefault = [img5, img6, img7];

  if (cargando) return <p className="text-center py-20">Cargando habitaciones...</p>;

  return (
    <div className="bg-gradient-to-b from-background via-purple-900/5 to-purple-900/10">
      <SobreNosotros />

      <section id="habitaciones" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Bed size={16} />
              <span>Confort y Elegancia</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-primary-darker mb-6">Nuestras Habitaciones</h2>
            <p className="text-muted-foreground text-lg">
              Disfruta de una estancia inolvidable con el máximo confort. Cada detalle está diseñado para ofrecerte el descanso que mereces en Quinta Dalam.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {habitacionesDb.map((room, index) => (
              <div key={room.id} className="card-primary rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={imagenesDefault[index] || img5}
                    alt={room.nombre}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-purple-900 text-white px-3 py-1 rounded-full text-sm">
                    ${room.precio}/noche
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-serif mb-2 text-foreground dark:text-white">{room.nombre || room.tipo} #{room.numero}</h3>
                  <p className="text-muted-foreground dark:text-purple-200 mb-4">{room.descripcion}</p>

                  <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                    <Users size={16} className="text-primary" />
                    <span>Capacidad: {room.capacidad} personas</span>
                  </div>

                  {/* Aquí podrías mapear amenidades si las agregas a la DB después */}

                  <button
                    onClick={() => navigate('/reservations')}
                    className="w-full bg-purple-800 text-white py-3 rounded-lg hover:bg-purple-900 transition-all"
                  >
                    Reservar Habitación
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-16 bg-purple-200" />
              <span className="text-sm text-muted-foreground">Y muchas más opciones</span>
              <div className="h-px w-16 bg-purple-200" />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/rooms')}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-900 to-purple-700 hover:from-purple-950 hover:to-purple-800 text-white px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-purple-300/40 hover:shadow-xl active:scale-95 group"
              >
                <LayoutGrid size={20} />
                <span className="font-medium">Ver las 13 Habitaciones</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-sm text-muted-foreground">
                Desde <span className="text-purple-700 font-semibold">$1,500</span>/noche · Todas con baño privado
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}