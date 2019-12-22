import telegraf from "telegraf";
import proxy from "https-proxy-agent";
import { generate } from "./hastag_generator.js";

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

function greeter(name) {
    return generate(`Hello ${name}!`);
}

const bot = new telegraf(TOKEN, telegrapfOption);

bot.start((ctx) => {
    let userName = ctx.message.from.first_name;
    return ctx.reply(greeter(userName));
})

bot.on('text', (ctx) => {
    try { return ctx.reply(generate(ctx.message.text)) }
    catch (e) {
        console.log(e.stack);
        return reply(e.message);
    }
})
bot.launch();