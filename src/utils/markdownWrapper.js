const code = str => `\`${str}\``

export const markdownDecarator = func => (...args) => code(func(...args))