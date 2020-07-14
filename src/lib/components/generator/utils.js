let sufix = {};

export function idGenerator(prefix = 'id') {
    if (sufix[prefix] === undefined) {
        sufix[prefix] = 0
    }

    sufix[prefix]++;
    return `${prefix}${sufix[prefix]}`;
}

export function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}