import telegraf from "telegraf";
import proxy from "https-proxy-agent";
import { generate, combine } from "./hastag_generator.js";
import commandPart from "telegraf-command-parts";

const TOKEN = process.env.BOT_TOKEN;

const telegrapfOption = proxyOptions(process.env.PROXY_URL);

function proxyOptions(proxy_url) {
    if (proxy_url) {
        return {
            telegram: {
                agent: proxy(proxy_url)
            }
        }
    }
    return {}
}

function markdownDecarator(func) {
    return function () {
        return `\`${func.apply(this, arguments)}\``;
    }
}

function greeter(name) {
    return generate(`Hello ${name}!`);
}

greeter = markdownDecarator(greeter);
let generateMarkdownMsg = markdownDecarator(generate);
let combineMarkdownMsg = markdownDecarator(combine);
const bot = new telegraf(TOKEN, telegrapfOption);

bot.use(commandPart())

bot.start((ctx) => {
    let userName = ctx.message.from.first_name;
    return ctx.replyWithMarkdown(greeter(userName));
})

bot.command("combine", async (ctx) => {
    try {
        return await ctx.replyWithMarkdown(combineMarkdownMsg(ctx.state.command.splitArgs))
    } catch (e) {
        console.log(e)
        ctx.reply("combine arguments should not be empty")
    }
})

bot.on('text', (ctx) => {
    try { return ctx.replyWithMarkdown(generateMarkdownMsg(ctx.message.text)) }
    catch (e) {
        console.log(e.stack);
        return reply(e.message);
    }
})

bot.launch();