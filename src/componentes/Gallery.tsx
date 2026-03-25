import { ImageWithFallback } from './figma/ImageWithFallback';

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1691819989627-3e568cd2119e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    alt: "Suite Deluxe"
  },
  {
    url: "https://images.unsplash.com/photo-1733253870497-e9118f4b575e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    alt: "Habitación Ejecutiva"
  },
  {
    url: "https://images.unsplash.com/photo-1733253870467-86e2ee714ed5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    alt: "Zona común"
  },
  {
    url: "https://images.unsplash.com/photo-1578345535994-b6f7d1fa5b31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    alt: "Vista exterior"
  },
  {
    url: "https://images.unsplash.com/photo-1733253870445-a969301c8943?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    alt: "Detalles"
  },
  {
    url: "https://images.unsplash.com/photo-1691819989627-3e568cd2119e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    alt: "Habitación"
  }
];

export function Gallery() {
  return (
    <section id="galeria" className="py-20 bg-gradient-to-b from-muted/40 via-muted/10 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20">
            <span className="text-primary font-medium">Galería</span>
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
              className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all group cursor-pointer aspect-square border border-border"
            >
              <ImageWithFallback
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white text-lg font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}