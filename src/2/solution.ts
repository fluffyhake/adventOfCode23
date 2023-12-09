import * as fs from "fs";
import path from "path";
const file = fs.readFileSync(path.resolve(__dirname, '../assets/2/puzzleInput.txt'), 'utf-8').split('\n');

console.log(findAllowedGames(file))


export function findAllowedGames(file) {
    // add a counter for the total of all ids of allowed games
    let allowedGamesCounter: number = 0
    for (const line of file) {
        let totalColors: { [key: string]: number } = { "Game": 0, "hitError": 0}

        let splitLine: string[] = line.split(/[:;]/g)
        for (const entry of splitLine) {
            let data: string[] = entry.trim().split(",")
            for (const iterator of data) {
                let entry = iterator.trim().split(" ")
                if (entry[0] === "Game") {
                    totalColors.Game = parseInt(entry[1])
                } else {
                    let pasedInt: number = parseInt(entry[0])
                    if ((entry[1] === "red" && pasedInt > 12) || (entry[1] === "green" && pasedInt > 13) || (entry[1] === "blue" && pasedInt > 14)) {
                        totalColors.hitError = 1
                    }
                }

            }
        }
        if(totalColors.hitError === 0){
            allowedGamesCounter += totalColors.Game
        }

    }
    return allowedGamesCounter
}