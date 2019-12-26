import commandPart from "telegraf-command-parts";
import { markdownDecarator } from "./utils/markdownWrapper.js";
import { markdownGenerate, combine } from "./hastag_generator.js";
import { greeter } from "./controllers/start.js"
import { combineController } from "./controllers/combine.js";
import { simpleController } from "./controllers/simple.js";
import bot from "./bot.js";

bot.use(commandPart())

bot.start(greeter)

bot.command("combine", combineController)

bot.on('text', simpleController)

bot.launch();