import { combine } from "../hastag_generator.js";
import { markdownDecarator } from "../utils/markdownWrapper.js";

export async function combineController(ctx) {
    try {
        const args = ctx.state.command.splitArgs;
        return await ctx.replyWithMarkdown(markdownDecarator(combine)(args))
    } catch (e) {
        console.log(e)
        ctx.reply("combine arguments should not be empty")
    }

}