import { Wifi, Coffee, Utensils, Car, Dumbbell, Waves } from 'lucide-react';

const services = [
  {
    icon: Wifi,
    title: "Wi-Fi de Alta Velocidad",
    description: "Conexión a internet gratuita en todas las áreas"
  },
  {
    icon: Coffee,
    title: "Desayuno Incluido",
    description: "Desayuno buffet con platillos regionales"
  },
  {
    icon: Utensils,
    title: "Restaurante",
    description: "Gastronomía michoacana y cocina internacional"
  },
  {
    icon: Car,
    title: "Estacionamiento",
    description: "Estacionamiento privado y vigilado 24/7"
  },
  {
    icon: Dumbbell,
    title: "Gimnasio",
    description: "Equipamiento moderno para tu entrenamiento"
  },
  {
    icon: Waves,
    title: "Piscina",
    description: "Alberca climatizada con área de relajación"
  }
];

export function Services() {
  return (
    <section id="servicios" className="py-20 bg-gradient-to-b from-white via-purple-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-purple-900/10 to-purple-700/10 rounded-full border border-purple-800/20">
            <span className="text-primary">Servicios</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">Todo lo que Necesitas</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Disfruta de nuestros servicios premium diseñados para tu comodidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-purple-50/30 to-white rounded-2xl border border-purple-200/40 hover:border-purple-300/60 transition-all hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}