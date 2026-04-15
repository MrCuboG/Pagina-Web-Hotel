import { useNavigate } from 'react-router';
import { Bed, Users, Wifi, Coffee, Tv, Wind, Star, ArrowLeft, Sparkles, Bath, UtensilsCrossed, Car, Dumbbell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// Tus imágenes locales
import imgQuencio from "../../imports/suite_quencio.jpg";
import imgParacho from "../../imports/paracho.jpg";
import imgMorelia from "../../imports/morelia.jpg";
import imgJanitzio from "../../imports/janitzio.jpg";
import imgAlberca from "../../imports/alberca.jpeg";
import imgEntrada from "../../imports/entrada.jpg";
import imgLobby from "../../imports/lobby.jpg";
import imgPaisaje from "../../imports/paisaje.jpg";
import imgPatio from "../../imports/patio.jpg";
import imgRestaurante from "../../imports/restaurante.jpeg";
import imgSalaLobby from "../../imports/salalobby.jpg";
import imgSalaLobby2 from "../../imports/salalobby2.jpg";
import imgBoda from "../../imports/Boda.jpeg";

type BadgeVariant = 'suite' | 'standard' | 'premium' | 'presidential';

interface Room {
    id: number;
    name: string;
    category: string;
    badge: BadgeVariant;
    description: string;
    longDescription: string;
    price: number;
    capacity: string;
    size: string;
    image: string;
    amenities: string[];
}

const badgeStyles: Record<BadgeVariant, string> = {
    suite: 'bg-purple-800 text-white',
    standard: 'bg-slate-600 text-white',
    premium: 'bg-amber-700 text-white',
    presidential: 'bg-gradient-to-r from-amber-600 to-amber-500 text-white',
};

const rooms: Room[] = [
    {
        id: 1,
        name: "Suite Quencio",
        category: "Suite Principal",
        badge: "suite",
        description: "Habitación principal con vista panorámica y diseño elegante",
        longDescription: "Nuestra suite insignia ofrece vistas panorámicas al jardín y acabados de lujo en cada rincón. Perfecta para una estancia memorable.",
        price: 2500,
        capacity: "2–3 personas",
        size: "45 m²",
        image: imgQuencio,
        amenities: ["Wi-Fi", "TV", "Aire Acondicionado", "Café", "Baño Privado"],
    },
    {
        id: 2,
        name: "Suite Paracho",
        category: "Suite Romántica",
        badge: "suite",
        description: "Ambiente acogedor con detalles lujosos para parejas",
        longDescription: "Diseñada para parejas que buscan intimidad y confort. Cuenta con iluminación cálida y amenidades premium para una noche perfecta.",
        price: 1800,
        capacity: "2 personas",
        size: "35 m²",
        image: imgParacho,
        amenities: ["Wi-Fi", "TV", "Café", "Baño Privado"],
    },
    {
        id: 3,
        name: "Habitación Morelia",
        category: "Familiar",
        badge: "premium",
        description: "Espacio confortable para toda la familia con camas adicionales",
        longDescription: "La opción perfecta para familias. Amplio espacio con distribución inteligente que garantiza comodidad para todos los integrantes.",
        price: 2200,
        capacity: "4–5 personas",
        size: "55 m²",
        image: imgMorelia,
        amenities: ["Wi-Fi", "TV", "Aire Acondicionado", "Zona de Estar", "Baño Privado"],
    },
    {
        id: 4,
        name: "Suite Presidencial",
        category: "Presidential Suite",
        badge: "presidential",
        description: "La experiencia de lujo más exclusiva del hotel",
        longDescription: "La cúspide del lujo en Hotel Quinta Dalam. Sala privada, comedor, terraza y servicio personalizado las 24 horas para los huéspedes más exigentes.",
        price: 4500,
        capacity: "2–4 personas",
        size: "85 m²",
        image: imgSalaLobby2, // Usando sala lobby 2 para la presidencial
        amenities: ["Wi-Fi", "TV", "Aire Acondicionado", "Café", "Baño Privado", "Estacionamiento", "Gimnasio"],
    },
    {
        id: 5,
        name: "Suite Pátzcuaro",
        category: "Suite Vista",
        badge: "suite",
        description: "Vistas espectaculares con decoración inspirada en la región",
        longDescription: "Inspirada en la magia del Lago de Pátzcuaro, esta suite ofrece una decoración artesanal michoacana y vistas que quitan el aliento.",
        price: 3200,
        capacity: "2 personas",
        size: "42 m²",
        image: imgPaisaje, // Usando paisaje para la vista
        amenities: ["Wi-Fi", "TV", "Aire Acondicionado", "Café", "Baño Privado"],
    },
    {
        id: 6,
        name: "Habitación Janitzio",
        category: "Estándar",
        badge: "standard",
        description: "Confort esencial con acabados cuidados y ambiente tranquilo",
        longDescription: "Una habitación acogedora que combina funcionalidad y estética. Ideal para viajeros que buscan calidad a un precio accesible.",
        price: 1600,
        capacity: "2 personas",
        size: "28 m²",
        image: imgJanitzio,
        amenities: ["Wi-Fi", "TV", "Café", "Baño Privado"],
    },
    {
        id: 7,
        name: "Habitación Uruapan",
        category: "Estándar",
        badge: "standard",
        description: "Descanso reparador en un ambiente fresco y natural",
        longDescription: "Rodeada de jardines, esta habitación transmite la frescura de Uruapan. Un refugio ideal para desconectarse y relajarse plenamente.",
        price: 1500,
        capacity: "2 personas",
        size: "26 m²",
        image: imgPatio, // Usando el patio para Uruapan
        amenities: ["Wi-Fi", "TV", "Baño Privado"],
    },
    {
        id: 8,
        name: "Suite Tzintzuntzan",
        category: "Suite Superior",
        badge: "suite",
        description: "Elegancia purépecha con comodidades modernas de primer nivel",
        longDescription: "Evoca la grandeza del antiguo imperio purépecha con textiles artesanales y mobiliario de madera tallada a mano. Una suite de carácter único.",
        price: 2800,
        capacity: "2–3 personas",
        size: "48 m²",
        image: imgSalaLobby, // Usando la sala lobby para Tzintzuntzan
        amenities: ["Wi-Fi", "TV", "Aire Acondicionado", "Café", "Baño Privado"],
    },
    {
        id: 9,
        name: "Suite Zamora",
        category: "Junior Suite",
        badge: "suite",
        description: "Amplitud y modernidad en una zona tranquila del hotel",
        longDescription: "Una junior suite que equilibra espacio y comodidad. Perfecta para estancias prolongadas con sala de estar separada y escritorio ejecutivo.",
        price: 2000,
        capacity: "3 personas",
        size: "40 m²",
        image: imgRestaurante,
        amenities: ["Wi-Fi", "TV", "Aire Acondicionado", "Café", "Baño Privado"],
    },
    {
        id: 10,
        name: "Habitación Zitácuaro",
        category: "Estándar Plus",
        badge: "standard",
        description: "Habitación superior con detalles boutique y vistas al jardín",
        longDescription: "Una estancia que combina el encanto boutique con todas las comodidades necesarias. La vista al jardín interior la hace especialmente serena.",
        price: 1700,
        capacity: "2–3 personas",
        size: "32 m²",
        image: imgEntrada,
        amenities: ["Wi-Fi", "TV", "Aire Acondicionado", "Baño Privado"],
    },
    {
        id: 11,
        name: "Suite Jiquilpan",
        category: "Suite Ejecutiva",
        badge: "premium",
        description: "Diseño sofisticado para el viajero de negocios exigente",
        longDescription: "Equipada con escritorio ejecutivo, iluminación regulable y acceso a sala de reuniones. La suite ideal para quienes combinan trabajo y descanso.",
        price: 2300,
        capacity: "2 personas",
        size: "38 m²",
        image: imgAlberca,
        amenities: ["Wi-Fi", "TV", "Aire Acondicionado", "Café", "Baño Privado"],
    },
    {
        id: 12,
        name: "Habitación Sahuayo",
        category: "Colonial",
        badge: "premium",
        description: "Estilo colonial michoacano con vigas de madera y patio interior",
        longDescription: "Inspirada en la arquitectura colonial del estado, esta habitación cuenta con altos techos, vigas de madera y acceso a patio interior exclusivo.",
        price: 1600,
        capacity: "2–3 personas",
        size: "36 m²",
        image: imgLobby,
        amenities: ["Wi-Fi", "TV", "Café", "Baño Privado"],
    },
    {
        id: 13,
        name: "Suite Lázaro Cárdenas",
        category: "Suite Romántica Plus",
        badge: "suite",
        description: "Máximo romanticismo con bañera de hidromasaje y terraza privada",
        longDescription: "La suite más romántica del hotel. Incluye bañera de hidromasaje, terraza privada con vista al jardín y servicio de cena romántica a solicitud.",
        price: 2100,
        capacity: "2 personas",
        size: "44 m²",
        image: imgBoda,
        amenities: ["Wi-Fi", "TV", "Aire Acondicionado", "Café", "Baño Privado"],
    },
];

const amenityIcons: Record<string, React.ElementType> = {
    "Wi-Fi": Wifi,
    "TV": Tv,
    "Aire Acondicionado": Wind,
    "Café": Coffee,
    "Baño Privado": Bath,
    "Zona de Estar": Users,
    "Estacionamiento": Car,
    "Gimnasio": Dumbbell,
};

const amenityLabels: Record<string, string> = {
    "Wi-Fi": "Wi-Fi",
    "TV": "Smart TV",
    "Aire Acondicionado": "A/C",
    "Café": "Café",
    "Baño Privado": "Baño",
    "Zona de Estar": "Sala",
    "Estacionamiento": "Parking",
    "Gimnasio": "Gym",
};

function RoomCard({ room }: { room: Room }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleReserve = () => {
        if (isAuthenticated) {
            navigate('/reservations', { state: { roomName: room.name, price: room.price } });
        } else {
            navigate('/login', { state: { from: '/reservations', roomName: room.name } });
        }
    };

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group border border-purple-100/60 flex flex-col">
            {/* Image */}
            <div className="relative h-56 overflow-hidden shrink-0">
                <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badge */}
                <span className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-semibold tracking-wide shadow ${badgeStyles[room.badge]}`}>
                    {room.category}
                </span>

                {/* Price */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-purple-900 px-3 py-1 rounded-full shadow-md">
                    <span className="text-sm font-bold">${room.price.toLocaleString()}</span>
                    <span className="text-xs text-purple-500">/noche</span>
                </div>

                {/* Size on hover */}
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white/90 text-purple-900 text-xs px-2 py-1 rounded-full font-medium">
                        {room.size}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2 gap-2">
                    <h3 className="text-xl text-purple-900 leading-tight">{room.name}</h3>
                    <div className="flex items-center gap-1 shrink-0">
                        <Star size={13} className="text-amber-500 fill-amber-500" />
                        <span className="text-xs text-gray-500">4.9</span>
                    </div>
                </div>

                <p className="text-sm text-gray-500 mb-3 leading-relaxed">{room.description}</p>

                {/* Capacity */}
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                    <Users size={14} className="text-purple-600" />
                    <span>{room.capacity}</span>
                    <span className="text-gray-300">·</span>
                    <Bed size={14} className="text-purple-600" />
                    <span>{room.size}</span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {room.amenities.map((amenity) => {
                        const Icon = amenityIcons[amenity] || Coffee;
                        return (
                            <div
                                key={amenity}
                                className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full text-xs border border-purple-100"
                            >
                                <Icon size={11} />
                                <span>{amenityLabels[amenity] ?? amenity}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Long description */}
                <p className="text-xs text-gray-400 mb-5 leading-relaxed flex-1">{room.longDescription}</p>

                {/* CTA */}
                <button
                    onClick={handleReserve}
                    className="w-full bg-gradient-to-r from-purple-900 to-purple-700 hover:from-purple-950 hover:to-purple-800 text-white py-3 rounded-xl transition-all shadow-md hover:shadow-purple-300/50 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                    <Sparkles size={15} />
                    <span className="text-sm font-medium">Reservar Habitación</span>
                </button>
            </div>
        </div>
    );
}

export function RoomsPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-purple-50/10 to-background">
            <Header />

            {/* Hero Banner */}
            <div className="relative pt-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800" />
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-purple-200 hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">Volver al inicio</span>
                    </button>

                    <div className="inline-flex items-center gap-2 mb-5 px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                        <Sparkles size={14} className="text-amber-400" />
                        <span className="text-white/90 text-sm tracking-wider uppercase">Hotel Quinta Dalam</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-5 font-serif drop-shadow-lg">
                        Nuestras Habitaciones
                    </h1>
                    <p className="text-purple-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        13 espacios únicos diseñados para brindarte la mejor experiencia de hospedaje en el corazón de Michoacán
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 mt-12">
                        {[
                            { label: "Habitaciones", value: "13" },
                            { label: "Calificación", value: "4.9★" },
                            { label: "Huéspedes Felices", value: "+500" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-3xl text-white mb-1">{stat.value}</div>
                                <div className="text-purple-300 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-3">
                    <span className="text-sm text-gray-500 mr-1">Mostrar:</span>
                    {([
                        { label: 'Todas', count: 13 },
                        { label: 'Suites', count: 7 },
                        { label: 'Estándar', count: 3 },
                        { label: 'Premium', count: 3 },
                    ] as const).map((filter) => (
                        <button
                            key={filter.label}
                            className="px-4 py-1.5 rounded-full text-sm border border-purple-200 text-purple-700 hover:bg-purple-700 hover:text-white hover:border-purple-700 transition-all first:bg-purple-800 first:text-white first:border-purple-800"
                        >
                            {filter.label}
                            <span className="ml-1.5 text-xs opacity-70">({filter.count})</span>
                        </button>
                    ))}
                    <div className="ml-auto text-sm text-gray-400">
                        Desde <span className="text-purple-800 font-semibold">$1,500</span>/noche
                    </div>
                </div>
            </div>

            {/* Rooms Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Featured room - full width */}
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 mb-6">
                        <div className="h-px w-8 bg-purple-300" />
                        <span className="text-purple-700 text-sm uppercase tracking-widest">Destacada</span>
                        <div className="h-px w-8 bg-purple-300" />
                    </div>

                    <FeaturedRoomCard room={rooms[3]} />
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
                    <span className="text-purple-600 text-sm uppercase tracking-widest">Todas las habitaciones</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
                </div>

                {/* Grid: all 12 remaining rooms */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                    {rooms.filter((r) => r.id !== 4).map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 text-center bg-gradient-to-br from-purple-900 to-purple-800 rounded-3xl p-12 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 pointer-events-none"
                        style={{ backgroundImage: `radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 80%, white 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
                    />
                    <div className="relative z-10">
                        <Sparkles size={32} className="text-amber-400 mx-auto mb-4" />
                        <h2 className="text-3xl md:text-4xl mb-3 font-serif">¿No encuentras lo que buscas?</h2>
                        <p className="text-purple-200 mb-8 max-w-lg mx-auto">
                            Contáctanos directamente y diseñaremos una estancia personalizada perfecta para ti
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={() => navigate('/reservations')}
                                className="bg-white text-purple-900 px-8 py-3 rounded-xl hover:bg-purple-50 transition-all shadow-lg"
                            >
                                Ver disponibilidad
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/', { state: { irAContacto: true } });
                                }}
                                className="border border-white/40 text-white px-8 py-3 rounded-xl hover:bg-white/10 transition-all"
                            >
                                Contactar al hotel
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function FeaturedRoomCard({ room }: { room: Room }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleReserve = () => {
        if (isAuthenticated) {
            navigate('/reservations', { state: { roomName: room.name, price: room.price } });
        } else {
            navigate('/login', { state: { from: '/reservations', roomName: room.name } });
        }
    };

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-purple-100/60 flex flex-col lg:flex-row group">
            {/* Image */}
            <div className="relative h-72 lg:h-auto lg:w-1/2 overflow-hidden shrink-0">
                <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 hidden lg:block" />
                <span className={`absolute top-4 left-4 text-xs px-3 py-1.5 rounded-full font-semibold tracking-wide shadow-md ${badgeStyles[room.badge]}`}>
                    {room.category}
                </span>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                        <span className="text-xs text-gray-400 ml-1">Mejor valorada</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl text-purple-900 mb-3 font-serif">{room.name}</h2>
                    <p className="text-gray-500 mb-5 leading-relaxed max-w-lg">{room.longDescription}</p>

                    <div className="flex items-center gap-4 mb-5 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <Users size={15} className="text-purple-600" />
                            <span>{room.capacity}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Bed size={15} className="text-purple-600" />
                            <span>{room.size}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {room.amenities.map((amenity) => {
                            const Icon = amenityIcons[amenity] || Coffee;
                            return (
                                <div key={amenity} className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-xs border border-purple-100">
                                    <Icon size={12} />
                                    <span>{amenityLabels[amenity] ?? amenity}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <div className="text-3xl text-purple-900">${room.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">por noche · impuestos incluidos</div>
                    </div>
                    <button
                        onClick={handleReserve}
                        className="bg-gradient-to-r from-purple-900 to-purple-700 hover:from-purple-950 hover:to-purple-800 text-white px-8 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-purple-300/40 active:scale-95 flex items-center gap-2"
                    >
                        <Sparkles size={16} />
                        <span>Reservar Ahora</span>
                    </button>
                </div>
            </div>
        </div>
    );
}