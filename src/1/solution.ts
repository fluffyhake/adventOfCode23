import * as fs from "fs";
import path from "path";
const file = fs.readFileSync(path.resolve(__dirname, '../assets/1/puzzleInput.txt'), 'utf-8').split('\n');

console.log(findTotal(file))


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


