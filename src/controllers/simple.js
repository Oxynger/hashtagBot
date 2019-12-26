import { markdownDecarator } from "../utils/markdownWrapper.js";

export function simpleController(ctx) {
    try { return ctx.replyWithMarkdown(markdownDecarator(generate)(ctx.message.text)) }
    catch (e) {
        console.log(e.stack);
        return reply(e.message);
    }
}