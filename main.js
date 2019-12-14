import telegraf from "telegraf";
import proxy from "https-proxy-agent"
import { generate } from "./hastag_generator.js"

const token = process.env.BOT_TOKEN
const telegrapfOption = proxyOptions(process.env.PROXY_URL)

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
    return generate(`Hello ${name}!`)
}

let bot = new telegraf(token, telegrapfOption)

bot.start((ctx) => {
    userName = ctx.message.from.first_name
    return ctx.reply(greeter(userName))
})

bot.on('text', ({ message: { text }, reply }) => {
    try { return reply(generate(text)) }
    catch (e) {
        console.log(e.stack)
        return reply(e.message)
    }
})

bot.launch({
    webhook: {
        port: process.env.PORT
    }
})