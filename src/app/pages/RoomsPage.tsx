import { useState, useEffect, useMemo } from 'react';
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

const defaultImages = [
    imgQuencio, imgParacho, imgMorelia, imgJanitzio,
    imgAlberca, imgEntrada, imgLobby, imgPaisaje,
    imgPatio, imgRestaurante, imgSalaLobby, imgSalaLobby2, imgBoda
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

                {/* Price pill */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="font-bold text-purple-900">${room.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-500 ml-1">/noche</span>
                </div>
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-serif text-purple-900 leading-tight">{room.name}</h3>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-1.5">
                        <Users size={16} className="text-purple-600/70" />
                        <span>{room.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Bed size={16} className="text-purple-600/70" />
                        <span>{room.size}</span>
                    </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.slice(0, 3).map((amenity) => {
                        const Icon = amenityIcons[amenity] || Coffee;
                        return (
                            <div key={amenity} className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                                <Icon size={12} className="text-purple-500" />
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

    const [dbRooms, setDbRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter States
    const [activeCategory, setActiveCategory] = useState("Todas");
    const [maxPrice, setMaxPrice] = useState(5000); // Default, updated on load
    const [absoluteMaxPrice, setAbsoluteMaxPrice] = useState(5000);
    const [minCapacity, setMinCapacity] = useState(1);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/habitaciones');
                const data = await res.json();

                const formattedRooms: Room[] = data.map((room: any, idx: number) => {
                    const tipoLow = room.tipo.toLowerCase();
                    let groupCategory = 'Estándar';
                    if (tipoLow.includes('suite')) groupCategory = 'Suites';
                    else if (tipoLow.includes('premium') || tipoLow.includes('deluxe') || tipoLow.includes('presidencial') || tipoLow.includes('principal')) groupCategory = 'Premium';

                    return {
                        id: room.id,
                        name: `${room.nombre || room.tipo} #${room.numero}`,
                        category: groupCategory, // Grouping to avoid 12 buttons
                        badge: tipoLow.includes('suite') ? 'suite' : (groupCategory === 'Premium' ? 'premium' : 'standard'),
                        description: room.descripcion.substring(0, 100) + (room.descripcion.length > 100 ? "..." : ""),
                        longDescription: room.descripcion,
                        price: room.precio,
                        capacity: `${room.capacidad} personas`,
                        size: "35 m²",
                        image: defaultImages[idx % defaultImages.length],
                        amenities: ["Wi-Fi", "TV", "Baño Privado"]
                    };
                });

                const maxP = Math.max(...formattedRooms.map(r => Number(String(r.price).replace(/[^0-9.-]+/g, ""))));
                const roundedMaxP = Math.ceil((isNaN(maxP) || maxP === -Infinity ? 5000 : maxP) / 1000) * 1000;
                setAbsoluteMaxPrice(roundedMaxP > 0 ? roundedMaxP : 10000);
                setMaxPrice(roundedMaxP > 0 ? roundedMaxP : 10000);

                setDbRooms(formattedRooms);
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener habitaciones:", error);
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    // Memoize the derived filter collections
    const { categories, categoryCounts, filteredRooms } = useMemo(() => {
        // Force these exactly 4 categories
        const cats = ["Todas", "Suites", "Premium", "Estándar"];
        const counts = cats.reduce((acc, cat) => {
            acc[cat] = cat === "Todas" ? dbRooms.length : dbRooms.filter(r => r.category === cat).length;
            return acc;
        }, {} as Record<string, number>);

        const filtered = dbRooms.filter(room => {
            const capacityNum = parseInt(room.capacity) || 1;
            const matchesCategory = activeCategory === "Todas" || room.category === activeCategory;
            const priceClean = Number(String(room.price).replace(/[^0-9.-]+/g, ""));
            const matchesPrice = priceClean <= maxPrice;
            const matchesCapacity = capacityNum >= minCapacity;
            return matchesCategory && matchesPrice && matchesCapacity;
        });

        return { categories: cats, categoryCounts: counts, filteredRooms: filtered };
    }, [dbRooms, activeCategory, maxPrice, minCapacity]);

    const featuredRoom = filteredRooms.find(r => r.category.toLowerCase().includes('suite')) || filteredRooms[0];
    const otherRooms = featuredRoom ? filteredRooms.filter(r => r.id !== featuredRoom.id) : [];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <p className="text-xl text-purple-800 animate-pulse font-semibold">Cargando nuestras habitaciones...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-purple-50/10 to-background flex flex-col">
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
                        {dbRooms.length} espacios únicos diseñados para brindarte la mejor experiencia de hospedaje en el corazón de Michoacán
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 mt-12">
                        {[
                            { label: "Habitaciones", value: dbRooms.length.toString() },
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
            <div className="sticky top-[72px] z-40 bg-white border-b border-purple-100 shadow-sm py-3 transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row flex-wrap items-center gap-4 lg:gap-8 justify-between">

                    <div className="flex items-center gap-2 flex-wrap flex-1">
                        <span className="text-sm text-gray-500 font-medium mr-1">Mostrar:</span>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm border transition-all ${activeCategory === cat
                                    ? 'bg-purple-800 text-white border-purple-800 shadow-md'
                                    : 'border-purple-200 text-purple-700 hover:bg-purple-700 hover:text-white hover:border-purple-700'
                                    }`}
                            >
                                {cat}
                                <span className="ml-1.5 text-xs opacity-70">({categoryCounts[cat]})</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center flex-wrap gap-4 bg-gray-50/80 p-2.5 rounded-2xl border border-gray-100">
                        {/* Huéspedes Filter */}
                        <div className="flex items-center gap-2 lg:pr-4">
                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">Personas:</span>
                            <select
                                value={minCapacity}
                                onChange={(e) => setMinCapacity(Number(e.target.value))}
                                className="bg-white border border-gray-200 shadow-sm text-sm font-medium rounded-lg px-3 py-1.5 outline-none text-purple-900 cursor-pointer focus:ring-2 focus:ring-purple-200 transition-all"
                            >
                                <option value={1}>1+ personas</option>
                                <option value={2}>2+ personas</option>
                                <option value={3}>3+ personas</option>
                                <option value={4}>4+ personas</option>
                                <option value={5}>5+ personas</option>
                            </select>
                        </div>

                        {/* Separator */}
                        <div className="hidden lg:block w-px h-8 bg-gray-200" />

                        {/* Price Filter */}
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">Precio Máximo</span>
                                <span className="text-sm text-purple-900 font-black leading-none">${maxPrice.toLocaleString()} <span className="text-xs font-normal text-gray-500">MXN</span></span>
                            </div>
                            <input
                                type="range"
                                min={500}
                                max={absoluteMaxPrice}
                                step={100}
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="w-24 lg:w-32 accent-purple-700 cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* Rooms Grid */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {filteredRooms.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-purple-100/50 shadow-sm">
                        <div className="text-6xl mb-6">🔍</div>
                        <h3 className="text-2xl font-serif text-purple-900 mb-2">No encontramos habitaciones</h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            Actualmente no hay habitaciones que coincidan con exactamente esos filtros (Categoría, Personas o Precio).
                        </p>
                        <button
                            onClick={() => { setActiveCategory("Todas"); setMaxPrice(absoluteMaxPrice); setMinCapacity(1); }}
                            className="bg-purple-100 text-purple-800 hover:bg-purple-200 font-medium px-6 py-2 rounded-xl transition-all"
                        >
                            Limpiar todos los filtros
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Featured room - full width */}
                        {featuredRoom && (
                            <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="inline-flex items-center gap-2 mb-6">
                                    <div className="h-px w-8 bg-purple-300" />
                                    <span className="text-purple-700 text-sm uppercase tracking-widest">
                                        {activeCategory === "Todas" ? "Destacada" : `Destacada en ${activeCategory}`}
                                    </span>
                                    <div className="h-px w-8 bg-purple-300" />
                                </div>

                                <FeaturedRoomCard room={featuredRoom} />
                            </div>
                        )}

                        {/* Divider */}
                        {otherRooms.length > 0 && (
                            <div className="flex items-center gap-4 mb-10 opacity-70">
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
                                <span className="text-purple-600/80 text-sm uppercase tracking-widest">
                                    {activeCategory === "Todas" ? "Todas las habitaciones" : `Más de ${activeCategory}`}
                                </span>
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
                            </div>
                        )}

                        {/* Grid */}
                        {otherRooms.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                                {otherRooms.map((room) => (
                                    <div key={room.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <RoomCard room={room} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

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
                                className="bg-white text-purple-900 px-8 py-3 rounded-xl hover:bg-purple-50 transition-all shadow-lg font-medium"
                            >
                                Ver disponibilidad
                            </button>
                            <button
                                onClick={() => { navigate('/', { state: { irAContacto: true } }); }}
                                className="border border-white/40 text-white px-8 py-3 rounded-xl hover:bg-white/10 transition-all font-medium"
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
                                <div key={amenity} className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-xs border border-purple-100 hover:bg-purple-100 transition-colors cursor-default">
                                    <Icon size={12} />
                                    <span>{amenityLabels[amenity] ?? amenity}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <div className="text-3xl text-purple-900 font-bold tracking-tight">${room.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">por noche · impuestos incluidos</div>
                    </div>
                    <button
                        onClick={handleReserve}
                        className="bg-gradient-to-r from-purple-900 to-purple-700 hover:from-purple-950 hover:to-purple-800 text-white px-8 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-purple-300/40 active:scale-95 flex items-center gap-2"
                    >
                        <Sparkles size={16} />
                        <span className="font-medium">Reservar Ahora</span>
                    </button>
                </div>
            </div>
        </div>
    );
}