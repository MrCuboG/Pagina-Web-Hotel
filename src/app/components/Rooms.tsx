import { useNavigate } from 'react-router';
import { Bed, Users, Wifi, Coffee, Tv, Wind, ArrowRight, LayoutGrid } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import img5 from "../../imports/suite_quencio.jpg";
import img6 from "../../imports/paracho.jpg";
import img7 from "../../imports/morelia.jpg";

const rooms = [
  {
    name: "Suite Deluxe",
    description: "Espacio amplio con vistas panorámicas y acabados de lujo",
    price: "$2,500",
    capacity: "2-3 personas",
    image: img5,
    amenities: ["Wi-Fi", "TV", "Aire Acondicionado", "Café"]
  },
  {
    name: "Habitación Ejecutiva",
    description: "Perfecta para viajes de negocios con escritorio y zona de trabajo",
    price: "$1,800",
    capacity: "2 personas",
    image: img6,
    amenities: ["Wi-Fi", "TV", "Escritorio", "Café"]
  },
  {
    name: "Habitación Familiar",
    description: "Espacio confortable para toda la familia con camas adicionales",
    price: "$2,200",
    capacity: "4-5 personas",
    image: img7,
    amenities: ["Wi-Fi", "TV", "Aire Acondicionado", "Zona de estar"]
  }
];

const amenityIcons: Record<string, any> = {
  "Wi-Fi": Wifi,
  "TV": Tv,
  "Aire Acondicionado": Wind,
  "Café": Coffee,
  "Escritorio": Bed,
  "Zona de estar": Users
};

export function Rooms() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleReservationClick = () => {
    if (isAuthenticated) {
      navigate('/reservations');
    } else {
      navigate('/login', { state: { from: '/reservations' } });
    }
  };

  return (
    <section id="habitaciones" className="py-20 bg-gradient-to-b from-background via-purple-50/15 to-purple-100/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-purple-900/10 to-purple-700/10 rounded-full border border-purple-800/20">
            <span className="text-primary">Nuestras Habitaciones</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">Comodidad y Elegancia</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestras habitaciones diseñadas para brindarte la mejor experiencia de hospedaje
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-purple-200/40"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-900 to-purple-800 text-white px-3 py-1 rounded-full text-sm shadow-lg">
                  {room.price}/noche
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl mb-2 text-card-foreground">{room.name}</h3>
                <p className="text-muted-foreground mb-4">{room.description}</p>

                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                  <Users size={16} className="text-primary" />
                  <span>{room.capacity}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {room.amenities.map((amenity, idx) => {
                    const Icon = amenityIcons[amenity] || Coffee;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-1 bg-purple-50/50 px-3 py-1 rounded-full text-sm text-muted-foreground border border-purple-200/40"
                      >
                        <Icon size={14} className="text-primary" />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={handleReservationClick}
                  className="w-full bg-gradient-to-r from-purple-900 to-purple-800 hover:from-purple-950 hover:to-purple-900 text-white py-3 rounded-lg transition-all shadow-md"
                >
                  Ver Disponibilidad
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Ver todas las habitaciones */}
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
  );
}