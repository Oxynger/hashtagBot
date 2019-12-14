import telegraf from "telegraf";
import proxy from "https-proxy-agent";
import express from "express";
import { generate } from "./hastag_generator.js";

const TOKEN = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 3000;
const URL = process.env.URL;

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

const expressApp = new express();

const bot = new telegraf(TOKEN, telegrapfOption);

bot.start((ctx) => {
    userName = ctx.message.from.first_name;
    return ctx.reply(greeter(userName));
})

bot.on('text', ({ message: { text }, reply }) => {
    try { return reply(generate(text)) }
    catch (e) {
        console.log(e.stack);
        return reply(e.message);
    }
})
bot.launch();

expressApp.get('/', (req, res) => {
    res.send('Hello World!');
});
expressApp.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
