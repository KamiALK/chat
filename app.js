// import "dotenv/config";
import bot from "@bot-whatsapp/bot";
import { getDay } from "date-fns";
import QRPortalWeb from "@bot-whatsapp/portal";
import BaileysProvider from "@bot-whatsapp/provider/baileys";
import MockAdapter from "@bot-whatsapp/database/mock";
//
// import chatgpt from "./services/openai/chatgpt.js";
// import GoogleSheetService from "./services/sheets/index.js";
//
// const googelSheet = new GoogleSheetService(
//   "1rDDWdRcLmecRhDSepMZdJwxMIp8iOxZMjDKuh2dA6W8"
// );

const GLOBAL_STATE = [];


// Diccionario de claves y respuestas
const respuestas = {
  "1": "computadores",
  "2": "laptops",
  // Agrega más claves y respuestas según sea necesario
};

// Flujo principal
const flowPrincipal = bot
  .addKeyword(["hola", "hi"])
  .addAnswer([
    `Bienvenidos, soy Kami y soy tu asistente!`,
    `Por favor, selecciona una opción:`,
    `1. Computadores`,
    `2. Laptops`
  ]);

// Manejar respuestas del usuario
for (const clave in respuestas) {
  const respuesta = respuestas[clave];

  const handleRespuesta = async (_, { gotoFlow }) => {
    // Aquí puedes agregar la lógica adicional que necesites
    // para manejar la respuesta específica
    return gotoFlow(flowRespuesta(respuesta));
  };

  flowPrincipal.addAnswer(clave, handleRespuesta);
}

// Flujo para mostrar la respuesta correspondiente
const flowRespuesta = (respuesta) => bot
  .addKeyword(["respuesta"])
  .addAnswer([
    `Elegiste: ${respuesta}`,
    // Agrega más detalles o instrucciones según sea necesario
  ]);











































const flowEmpty = bot
  .addKeyword(bot.EVENTS.ACTION)
  .addAnswer("No te he entendido!", null, async (_, { gotoFlow }) => {
    return gotoFlow(flowMenu);
  });

const flowPedido = bot
  .addKeyword(["pedir"], { sensitive: true })
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
    "Perfecto tu pedido estara listo en un aprox 20min",
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
    // flowMenu,
    flowRespuesta,
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
