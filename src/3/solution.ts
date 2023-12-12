import * as fs from "fs";
import path from "path";
const file = fs
  .readFileSync(path.resolve(__dirname, "../assets/3/puzzleInput.txt"), "utf-8")
  .split("\n");

console.log(solve(file));

export function solve(file) {
  interface DataStore {
    [lineId: number]: number[];
  }
  let symbolData: DataStore = {};
  let counter: number = 0;
  const numberMatch: RegExp = /\d+/g;
  for (let lineIndex: number = 0; lineIndex < file.length; lineIndex++) {
    symbolData[lineIndex] = [];

    let line: string = file[lineIndex];
    for (let letterIndex = 0; letterIndex < line.length; letterIndex++) {
      const element: string = line[letterIndex];
      if (/[^\w\d.]/.test(element)) {
        symbolData[lineIndex].push(letterIndex);
      }
    }
  }
  for (let lineIndex: number = 0; lineIndex < file.length; lineIndex++) {
    let line: string = file[lineIndex];
    let matches: RegExpMatchArray;
    while ((matches = numberMatch.exec(line)) !== null) {
      let possibleIndexes: number[] = [];
      possibleIndexes.push(matches.index - 1);
      for (let index = 0; index < matches[0].length; index++) {
        possibleIndexes.push(matches.index + index);
      }
      possibleIndexes.push(matches.index + matches[0].length);
      for (const checkIndex of possibleIndexes) {
        let matchArrayLineNegative1: Number[] = symbolData[lineIndex];
        let matchArray: Number[] = symbolData[lineIndex - 1]
          ? symbolData[lineIndex - 1]
          : [];
        let matchArrayLinePositive1: Number[] = symbolData[lineIndex + 1]
          ? symbolData[lineIndex + 1]
          : [];

        if (
          matchArrayLineNegative1.includes(checkIndex) ||
          matchArray.includes(checkIndex) ||
          matchArrayLinePositive1.includes(checkIndex)
        ) {
          counter += parseInt(matches[0]);
        }
      }
    }
  }
  return counter;
}
