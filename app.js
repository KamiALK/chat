// import "dotenv/config";
import bot from "@bot-whatsapp/bot";
// import { getDay } from "date-fns";
import QRPortalWeb from "@bot-whatsapp/portal";
import BaileysProvider from "@bot-whatsapp/provider/baileys";
import MockAdapter from "@bot-whatsapp/database/mock";

const GLOBAL_STATE = [
  { opcion: 1, descripcion: "Mantenimiento de computadores" },
  { opcion: 2, descripcion:"Chatbots personalizados"},
  { opcion: 3 , descripcion:"otra" }
];


const MANTENIMIENTO = [
  { opcion: 1, descripcion:"Escritorio" },
  { opcion: 2, descripcion:"Portatil"}
];

const OTROS = [
  { opcion: 1, descripcion:"software" },
  { opcion: 2, descripcion:"camaras" }
];

const flowPrincipal = bot
  .addKeyword(["hola", "hi"])
  .addAnswer([
    `costa es gay`,  
    `Bienvenidos soy *Kami dev*! 🚀,Te acompanare a conocer mis servicios, por favor escribe la palabra *si* o *continuar*`,
  ]);

const flowEscritorio = bot                                                                                                    
  .addKeyword(["escritorio"])                                                                                                
  .addAnswer([                                                                                                               
    `🚀 ¡Optimiza tu rendimiento con nuestros servicios especializados! 

🔧 ¿Necesitas actualizar tu sistema operativo? ¡No busques más! En Kami Dev nos especializamos en instalaciones de Windows, Windows Server, Linux y Ubuntu Server, con los programas esenciales para cubrir todas tus necesidades y garantizar un funcionamiento óptimo.

💻 Además, ofrecemos ensambles personalizados y equipos a medida. Ya sea para tu estación de trabajo o tu área de estudio, nos aseguramos de proporcionarte el mejor rendimiento posible. ¡Tu productividad merece lo mejor!


👉 ¡Contáctanos ahora. ¡No dejes pasar esta oportunidad de mejorar tu entorno  con Kami Dev!`, 
  ]);                                                                                                                        


const flowPortatil = bot
  .addKeyword(["portatil"])
  .addAnswer([
  ` 🔧 ¡Optimiza tu portátil y dale una nueva vida con nuestro servicio de mantenimiento! 🔧

💡 Con nuestro servicio especializado, corregiremos la falta de memoria y velocidad de tu portátil, garantizando un rendimiento óptimo para que puedas trabajar sin contratiempos.

📁 Además, si te encuentras con problemas de espacio, te ayudaremos a liberar espacio en tu disco duro, optimizando su capacidad de almacenamiento para que puedas guardar todos tus archivos importantes sin preocupaciones.

💻 Y lo mejor de todo, ¡tal vez no necesites comprar otro portátil! Con nuestro mantenimiento experto, podemos prolongar la vida útil de tu dispositivo, ahorrándote el gasto de adquirir uno nuevo.

👉 ¡No esperes más para darle a tu portátil el cuidado que se merece! Contáctanos ahora para descubrir cómo podemos mejorar el rendimiento y la vida útil de tu portátil con nuestro servicio de mantenimiento en Kami Dev.`,
  ]);



const flowChatbots = bot
  .addKeyword(["chatbot"])
  .addAnswer([
    ` 💡 WhatsApp Bot: Envía un mensaje con "Mantenimiento de portátil" para obtener asistencia inmediata y personalizada para corregir la falta de memoria y velocidad de tu portátil, así como liberar espacio en tu disco duro.`,

     `💬 Telegram Bot: Simplemente inicia una conversación con nuestro bot en Telegram y recibirás respuestas personalizadas para tus necesidades específicas de mantenimiento de portátil, desde aumentar la velocidad hasta optimizar el espacio de almacenamiento.  👉 ¡Contáctanos ahora! `,
  ]);


const flowSoftware = bot
  .addKeyword(["software"])
  .addAnswer([
  ` 🌐 Potencia tu proyecto web con nuestro servicio de desarrollo backend y microservicios 🌐

¿Buscas llevar tu proyecto web al siguiente nivel? En Kami Dev, ofrecemos servicios de desarrollo backend especializados en la arquitectura de microservicios, utilizando tecnologías avanzadas como Kafka para una comunicación eficiente entre componentes.

💻 Nuestro equipo de expertos se encarga del despliegue en servidores virtuales privados (VPS), asegurando un entorno de producción estable y escalable para tu aplicación.

🐳 Además, implementamos contenedores Docker para facilitar el despliegue y la gestión de tus servicios, garantizando una mayor portabilidad y flexibilidad en tu infraestructura.

🔗 Con el uso de Git, gestionamos eficientemente el código fuente de tu proyecto, permitiendo una colaboración fluida y un control de versiones sólido.

🚀 Confía en nuestros servicios para impulsar tu proyecto web hacia el éxito. ¡Déjanos encargarnos de la complejidad técnica mientras tú te enfocas en hacer crecer tu negocio!

👉 ¡Contáctanos hoy para descubrir cómo podemos transformar tu visión en realidad con nuestro servicio de desarrollo web backend en Kami Dev! `,
  ]);


