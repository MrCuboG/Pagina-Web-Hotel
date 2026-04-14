Especificación de requisitos de
software
Proyecto: Desarrollo Web - QUINTA DALAM
Revisión [1]
09 de febrero del 2025
Instrucciones para el uso de este formato
Este formato es una plantilla tipo para documentos de requisitos del software.
Está basado y es conforme con el estándar IEEE Std 830-1998.
Las secciones que no se consideren aplicables al sistema descrito podrán de forma justificada indicarse como no aplicables (NA).
Notas:
Los textos en color azul son indicaciones que deben eliminarse y, en su caso, sustituirse por los contenidos descritos en cada apartado.
Los textos entre corchetes del tipo “[Inserte aquí el texto]” permiten la inclusión directa de texto con el color y estilo adecuado a la sección, al pulsar sobre ellos con el puntero del ratón.
Los títulos y subtítulos de cada apartado están definidos como estilos de MS Word, de forma que su numeración consecutiva se genera automáticamente según se trate de estilos “Titulo1, Titulo2 y Titulo3”.
La sangría de los textos dentro de cada apartado se genera automáticamente al pulsar Intro al final de la línea de título. (Estilos Normal indentado1, Normal indentado 2 y Normal indentado 3).
El índice del documento es una tabla de contenido que MS Word actualiza tomando como criterio los títulos del documento.
Una vez terminada su redacción debe indicarse a Word que actualice todo su contenido para reflejar el contenido definitivo.
De la plantilla de formato del documento © & Coloriuris http://www.qualitatis.org
.
Historial de Revisiones
Fecha
Revisión
Descripción
Autor
05/2/2026
1.0
“Requerimientos de interfaz”
Eduardo Lopez
06/2/2026
1.1
“Requerimientos de Interfaz”
Luis Antonio
Documento validado por las partes en fecha: [Fecha]
Por el cliente
Por la empresa suministradora
Fdo. D./ Dña [Nombre]
Fdo. D./Dña [Nombre]
HOTEL DALAM
Especificación de requisitos de software
Rev. 1.1
Pág. 4
Descripción de requisitos del sofware
Contenido
FICHA DEL DOCUMENTO ¡ERROR! MARCADOR NO DEFINIDO.
CONTENIDO 4
1 INTRODUCCIÓN 6
1.1 Propósito 6
1.2 Alcance 6
1.3 Personal involucrado 7
1.4 Definiciones, acrónimos y abreviaturas 8
1.5 Referencias 8
1.6 Resumen 9
2 DESCRIPCIÓN GENERAL 9
2.1 Perspectiva del producto 9
2.2 Funcionalidad del producto 10
2.3 Características de los usuarios 10
2.4 Restricciones 11
2.5 Suposiciones y dependencias 12
2.6 Evolución previsible del sistema 13
3 REQUISITOS ESPECÍFICOS 13
3.1 Requisitos comunes de los interfaces 13
3.1.1 Interfaces de usuario 14
3.1.2 Interfaces de hardware 15
3.1.3 Interfaces de software 15
3.1.4 Interfaces de comunicación 16
3.2 Requisitos funcionales 16
3.2.1 Requisito funcional 1 ¡Error! Marcador no definido.
3.2.2 Requisito funcional 2 ¡Error! Marcador no definido.
3.2.3 Requisito funcional 3 ¡Error! Marcador no definido.
3.2.4 Requisito funcional n ¡Error! Marcador no definido.
3.3 Requisitos no funcionales 17
3.3.1 Requisitos de rendimiento 17
3.3.2 Seguridad 17
3.3.3 Fiabilidad 17
3.3.4 Disponibilidad 17
3.3.5 Mantenibilidad 17
HOTEL DALAM
Especificación de requisitos de software
Rev. 1.1
Pág. 5
Descripción de requisitos del sofware
3.3.6 Portabilidad 17
3.4 Otros requisitos 18
4 APÉNDICES 18
HOTEL DALAM
Especificación de requisitos de software
Rev. 1.1
Pág. 6
Descripción de requisitos del sofware
1. Introducción
La presente Especificación de Requisitos de Software (SRS) describe de manera detallada
los requerimientos funcionales y no funcionales del Sistema de Reservación para Hotel
QUINTA DALAM. Este documento tiene como objetivo definir las características,
funcionalidades y restricciones del sistema, que permitirá mejorar la eficiencia en la
atención de los clientes.
El sistema propuesto busca automatizar los procesos administrativos brindando una
herramienta tecnológica que facilite el trabajo del personal administrativo, mejore la
experiencia del cliente y asegure una correcta gestión de usuarios, Este documento está
dirigido a todas las partes interesadas del proyecto, incluyendo los desarrolladores,
analistas, personal reservativo y administradores del hotel, y servirá como base para el
desarrollo, validación y mantenimiento del sistema.
1.1 Propósito
El propósito de este documento es definir de manera clara y detallada los requisitos
funcionales y no funcionales del Sistema de reservación del Hotel. Este sistema tiene
como objetivo automatizar y optimizar los procesos administrativos, de reserva y
comunicación entre el cliente con el personal. El documento servirá como referencia
para el equipo de desarrollo de software, los analistas de sistemas, los encargados de
pruebas, y los usuarios finales involucrados en el proyecto. Asimismo, será utilizado para
validar que el producto final cumpla con las necesidades y expectativas del hotel.
Audiencia objetivo:
• Clientes y directivos del hotel: Para verificar que el sistema cubra los requerimientos del
negocio
• Desarrolladores y diseñadores de software: Para implementar las funcionalidades
descritas.
• Equipo de aseguramiento de calidad: Para diseñar y ejecutar los casos de prueba.
• Personal de reservación y administrativo: Como usuarios finales que interactuarán
directamente con el sistema.
1.2 Alcance
El sistema web para el Hotel QUINTA DALAM será una plataforma integral diseñada
para centralizar la gestión operativa y comercial del establecimiento. El software
abarcará desde la interacción inicial del cliente hasta el control administrativo interno,
enfocándose en tres pilares principales: experiencia del usuario, automatización de
reservas y control de inventario de habitaciones.
El sistema incluirá las siguientes capacidades principales:
• Módulo de Reservaciones en Línea: Interfaz para que los huéspedes consulten
disponibilidad en tiempo real, seleccionen tipos de habitaciones y realicen reservaciones
mediante un formulario intuitivo.
• Gestión de Habitaciones (Back-office): Herramientas para que el personal
administrativo pueda dar de alta, modificar o dar de baja habitaciones, gestionar precios
por temporada y estados de limpieza/mantenimiento.
• Panel Administrativo: Control de usuarios con diferentes niveles de acceso
(Administrador, Recepcionista) y generación de reportes básicos de ocupación e
ingresos.
• Comunicación con el Cliente: Sistema automático de confirmación de reservaciones
vía correo electrónico.
HOTEL DALAM
Especificación de requisitos de software
Rev. 1.1
Pág. 7
Descripción de requisitos del sofware
• Interfaz Adaptable (Responsive): El sistema será accesible tanto desde
computadoras de escritorio como desde dispositivos móviles, garantizando una
navegación fluida para el cliente.
1.3 Personal involucrado
A continuación, se presenta la relación de personas involucradas en el desarrollo e
implementación del sistema para el Hotel QUINTA DALAM, con su rol, categoría
profesional, responsabilidades, información de contacto y aprobación correspondiente.
Esta información permitirá localizar a los participantes y recabar información necesaria
para la obtención de requisitos, validaciones y seguimiento del proyecto.
1.1.1. Gerente del proyecto
CAMPO INFORMACION
Nombre
Rol
Categoría Profesional
Responsabilidades
Información de contacto
Aprobación
1.1.2. Desarrollador
CAMPO INFORMACION
Nombre Eduardo López Martínez
Rol Analista de requisitos / Programador
Categoría Profesional Ingeniero de sistemas
computacionales
Responsabilidades
1.- Recopilar requisitos funcionales y
no funcionales del sistema.
2.- Validar los requisitos con el
personal administrativo del hotel.
3.- Participar en revisiones y
aprobaciones de cambios en
requisitos.
4.- Asegurar la coherencia entre los
requisitos y los objetivos del
proyecto
Información de contacto L23121083@morelia.tecnm.mx
Aprobación Desarrollo de Software
1.1.3. Desarrollador
CAMPO INFORMACION
Nombre Luis Antonio Arguello Escutia
Rol Analista de requisitos / Programador
HOTEL DALAM
Especificación de requisitos de software
Rev. 1.1
Pág. 8
Descripción de requisitos del sofware
Categoría Profesional Ingeniero de sistemas
computacionales
Responsabilidades
1.- Recopilar requisitos funcionales
y no funcionales del sistema.
2.- Validar los requisitos con el
personal administrativo del hotel.
3.- Participar en revisiones y
aprobaciones de cambios en
requisitos.
4.- Asegurar la coherencia entre los
requisitos y los objetivos del
proyecto
Información de contacto correo
Aprobación Desarrollo de Software
1.1.4. Recepcionista Senior
CAMPO INFORMACION
Nombre Lizeth García Tinajero
Rol Validador Operativo
Categoría Profesional Atención al cliente
Responsabilidades
1.- Validar la usabilidad de la interfaz
de reservaciones.
2.- Probar el sistema en condiciones
reales de operación
3.- Reportar incidencias o mejoras en
el flujo de comunicación con el
cliente.
4.- Proporcionar detalles sobre el
flujo diario de entradas y salidas
(Check-in/Check-out).
Información de contacto lizethGT@morelia.tecnm.mx
Aprobación Gerencia de Operaciones
1.4 Definiciones, acrónimos y abreviaturas
A continuación, se presentan los términos, acrónimos y abreviaturas utilizados en este
documento, para asegurar una interpretación clara y uniforme del contenido.
HOTEL DALAM
Especificación de requisitos de software
Rev. 1.1
Pág. 9
Descripción de requisitos del sofware
Termino / Acrónimo Definición
QUINTA DALAM Nombre asignado a la organización hotelera
IDE
[Entorno de Desarrollo Integrado] Es una
aplicación de software que combina
herramientas esenciales para programar en
un solo lugar
SRS
Software Requirements Specification.
Documento que describe los requisitos de
software del sistema.
SMTP Simple Mail Transfer Protocol. Es el estándar
técnico utilizado para el envío de correos
electrónicos a través de Internet
1.5 Referencias
Referencia Titulo Ruta Fecha Autor
REF.1 IEEE
Recommended
Practice for
Software
Requirements
Specifications
/docs/norma830.pdf 1998 IEEE
Computer
Society
SRS-QD Especificación
de Requisitos de
Software: Quinta
Dalam
Local /
Documentación_del_Proyecto
05/02/2026 Eduardo
López /
Luis
Arguello
UX-UI-QD Manual de
Identidad Visual
y Estilo Web
Quinta Dalam
Local / Recursos_de_Diseño 2026 Equipo de
Desarrollo
Web
1.6 Resumen
Este documento presenta la especificación detallada de los requisitos para el desarrollo
del sistema de reservaciones del Hotel QUINTA DALAM. Se describe el alcance del
proyecto, que incluye módulos de reservación en línea, gestión de inventario y un panel
administrativo. Además, define los roles de los usuarios involucrados (Administrador,
Recepcionista y Huésped) y las funciones específicas que cada uno desempeñará
dentro de la plataforma
2 Descripción general
El producto consiste en una plataforma web integral que servirá como el canal principal de
interacción digital entre el hotel y sus clientes. El sistema automatiza procesos críticos como
la consulta de disponibilidad en tiempo real, el registro de reservaciones y la gestión interna
de estados de habitación (limpieza y mantenimiento). Está diseñado para ser escalable,
permitiendo en un futuro la integración de pasarelas de pago y otros servicios adicionales.
2.1 Perspectiva del producto
El sistema se presenta como una plataforma web integral que actúa como el punto de
contacto digital principal entre el Hotel Quinta Dalam y sus clientes. No es solo un sitio
informativo, sino una aplicación web vinculada a una base de datos centralizada.
HOTEL DALAM
Especificación de requisitos de software
Rev. 1.1
Pág. 10
Descripción de requisitos del sofware
El producto consta de dos interfaces principales:
Frontend (Público): Accesible para cualquier usuario con internet, optimizado para
conversión de ventas y reservaciones.
Backend (Administrativo): Un panel privado donde el personal del hotel gestiona la
disponibilidad y los datos sin necesidad de herramientas externas.
El sistema se integrará con servicios de correo (SMTP) para notificaciones y está
diseñado para escalar hacia la integración de pagos en línea en etapas posteriores.
2.2 Funcionalidad del producto
El sistema web de la Quinta Dalam se organiza en módulos funcionales que permiten la
interacción fluida entre el cliente y el personal administrativo. A continuación, se detallan
las capacidades del sistema agrupadas por tipo de usuario:
Cliente / Huésped (Frontend)
l. Consulta de disponibilidad: Buscar habitaciones filtrando por fechas de
entrada y salida.
II. Visualización de catálogo: Explorar las categorías de habitaciones,
servicios y galerías de imágenes de la Quinta.
III. Registro de reservación: Completar el formulario de reserva con datos
personales y preferencias de hospedaje.
IV. Gestión de contacto: Enviar consultas o dudas directamente al personal
mediante formularios integrados.
Recepcionista (Back-office)
I. Control de habitaciones: Consultar y actualizar el estado de las
habitaciones (Disponible, Ocupada, En Limpieza o Mantenimiento).
II. Gestión de Check-in / Check-out: Registrar la entrada y salida física de
los huéspedes en el sistema.
III. Modificación de reservas: Editar o cancelar reservaciones existentes a
solicitud del cliente.
Administrador (Panel de Control)
I. Gestión de inventario y tarifas: Dar de alta o baja habitaciones y ajustar
precios según la temporada.
II. Control de usuarios: Crear y administrar cuentas para el personal,
asignando roles y permisos.
III. Generación de reportes: Visualizar estadísticas de ocupación e
ingresos mensuales.
Sistema (Procesos Automáticos)
I. Notificaciones por correo: Envío automático de confirmaciones de
reserva una vez finalizado el registro en la web.
II. Sincronización de disponibilidad: Actualización en tiempo real del
inventario para evitar sobreventas (overbooking).
[Agregar diagrama de casos de uso]
2.3 Características de los usuarios
En esta sección se describen los perfiles, habilidades y responsabilidades de los usuarios que
interactuarán con la plataforma web del hotel.
Tipo de usuario Formación y Habilidades Actividades principales
Administrador Perfil con formación en
administración o sistemas.
Posee conocimientos
avanzados en navegación
web y gestión de datos.
Gestionar cuentas de usuario,
configurar precios/tarifas por
temporada, supervisar
reportes de ingresos y
asegurar el funcionamiento
del servidor.
HOTEL DALAM
Especificación de requisitos de software
Rev. 1.1
Pág. 11
Descripción de requisitos del sofware
Recepcionista Nivel medio o técnico en
turismo, administración o
atención al cliente. Domina
herramientas informáticas
básicas y navegación web.
Gestionar el inventario de
habitaciones (Checkin/
Check-out), validar
reservaciones realizadas en
la web y atender dudas de
clientes.
Huésped (Cliente) No requiere formación técnica
específica. Solo necesita
habilidades básicas en el uso
de navegadores web y
dispositivos móviles.
Consultar disponibilidad,
visualizar galerías del hotel,
realizar reservaciones y
recibir confirmaciones por
correo electrónico.
Interfaz de usuario (UX/UI)
La interfaz para el Huésped debe ser minimalista y clara (preferiblemente en tonos que
representen al hotel), con iconos identificables para facilitar la navegación a personas con
cualquier nivel técnico.
Accesibilidad
El sistema debe ser inclusivo (sin discriminación), permitiendo que cualquier persona con un
registro previo o interés legítimo pueda acceder a la información y servicios.
2.4 Restricciones
Esta sección define las limitaciones técnicas y normativas que enmarcan el desarrollo de la
página web del hotel.
2.4.1 Restricciones de Hardware y Plataforma
• Dispositivos Finales: La plataforma debe ser funcional en computadoras de
escritorio, laptops, tablets y smartphones, garantizando una navegación fluida
independientemente del hardware.
• Resolución de Pantalla: La interfaz debe estar optimizada para resoluciones
mínimas de 360px (móviles) hasta 1080p (escritorio).
• Servidor de Despliegue: El sistema debe alojarse en un servidor con soporte
para bases de datos relacionales y ejecución de scripts de servidor.
2.4.2 Restricciones de Tecnología
• Entorno de Desarrollo: Se debe utilizar un IDE (Entorno de Desarrollo
Integrado) para la construcción del código fuente.
• Arquitectura: El sistema debe seguir un modelo de dos interfaces: un
Frontend público para clientes y un Backend privado para la administración.
• Protocolos de Comunicación: Es obligatorio el uso de protocolos SMTP para
el envío automático de confirmaciones de reservación por correo electrónico.
2.4.3 Restricciones de Estándares y Formatos
• Formato de Documentación: El desarrollo debe alinearse a lo establecido en
esta Especificación de Requisitos de Software (SRS)
HOTEL DALAM
Especificación de requisitos de software
Rev. 1.1
Pág. 12
Descripción de requisitos del sofware
• Estándares Web: El código debe cumplir con los estándares actuales de
HTML5 y CSS3 para asegurar la compatibilidad entre navegadores.
• Formatos de Datos: El intercambio de información entre el cliente y el servidor
debe asegurar la integridad de los datos de reservación y disponibilidad en
tiempo real.
2.4.4 Restricciones Legales y de Seguridad
• Control de Acceso: El sistema debe implementar niveles de acceso
diferenciados (Administrador y Recepcionista) para proteger la información
sensible del hotel.
• Privacidad de Datos: El manejo de información personal de los huéspedes en
los formularios de reserva debe cumplir con las normativas de protección de
datos vigentes.
2.4.5 Restricciones de Interfaz y Localización
• Estilo Visual: La interfaz debe ser intuitiva, clara y utilizar una paleta de
colores que represente la identidad del hotel.
• Idioma: El sistema estará localizado inicialmente en idioma español / ingles
para atender al mercado principal del hotel.
• Iconografía: Se deben utilizar iconos identificables que faciliten la navegación
a usuarios con cualquier nivel de habilidad técnica.
2.5 Suposiciones y dependencias
Factores asumidos y dependencias externas que pueden impactar el desarrollo de
sistema
2.5.1 Suposiciones • Infraestructura:
• Infraestructura: El sistema cuenta con hardware mínimo (PCs Windows 10+,
dispositivos Android 9.0+, 4GB RAM, impresoras) y conexión a internet
estable
• Personal: El personal como los recepcionistas recibirá capacitación y adoptará
el sistema digital
• Normativa: La Ley de Protección de Datos y clasificación CIE-10
permanecerán estables durante el desarrollo
2.5.2 Dependencias
• Tecnológicas: Java/Python, MySQL/SQLite, Apache/Tomcat (sujeto a
licencias y soporte)
• Plataformas: Compatibilidad continua de Windows 10+ y Android 9.0+
HOTEL DALAM
Especificación de requisitos de software
Rev. 1.1
Pág. 13
Descripción de requisitos del sofware
• Servicios externos: Servicio SMTP para notificaciones por correo
• Futuras: APIs de laboratorios y plataformas de telemedicina (integraciones
previstas)
2.6 Evolución previsible del sistema
Mejoras contempladas más allá del alcance inicial del sistema Hotel Dalam
2.6.1 Infraestructura y Escalabilidad
• Crecimiento de Datos: Se prevé que la base de datos centralizada sea capaz
de soportar un incremento constante en el histórico de reservaciones y
registros de huéspedes sin degradar el rendimiento del sistema.
• Escalabilidad de Módulos: El sistema está diseñado de forma modular para
permitir la integración futura de una pasarela de pagos en línea y servicios de
facturación electrónica sin necesidad de reescribir el núcleo del software.
• Capacidad de Carga: La infraestructura deberá ser capaz de manejar picos de
tráfico durante temporadas altas, asegurando que la consulta de disponibilidad
se mantenga fluida para múltiples usuarios simultáneos.
2.6.2 Comunicaciones y Conectividad
• Estabilidad del Servicio: El sistema requiere una conexión persistente a
internet para garantizar que la sincronización de disponibilidad entre el
Frontend y el Back-office sea instantánea, evitando errores de sobreventa.
• Automatización de Mensajería: Se prevé la evolución del módulo de
comunicación para incluir no solo el envío de correos electrónicos vía SMTP,
sino también notificaciones mediante otros canales digitales para mejorar la
experiencia del cliente.
• Protocolos de Seguridad: Las comunicaciones entre el cliente y el servidor
deberán estar protegidas para asegurar la integridad de los datos personales
enviados a través de los formularios de contacto y reserva.
3 Requisitos específicos
Este apartado describe las características compartidas por todas las interfaces del sistema
(Huésped, Recepcionista y Administrador) para garantizar coherencia y facilidad de uso
3.1 Requisitos comunes de los interfaces
El sistema contará con interfaces intuitivas y accesibles que permitan la interacción entre
los usuarios (administradores, recepcionistas y huéspedes) y el software. El sistema
procesará entradas y mostrará salidas de información relevantes al funcionamiento
operativo y comercial del hotel.
Entradas principales:
• Datos de huéspedes: Nombre, teléfono, correo electrónico y preferencias de
hospedaje.
HOTEL DALAM
Especificación de requisitos de software
Rev. 1.1
Pág. 14
Descripción de requisitos del sofware
• Datos de reservaciones: Fecha de entrada (Check-in), fecha de salida (Check-out) y
tipo de habitación seleccionada.
• Datos de habitaciones: Categoría, servicios incluidos, precios por temporada y estado
de mantenimiento.
• Datos administrativos: Registro de usuarios del personal, asignación de roles
(Administrador/Recepcionista) y gestión de inventario de habitaciones.
Salidas principales:
• Módulo de Reservaciones en Línea: Interfaz visual para la consulta de disponibilidad
en tiempo real por parte del cliente.
• Confirmaciones automáticas: Envío de correos electrónicos de confirmación una vez
finalizado el registro de reserva.
• Panel de Control (Back-office): Agenda actualizada de ocupación, estados de
limpieza de habitaciones y reportes básicos de ingresos mensuales.
3.1.1 Interfaces de usuario
Requisitos del interfaz de usuario:
• El sistema debe permitir el inicio de sesión diferenciado para médicos, pacientes y
administradores.
Numero de Requisito RF 1
Nombre de Requisito Inicio de sesión
Tipo X Requisito | Restricción
Fuentes del requisito Tener un sistema de inicio de sesión
eficaz dependiendo de tu rol
(Recepcionista, Cliente)
Prioridad del requisito X Alta/Esencial Media/Deseado Baja/
Opcional
• El usuario debe visualizar su menú personalizado según su rol.
Numero de Requisito RF 2
Nombre de Requisito Menú personalizado
Tipo X Requisito | Restricción
Fuentes del requisito Según el rol asignado tienes
disponibilidad a diferentes funciones
Prioridad del requisito X Alta/Esencial Media/Deseado Baja/
Opcional
• Las pantallas deben incluir botones de navegación visibles (“Guardar”, “Cancelar”,
“Editar”).
Numero de Requisito RF 3
Nombre de Requisito Botones funcionales
Tipo X Requisito Restricción
Fuentes del requisito Deben existir botones capaces de
hacer acciones como generar
reservación, cancelar, etc.
Prioridad del requisito X Alta/Esencial Media/Deseado Baja
HOTEL DALAM
Especificación de requisitos de software
Rev. 1.1
Pág. 15
Descripción de requisitos del sofware
Numero de Requisito RF 4
Nombre de Requisito Navegación de habitaciones
Tipo X Requisito Restricción
Fuentes del requisito Revisar las habitaciones dependiendo
del precio, capacidad y comodidad
Prioridad del requisito X Alta/Esencial Media/Deseado Baja/
Opcional
3.1.2 Interfaces de hardware
El sistema requerirá periféricos básicos:
• Teclado y mouse.
• Impresora para emitir facturas y contratos
Requisitos:
Numero de Requisito RHW 1
Nombre de Requisito Conexión eficiente
Tipo X Requisito Restricción
Fuentes del requisito Impresión de facturas y contratos
Prioridad del requisito X Alta/Esencial Media/Deseado Baja/
Opcional
Numero de Requisito RHW 2
Nombre de Requisito Almacenamiento físico / externo
Tipo X Requisito Restricción
Fuentes del requisito Almacenar datos de los clientes,
contratos, mantenimiento a
habitaciones, historiales, etc.
Prioridad del requisito X Alta/Esencial Media/Deseado Baja/
Opcional
3.1.3 Interfaces de software
El sistema se integrará con otros programas para mejorar su funcionalidad.
Productos de software utilizados a futuro:
▪ Base de datos: MySQL
▪ Lenguaje de desarrollo: HTML, CSS
▪ Servidores Web: Oracle o AWS
▪ Firmware: Boostrap
Numero de Requisito RSW 1
Nombre de Requisito Sistema de base de datos
Tipo X Requisito Restricción
Fuentes del requisito Guardar, Actualizar y Eliminar
información de los clientes /
trabajadores de la empresa
Prioridad del requisito X Alta/Esencial Media/Deseado Baja/
Opcional
Numero de Requisito RSW 2
Nombre de Requisito Generación de facturas
Tipo X Requisito Restricción
Fuentes del requisito Mantener un formato limpio y eficiente
para generar facturas
Prioridad del requisito X Alta/Esencial Media/Deseado Baja/
Opcional
HOTEL DALAM
Especificación de requisitos de software
Rev. 1.1
Pág. 16
Descripción de requisitos del sofware
Numero de Requisito RSW 3
Nombre de Requisito Respaldos
Tipo X Requisito Restricción
Fuentes del requisito Seguridad del sistema y
mantenimiento ante fallos
Prioridad del requisito X Alta/Esencial Media/Deseado Baja/
Opcional
3.1.4 Interfaces de comunicación
Numero de Requisito RCOM 1
Nombre de Requisito Transferencia de datos
Tipo X Requisito Restricción
Fuentes del requisito Proteger la información confidencial de
los cliente durante la transmisión de
datos cliente – servidor
Prioridad del requisito X Alta/Esencial Media/Deseado Baja/
Opcional
Numero de Requisito RCOM 2
Nombre de Requisito Contacto
Tipo X Requisito Restricción
Fuentes del requisito Comunicación eficiente con los
clientes
Prioridad del requisito X Alta/Esencial Media/Deseado Baja/
Opcional
Numero de Requisito RCOM 3
Nombre de Requisito Registro de actividad
Tipo X Requisito Restricción
Fuentes del requisito Necesidad de control interno y
trazabilidad del sistema
Prioridad del requisito X Alta/Esencial Media/Deseado Baja/
Opcional
3.2 Requisitos funcionales
Se definen las acciones funcionales que el sistema realizara para gestionar las
reservaciones y el hotel
Número de
requisito
Nombre de
requisito
Tipo Fuente del requisito Prioridad
RF 1 Gestión de
reservaciones
Requisito Formulario intuitivo de
reserva.
Alta
RF 2 Consulta de
disponibilidad
Requisito Filtros por fechas de
entrada/salida.
Alta
RF 3 Control de
habitaciones
Requisito Gestión de estados:
disponible, ocupada,
limpieza.
Alta
RF 4 Gestión de tarifas Requisito Ajuste de precios según
temporada.
Media
RF 5 Notificaciones
automáticas
Requisito Confirmación vía correo Media
HOTEL DALAM
Especificación de requisitos de software
Rev. 1.1
Pág. 17
Descripción de requisitos del sofware
3.3 Requisitos no funcionales
Se definen los atributos de calidad, restricciones y características de comportamiento de
un sistema (rendimiento, seguridad, usabilidad) en lugar de lo que el sistema hace.
3.3.1 Requisitos de rendimiento
3.3.2 Seguridad
Número de
requisito
Nombre de
requisito
Tipo Fuente del requisito Prioridad
RNF 3 Control de
acceso
Restricción Niveles de acceso restringidos por
rol (Admin/Recepcionista).
Alta
RNF 4 Registro de
actividad
Restricción Generación de "logs" para control
interno de transacciones.
Media
3.3.3 Fiabilidad
Número de
requisito
Nombre de
requisito
Tipo Fuente del requisito Prioridad
RNF 5 Integridad de
datos
Restricción Sincronización en tiempo real para
evitar sobreventas (overbooking).
Alta
3.3.4 Disponibilidad
Número de
requisito
Nombre de
requisito
Tipo Fuente del requisito Prioridad
RNF 6 Tiempo de
actividad
Restricción El sistema debe estar disponible el
99% del tiempo en horario
operativo.
Alta
3.3.5 Mantenibilidad
Número de
requisito
Nombre de
requisito
Tipo Fuente del requisito Prioridad
RNF 7 Documentación
técnica
Restricción Código modular y comentado
para facilitar futuras
actualizaciones.
Media
3.3.6 Portabilidad
Número de
requisito
Nombre de
requisito
Tipo Fuente del requisito Prioridad
RNF 8 Multiplataforma Restricción Acceso desde escritorio y
dispositivos móviles
(Android/iOS).
Alta
Número de
requisito
Nombre de
requisito
Tipo Fuente del requisito Prioridad
RNF 1 Tiempo de
respuesta
Restricción El 95% de las consultas de
disponibilidad deben cargar en
menos de 2 segundos.
Alta
RNF 2 Usuarios
simultáneos
Restricción Soporte para un mínimo de 10
usuarios concurrentes sin
degradación.
Media
HOTEL DALAM
Especificación de requisitos de software
Rev. 1.1
Pág. 18
Descripción de requisitos del sofware
3.4 Otros requisitos
Número de
requisito
Nombre de
requisito
Tipo Fuente del requisito Prioridad
RO 1 Protección de
Datos
Restricción Cumplimiento de leyes de
privacidad de datos de
huéspedes.
Alta
RO 2 Sin
discriminación
Restricción Interfaz inclusiva y accesible
para cualquier usuario
registrado.
Baja
4 Apéndices
En este apartado se presentarán las herramientas utilizadas para el desarrollo del sitio web,
en base a las especificaciones de la rubrica asignada por el maestro.
4.1. IDE
La IDE utilizada en este proyecto es “Visual Studio Code” de Microsoft al ser bastante
ligero y versátil
HOTEL DALAM
Especificación de requisitos de software
Rev. 1.1
Pág. 19
Descripción de requisitos del sofware
4.2. CONEXIÓN
La conexión que estuvimos utilizando fue Live Server, la cual es una extensión que se
puede utilizar en Visual Studio Code y nos permite ver nuestro progreso en tiempo real
4.3. NAVEGADOR
Utilizamos el navegador EDGE y CHROME, dos navegadores bastantes comunes y de
nuestra preferencia y en el cual pudimos trabajar de forma exitosa
HOTEL DALAM
Especificación de requisitos de software
Rev. 1.1
Pág. 20
Descripción de requisitos del sofware
4.4. CODIGO
Para el desarrollo web utilizamos HTML y CSS, donde posteriormente le agregaremos
4.5. REPOSITORIO
Utilizamos github como repositorio, el cual nos ayudara al trabajo colaborativo y como
prueba del historial que manejamos