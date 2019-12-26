function capitalize(str) {
    try {
        return `${str[0].toUpperCase()}${str.slice(1)}`
    } catch (e) {
        console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack)
    }
}

export function generate(str) {
    let hashtag = str.split(" ").filter(Element => Element).map(capitalize).join("")
    if (hashtag.length == 0 || hashtag.length > 50)
        throw new Error("Hashtag must have from 1 to 50 symbols")
    hashtag = "#" + hashtag

    return hashtag
}

export function combine(strs) {
    let combinations = (action, rest, resault) => {
        if (!action && !rest.length)
            return;
        if (!rest.length) {
            resault.push(action)
        } else {
            combinations(action + rest[0] + " ", rest.slice(1), resault)
            combinations(action, rest.slice(1), resault)
        }
        return resault
    }
    return combinations("", strs, []).map(generate).join(" ")
}