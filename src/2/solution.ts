import * as fs from "fs";
import path from "path";
const file = fs.readFileSync(path.resolve(__dirname, '../assets/2/puzzleInput.txt'), 'utf-8').split('\n');

console.log(findAllowedGames(file))


export function findAllowedGames(file){
    // add a counter for the total of all ids of allowed games
    let allowedGamesCounter: number = 0
    for (const line of file) {
        let totalColors: {[key: string]: number} = {"Game": 0, "red": 0, "blue": 0, "green": 0}

        let splitLine: string[] = line.split(/[:;,]/g)
        for (const entry of splitLine) {
            let data: string[] = entry.trim().split(" ")
            if (data[0] === "Game") {
                totalColors.Game = parseInt(data[1])
            }else{
                totalColors[data[1]] += parseInt(data[0])
            }
        

        }
        console.log(totalColors)
        if(totalColors.red <= 12 && totalColors.blue <= 14 && totalColors.green <= 13){
            allowedGamesCounter += totalColors.Game
        }
    }
    return allowedGamesCounter

}