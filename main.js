const telegraf = require("telegraf")
const proxy = require("https-proxy-agent")
const { generate } = require("./hastag_generator")

const token = process.env.BOT_TOKEN
const proxy_url = process.env.PROXY_URL

function greeter(name) {
    return generate(`Hello ${name}!`)
}

let bot = new telegraf(token, {
    telegram: {
        agent: proxy(proxy_url)
    }
})

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

bot.launch()