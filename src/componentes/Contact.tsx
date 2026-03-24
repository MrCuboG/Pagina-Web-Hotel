import { Phone, Mail, MapPin, Clock } from 'lucide-react';



export function Contact() {
  return (
    <section id="contacto" className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-blue-100/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-600/10 to-blue-400/10 rounded-full border border-blue-400/30">
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
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Phone className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-foreground">Teléfono</h3>
                <p className="text-muted-foreground">+52 (443) 123-4567</p>
                <p className="text-muted-foreground">+52 (443) 765-4321</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Mail className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-foreground">Correo Electrónico</h3>
                <p className="text-muted-foreground">info@quintadalam.com</p>
                <p className="text-muted-foreground">reservaciones@quintadalam.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-foreground">Dirección</h3>
                <p className="text-muted-foreground">
                  Av. Principal #123<br />
                  Morelia, Michoacán<br />
                  C.P. 58000, México
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
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

          <div className="bg-gradient-to-br from-blue-50/50 to-white p-8 rounded-2xl border border-blue-100 shadow-xl">
            <h3 className="text-2xl mb-6 text-foreground">Envíanos un Mensaje</h3>
            <form className="space-y-6">
              <div>
                <label className="block mb-2 text-foreground">Nombre Completo</label>
                <input
                  id='MenNombre'
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-blue-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block mb-2 text-foreground">Correo Electrónico</label>
                <input
                  id='MenEmail' 
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-blue-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block mb-2 text-foreground">Teléfono</label>
                <input
                  id='MenTelefono' 
                  type="number"
                  className="w-full px-4 py-3 rounded-lg border border-blue-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+52 (443) 123-4567"
                />
              </div>

              <div>
                <label className="block mb-2 text-foreground">Mensaje</label>
                <textarea
                  id='MenMensaje'
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-blue-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                ></textarea>
              </div>

              <button
                type='button'              
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 rounded-lg transition-all shadow-md"
                onClick={(e) => {
                  e.preventDefault
                  if (VerificarFormulario()) {
                    document.getElementById('message')?.classList.remove('hidden');
                    document.getElementById('messageError')?.classList.add('hidden');
                    document.getElementById('MenNombre')?.setAttribute('value', ' ');
                    document.getElementById('MenEmail')?.setAttribute('value', ' ');
                    document.getElementById('MenTelefono')?.setAttribute('value', ' ');
                    document.getElementById('MenMensaje')?.setAttribute('value', ' ');
                  }else{
                    document.getElementById('messageError')?.classList.remove('hidden');
                    document.getElementById('message')?.classList.add('hidden');
                  }
                }}
              >
                Enviar Mensaje
              </button>
              <div id="message" className="text-green-500 font-medium hidden">
                El mensaje se ha enviado correctamente.
              </div>
              <div id="messageError" className="text-red-500 font-medium hidden">
                Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function VerificarFormulario() {
  const nombre = (document.getElementById('MenNombre') as HTMLInputElement).value.trim();
  const email = (document.getElementById('MenEmail') as HTMLInputElement).value.trim();
  const telefono = (document.getElementById('MenTelefono') as HTMLInputElement).value.trim();
  const mensaje = (document.getElementById('MenMensaje') as HTMLTextAreaElement).value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telefonoRegex = /^\+?\d{10,15}$/;

  if (nombre.length === 0) {
    alert('El nombre no puede estar vacío.');
    return false;
  }

  if (!emailRegex.test(email)) {
    alert('Por favor, ingresa un correo electrónico válido.');
    return false;
  }

  if (!telefonoRegex.test(telefono)) {
    alert('Por favor, ingresa un número de teléfono válido.');
    return false;
  }

  if (mensaje.length === 0) {
    alert('El mensaje no puede estar vacío.');
    return false;
  }

  return true;
}
