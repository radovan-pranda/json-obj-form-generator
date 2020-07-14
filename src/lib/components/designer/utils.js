let sufix = {};

export function idGenerator(prefix = 'id') {
    if (sufix[prefix] === undefined) {
        sufix[prefix] = 0
    }

    sufix[prefix]++;
    return `${prefix}${sufix[prefix]}`;
}