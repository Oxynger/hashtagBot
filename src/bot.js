import telegraf from "telegraf";
import proxy from "https-proxy-agent";

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
const bot = new telegraf(TOKEN, telegrapfOption);
export default bot;