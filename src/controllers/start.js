import { generate } from "../hastag_generator.js";
import { markdownDecarator } from "../utils/markdownWrapper.js";

export async function greeter(ctx) {
    let userName = ctx.message.from.first_name;
    return ctx.replyWithMarkdown(markdownDecarator(generate)(`Hello ${userName}!`));
}