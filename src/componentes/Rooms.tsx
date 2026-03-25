import { ImageWithFallback } from './figma/ImageWithFallback';
import { Bed, Users, Wifi, Coffee, Tv, Wind } from 'lucide-react';

const rooms = [
  {
    name: "Suite Deluxe",
    description: "Espacio amplio con vistas panorámicas y acabados de lujo",
    price: "$2,500",
    capacity: "2-3 personas",
    image: "https://scontent.fmlm4-1.fna.fbcdn.net/v/t39.30808-6/571367772_1399777252151879_6934786187178740549_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=51rxU2L7b_cQ7kNvwFXD-Bo&_nc_oc=AdqjTcrfzSYSKgv7VXNwECLrWknKiihtigQDqCa69dnEe0LwNxswZKI17MT57i5JWrc&_nc_zt=23&_nc_ht=scontent.fmlm4-1.fna&_nc_gid=LvflvEzVkpRASgeqLhmmng&_nc_ss=7a30f&oh=00_Afwu2CqfNgn13h2z8xznkMItqtoKI_k_h12-T4OvVOR7Yg&oe=69C391CB",
    amenities: ["Wi-Fi", "TV", "Aire Acondicionado", "Café"]
  },
  {
    name: "Habitación Ejecutiva",
    description: "Perfecta para viajes de negocios con escritorio y zona de trabajo",
    price: "$1,800",
    capacity: "2 personas",
    image: "https://scontent.fmlm4-1.fna.fbcdn.net/v/t39.30808-6/572122226_1399777705485167_2846229451321603989_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=xBOaNdGEwBMQ7kNvwGbuecp&_nc_oc=AdrpIp20FksJesUbprFgevrxFG53KKEFk0gXzWt9613CJ1jYLOHwJdbLEaWpho7U6II&_nc_zt=23&_nc_ht=scontent.fmlm4-1.fna&_nc_gid=wCBuY0Ex7kr4oOsbx_c2vA&_nc_ss=7a30f&oh=00_AfyMwnrjL8xJgn79q2TItdFOaTzX490GTfYrAhu072aEQg&oe=69C36138",
    amenities: ["Wi-Fi", "TV", "Escritorio", "Café"]
  },
  {
    name: "Habitación Familiar",
    description: "Espacio confortable para toda la familia con camas adicionales",
    price: "$2,200",
    capacity: "4-5 personas",
    image: "https://scontent.fmlm4-1.fna.fbcdn.net/v/t39.30808-6/571275208_1399777288818542_3304645827336700935_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=7NASR8KyxS4Q7kNvwElRFV0&_nc_oc=Ado0uQrnGim6PZWBUfYsUGhUWa-PKJvlvEd9pwlFR5kiHgCS6BWq3jnDeuQ3J7mU0gQ&_nc_zt=23&_nc_ht=scontent.fmlm4-1.fna&_nc_gid=hEXSsxbbXsPcBXRIm3F-nQ&_nc_ss=7a30f&oh=00_Afz--VUdEKBBJm2d2q_zEArdUxMvdx3Mt-Y8YOq67IwoqQ&oe=69C38219",
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
  return (
    <section id="habitaciones" className="py-20 bg-gradient-to-b from-background via-muted/20 to-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20">
            <span className="text-primary font-medium">Nuestras Habitaciones</span>
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
              className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all transform hover:-translate-y-2 border border-border"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium shadow-md shadow-primary/30">
                  {room.price}/noche
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl mb-2 text-card-foreground font-medium">{room.name}</h3>
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
                        className="flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full text-sm text-muted-foreground border border-border"
                      >
                        <Icon size={14} className="text-primary" />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                </div>

                <button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-primary-foreground py-3 rounded-lg transition-all shadow-md shadow-primary/20 font-medium">
                  Ver Disponibilidad
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}