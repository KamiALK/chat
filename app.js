// import "dotenv/config";
import bot from "@bot-whatsapp/bot";
// import { getDay } from "date-fns";
import QRPortalWeb from "@bot-whatsapp/portal";
import BaileysProvider from "@bot-whatsapp/provider/baileys";
import MockAdapter from "@bot-whatsapp/database/mock";

// import chatgpt from "./services/openai/chatgpt.js";
// import GoogleSheetService from "./services/sheets/index.js";

// const googelSheet = new GoogleSheetService(
//   "1rDDWdRcLmecRhDSepMZdJwxMIp8iOxZMjDKuh2dA6W8"
// );

const GLOBAL_STATE = [];

const flowPrincipal = bot
  .addKeyword(["hola", "hi"])
  .addAnswer([
    `Bienvenidos Soy Kami y soy tu asistente! `,
    `Me complace mostrate mis servicios`,
    `1. Mantenimmiento de computadores`,
    `2. chatbots para whatsapp `,
    `3. Desarrollo de sofware`
  ])
  .addAnswer("1", async (_, { gotoFlow }) => {
    return gotoFlow(flowMantenimiento_uno);
  });


const flowMantenimiento_uno = bot
  .addKeyword(["1", "mantenimiento"])
  .addAnswer([
    `Elegiste la opcion mantenimiento  `,
    `1. Pc escritorio`,
    `2. Laptop o portatil `,
    `3. Servidor`
  ]);
  .addAnswer("1", async (_, { gotoFlow }) => {
    return gotoFlow(flowMantenimiento_dos);
  });

const flowMantenimiento_dos = bot
  .addKeyword(["1", "mantenimiento"])
  .addAnswer([
    `Elegiste la opcion mantenimiento  `,
    `1. Pc escritorio`,
    `2. Laptop o portatil `,
    `3. Servidor`
  ]);
  .addAnswer("1", async (_, { gotoFlow }) => {
    return gotoFlow(flowMantenimiento_dos);
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
    // flowMenu,\
    flowMantenimiento_uno,
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
