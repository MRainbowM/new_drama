/* Склонения часов, минут по их количеству */

interface DeclensionOfNumeralsParams {
    /* Склоняемое число */
    currentNumber: number,
    /* Варианты склонений */
    titles: string[]
}

function declensionOfNumerals(
    { currentNumber, titles }: DeclensionOfNumeralsParams
) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
        (currentNumber % 100 > 4 && currentNumber % 100 < 20) ? 2 :
            cases[(currentNumber % 10 < 5) ? currentNumber % 10 : 5]
    ];
}

interface DeclensionOfHoursParams {
    /* Склоняемое число */
    currentNumber: number
}

export function declensionOfHours(
    { currentNumber }: DeclensionOfHoursParams
) {
    return declensionOfNumerals({
        currentNumber: currentNumber,
        titles: ['час', 'часа', 'часов']
    })
}

interface DeclensionOfMinutesParams {
    /* Склоняемое число */
    currentNumber: number
}

export function declensionOfMinutes(
    { currentNumber }: DeclensionOfMinutesParams
) {
    return declensionOfNumerals({
        currentNumber: currentNumber,
        titles: ['минута', 'минуты', 'минут']
    })
}



