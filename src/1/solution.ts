import * as fs from "fs";
import path from "path";
const file = fs.readFileSync(path.resolve(__dirname, '../assets/1/puzzleInput.txt'), 'utf-8').split('\n');

console.log(findTotal(file))
console.log(findTotal2(file))


export function findTotal(file){
    let totalSum: number = 0
    for (const line of file) {
        let numberMatches: string[] = line.match(/\d/g);
        let firstMatch: string = ""
        let lastMatch: string = ""
        try {
            firstMatch = numberMatches[0]
            lastMatch = numberMatches[numberMatches.length - 1]
            if (firstMatch && lastMatch) {
                // Math in javascript is allways fun. 
                // totalSum += parseInt(`${firstMatch}${lastMatch}`)
                totalSum += parseInt(firstMatch + lastMatch)
            }
        } catch (e) {
            console.error("Line does not contain two or more numbers: " + line)
        }
    }
    return totalSum
}


export function findTotal2(file){
    let totalSum: number = 0
    for (const line of file) {
        // Since we need to match overlapping matches (sevenine = "seven", "nine") we cant use the .match funtion in javascript
        let numberMatches = []
        let match
        const pattern = /(?:one|two|three|four|five|six|seven|eight|nine|\d)/g
        while ((match = pattern.exec(line)) !== null){
            numberMatches.push(match[0])
            pattern.lastIndex = match.index + 1;
        }
        let firstMatch: string = ""
        let lastMatch: string = ""
        try {
            firstMatch = numberMatches[0]
            lastMatch = numberMatches[numberMatches.length - 1]
            if (firstMatch && lastMatch) {
                
                // convert to string for string interpolation so "3" + "5" becomes "35" and not 8.
                let total: string = numberCheck(firstMatch).toString() + numberCheck(lastMatch).toString()
                totalSum += parseInt(total)
            }
        } catch (e) {
            console.error("Line does not contain two or more numbers: " + line)
        }
    }
    return totalSum

}

function numberCheck(word: string){
    return Number.isNaN(parseInt(word)) ? wordToNumber(word) : parseInt(word)
}

function wordToNumber(word: string){
    const numberWords = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9
    };

    return numberWords[word.toLowerCase()] || NaN

}