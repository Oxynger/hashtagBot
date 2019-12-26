import { combine } from "../hastag_generator";
import { markdownDecarator } from "../utils/markdownWrapper.js";

export function combineController({ state: { command: { splitArgs } } }) {
    try {
        return await ctx.replyWithMarkdown(markdownDecarator(combine)(splitArgs))
    } catch (e) {
        console.log(e)
        ctx.reply("combine arguments should not be empty")
    }

}