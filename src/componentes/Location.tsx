import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Location() {
  return (
    <section id="ubicacion" className="py-20 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20">
            <span className="text-primary font-medium">Ubicación</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">Encuéntranos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ubicados en el corazón de Michoacán, con fácil acceso a las principales atracciones
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card backdrop-blur-sm rounded-2xl shadow-xl border border-border overflow-hidden h-[400px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4617.742330001387!2d-101.58925599999999!3d19.847065999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDUwJzQ5LjQiTiAxMDHCsDM1JzIxLjMiVw!5e1!3m2!1ses-419!2smx!4v1774397336478!5m2!1ses-419!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="space-y-6">
            <div className="bg-card p-8 rounded-2xl shadow-md hover:shadow-lg hover:shadow-primary/5 transition-all border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-primary/20">
                  <MapPin size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-foreground font-medium">Dirección</h3>
                  <p className="text-muted-foreground">
                    Carretera Quinceo 123<br />
                    Colonia Centro, Quinceo<br />
                    Michoacán, México CP 58149
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-md hover:shadow-lg hover:shadow-primary/5 transition-all border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-primary/20">
                  <Phone size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-foreground font-medium">Teléfono</h3>
                  <p className="text-muted-foreground">
                    +52 (443) 123-4567<br />
                    +52 (443) 765-4321
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-md hover:shadow-lg hover:shadow-primary/5 transition-all border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-primary/20">
                  <Clock size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-foreground font-medium">Horario de Atención</h3>
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