const flowCamara = bot
  .addKeyword(["camara"])
  .addAnswer([
    ` 📹 Protege tu hogar o negocio con nuestro servicio de instalación de cámaras de seguridad 📹

¿Preocupado por la seguridad de tu hogar o negocio? En Kami Dev, te ofrecemos soluciones completas para proteger lo que más te importa.

🛡️ Nuestro equipo de expertos se encarga de la instalación de cámaras de circuito cerrado, proporcionándote una vigilancia constante y una mayor tranquilidad las 24 horas del día. 🔧 Además, nos aseguramos de que la instalación sea rápida, profesional y sin complicaciones, para que puedas disfrutar de los beneficios de tu sistema de seguridad de inmediato. `,
  ]);







const flowMenu = bot
  .addKeyword(["si", "continuar"])
  .addAnswer(
    `te voy a mostrar mis servicios`,
    null,
    async (_, { flowDynamic }) => {
      for (const menu of GLOBAL_STATE) {
        await flowDynamic(`${menu.opcion} ${menu.descripcion}`);
      }
    }
  )
  .addAnswer(
  `¿Te interesa alguno marca la opcion?`,
  { capture: true },
  async (ctx, { gotoFlow, state }) => {
    const opcionSeleccionada = ctx.body.trim();
    switch (opcionSeleccionada) {
      case "1":
        return gotoFlow(flowMantenimiento);
      case "2":
        return gotoFlow(flowChatbots);
      case "3":
        return gotoFlow(flowOtros);
      default:
        return gotoFlow(flowMenu);
    }
  }
  );

const flowMantenimiento = bot
  .addKeyword(["mantenimiento"])
  .addAnswer(
    "Has seleccionado Mantenimiento de computadores.",
    null,
    async (_, { flowDynamic }) => {
      for (const opcion of MANTENIMIENTO) {
        await flowDynamic(`${opcion.opcion} ${opcion.descripcion}`);
      }
    }
  )
  .addAnswer(
    "Ingresa el número de la opción que deseas:",
    { capture: true },
    async (ctx, { gotoFlow, state }) => {
      const opcionSeleccionada = ctx.body.trim();
      switch (opcionSeleccionada) {
        case "1":
          return gotoFlow(flowEscritorio);
        case "2":
          return gotoFlow(flowPortatil);
        default:
          return gotoFlow(flowMenu);
      }

    }
  );
 
const flowOtros = bot
  .addKeyword(["OTROS"])
  .addAnswer(
    "Has seleccionado OTROS",
    null,

    async (_, { flowDynamic }) => {
      for (const opcion of OTROS) {
        await flowDynamic(`${opcion.opcion} ${opcion.descripcion}`);
      }
    }
  )
  .addAnswer(
    "Servicios de desarrollo ",
    { capture: true },
    async (ctx, { gotoFlow, state }) => {
      const opcionSeleccionada = ctx.body.trim();
      switch (opcionSeleccionada) {
        case "1":
          return gotoFlow(flowSoftware);
        case "2":
          return gotoFlow(flowCamara);
        default:
          return gotoFlow(flowMenu);
      }
    }
  );































const flowEmpty = bot
  .addKeyword(bot.EVENTS.ACTION)
  .addAnswer("No te he entendido!", null, async (_, { gotoFlow }) => {
    return gotoFlow(flowMenu);
  });

const flowPedido = bot
  .addKeyword(["contacto"], { sensitive: true })
  .addAnswer(
    "¿Cual es tu nombre?",
    { capture: true },
    async (ctx, { state }) => {
      state.update({ name: ctx.body });
    }
  )
  .addAnswer(
    "¿Alguna observacion?",
    { capture: true },
    async (ctx, { state }) => {
      state.update({ observaciones: ctx.body });
    }
  )
  .addAnswer(
    "Perfecto nos contactaremos contigo para solucionar tu necesidad",
    null,
    async (ctx, { state }) => {
        const currentState = state.getMyState();
      await googelSheet.saveOrder({
        fecha: new Date().toDateString(),
        telefono: ctx.from,
        pedido: currentState.pedido,
        nombre: currentState.name,
        observaciones: currentState.observaciones,
      });
    }
  );

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = bot.createFlow([
    flowPrincipal,
    flowMenu,
    flowMantenimiento,
    flowEscritorio,
    flowPortatil,
    flowOtros,
    flowChatbots,
    flowSoftware,
    flowCamara,
    flowPedido,
    flowEmpty,

  ]);
  const adapterProvider = bot.createProvider(BaileysProvider);

  bot.createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
