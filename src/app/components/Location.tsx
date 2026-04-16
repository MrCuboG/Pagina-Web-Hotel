import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Location() {
  return (
    <section id="ubicacion" className="py-20 bg-gradient-to-b from-background via-purple-900/5 to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-purple-900/10 to-purple-700/10 rounded-full border border-purple-800/20">
            <span className="text-primary">Ubicación</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">Encuéntranos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ubicados en el corazón de Michoacán, con fácil acceso a las principales atracciones
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card-primary rounded-2xl shadow-xl overflow-hidden h-[400px]">
            <iframe src="https://www.google.com/maps/embed?pb=!4v1776210774143!6m8!1m7!1sO8lTOA5ZlgZYOboFL7BPfw!2m2!1d19.84700190326442!2d-101.5889461713184!3f296.34249618321957!4f7.390766869488999!5f0.7820865974627469" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>

          <div className="space-y-6">
            <div className="card-primary p-8 rounded-2xl shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-foreground">Dirección</h3>
                  <p className="text-muted-foreground">
                    Carretera Coeneo<br />
                    Colonia Centro, Quencio<br />
                    Michoacán, México CP 61800
                  </p>
                </div>
              </div>
            </div>

            <div className="card-primary p-8 rounded-2xl shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl flex items-center justify-center flex-shrink-0">
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

            <div className="card-primary p-8 rounded-2xl shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl flex items-center justify-center flex-shrink-0">
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