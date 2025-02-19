

export const regexList: {[key: string]: RegExp} = {
    fiscalCodePiva: /^(?:[A-Z]{6}[0-9]{2}[A-EHLMPRST][0-9]{2}[A-Z][0-9]{3}[A-Z]|[0-9]{11})$/,
}

export function getRegex(type: string) {
    return new RegExp(regexList[type]);
}