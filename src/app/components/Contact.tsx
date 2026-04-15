import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function Contact() {
  return (
    <section id="contacto" className="py-20 bg-gradient-to-b from-background via-purple-900/5 to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-purple-900/10 to-purple-700/10 rounded-full border border-purple-800/20">
            <span className="text-primary">Contacto</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">Estamos Aquí Para Ti</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Contáctanos para reservar o resolver cualquier duda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Phone className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-foreground">Teléfono</h3>
                <p className="text-muted-foreground">+52 (443) 123-4567</p>
                <p className="text-muted-foreground">+52 (443) 765-4321</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Mail className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-foreground">Correo Electrónico</h3>
                <p className="text-muted-foreground">info@quintadalam.com</p>
                <p className="text-muted-foreground">reservaciones@quintadalam.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <MapPin className="text-white" size={24} />
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

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Clock className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-foreground">Horario de Atención</h3>
                <p className="text-muted-foreground">
                  Recepción 24/7<br />
                  Check-in: 3:00 PM<br />
                  Check-out: 12:00 PM
                </p>
              </div>
            </div>
          </div>

          <div id="formulario-contacto" className="card-primary p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl mb-6 text-foreground">Envíanos un Mensaje</h3>
            <form className="space-y-6">
              <div>
                <label className="block mb-2 text-foreground">Nombre Completo</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block mb-2 text-foreground">Correo Electrónico</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block mb-2 text-foreground">Teléfono</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+52 (443) 123-4567"
                />
              </div>

              <div>
                <label className="block mb-2 text-foreground">Mensaje</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-purple-200/50 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-900 to-purple-800 hover:from-purple-950 hover:to-purple-900 text-white py-3 rounded-lg transition-all shadow-md"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}