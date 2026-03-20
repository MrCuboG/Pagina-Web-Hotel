import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Location() {
  return (
    <section id="ubicacion" className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-blue-100/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-600/10 to-blue-400/10 rounded-full border border-blue-400/30">
            <span className="text-primary">Ubicación</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">Encuéntranos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ubicados en el corazón de Michoacán, con fácil acceso a las principales atracciones
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 overflow-hidden h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160992127!2d-101.8714459!3d19.7035783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842d0e7adde2c0b%3A0x5c56badb1e55b573!2sMorelia%2C%20Michoac%C3%A1n!5e0!3m2!1ses!2smx!4v1647890123456!5m2!1ses!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-foreground">Dirección</h3>
                  <p className="text-muted-foreground">
                    Avenida Principal 123<br />
                    Colonia Centro, Morelia<br />
                    Michoacán, México CP 58000
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-foreground">Teléfono</h3>
                  <p className="text-muted-foreground">
                    +52 (443) 123-4567<br />
                    +52 (443) 765-4321
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-foreground">Horario de Atención</h3>
                  <p className="text-muted-foreground">
                    Recepción 24 horas<br />
                    Check-in: 3:00 PM<br />
                    Check-out: 12:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
