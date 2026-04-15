import img1 from "../../imports/alberca.jpeg";
import img2 from "../../imports/paracho.jpg";
import img3 from "../../imports/salalobby2.jpg";
import img8 from "../../imports/paisaje.jpg";
import img9 from "../../imports/patio.jpg";
import img10 from "../../imports/entrada.jpg";


const galleryImages = [
  {
    url: img1,
    alt: "Hotel Quinta Dalam - Área de piscina"
  },
  {
    url: img2,
    alt: "Hotel Quinta Dalam - Habitación"
  },
  {
    url: img8,
    alt: "Hotel Quinta Dalam - Paisaje"
  },
  {
    url: img9,
    alt: "Hotel Quinta Dalam - Vista exterior"
  },
  {
    url: img10,
    alt: "Hotel Quinta Dalam - Detalles"
  },
  {
    url: img3,
    alt: "Hotel Quinta Dalam - Instalaciones"
  }
];

export function Gallery() {
  return (
    <section id="galeria" className="py-20 bg-gradient-to-b from-purple-900/10 via-purple-900/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-purple-900/10 to-purple-700/10 rounded-full border border-purple-800/20">
            <span className="text-primary">Galería</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">Conoce Nuestras Instalaciones</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora cada rincón de Quinta Dalam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all group cursor-pointer aspect-square border border-purple-500/20"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white text-lg">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}