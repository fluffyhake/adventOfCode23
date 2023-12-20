// i should have used MAPS and not objects but whatever

import * as fs from "fs";
import path from "path";
const file = fs
  .readFileSync(path.resolve(__dirname, "../assets/3/puzzleInput.txt"), "utf-8")
  .split("\n");

  console.log(solve(file));
  console.log(solve2(file));

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


export function solve2(file) {
  let ratioTotal: number = 0
  interface DataStore {
    [lineId: number]: number[];
  }
  interface NumberDataStore {
    [lineid: number]:{
      [digit: number]: number[]
    }
  }
  let possibleIndexes: NumberDataStore = {};

  const numberMatch: RegExp = /\d+/g;
  for (let lineIndex: number = 0; lineIndex < file.length; lineIndex++) {
    let line: string = file[lineIndex];
    let matches: RegExpMatchArray;
    possibleIndexes[lineIndex] = {}
    while ((matches = numberMatch.exec(line)) !== null) {
      if(possibleIndexes[lineIndex][matches[0]] == undefined){
        possibleIndexes[lineIndex][matches[0]] = []
      }
      let tmpArray = []
      tmpArray.push(matches.index - 1);
      for (let index = 0; index < matches[0].length; index++) {
        tmpArray.push(matches.index + index);
      }
      tmpArray.push(matches.index + matches[0].length);
      possibleIndexes[lineIndex][matches[0]].push(...tmpArray)
    }
    // console.log(possibleIndexes)


  }

  let symbolData: DataStore = {};
  for (let lineIndex: number = 0; lineIndex < file.length; lineIndex++) {
    symbolData[lineIndex] = [];

    let line: string = file[lineIndex];
    for (let letterIndex = 0; letterIndex < line.length; letterIndex++) {
      const element: string = line[letterIndex];
      if (/\*/.test(element)) {
        console.log("-------")
        let bufferMatches: number[] = []
        symbolData[lineIndex].push(letterIndex);
        for (let customIndex = -1; customIndex <= 1; customIndex++) {
          console.log(letterIndex)
          console.log(possibleIndexes[lineIndex + customIndex])
          for (const key in possibleIndexes[lineIndex + customIndex]) {
            if (possibleIndexes[lineIndex + customIndex].hasOwnProperty(key)) {
              if(possibleIndexes[lineIndex + customIndex][key].includes(letterIndex)){
                console.log(key)
                bufferMatches.push(parseInt(key))

              }
            }
          }
        }
        if(bufferMatches.length == 2){
          console.log(bufferMatches)
          let addToRatioTotal: number = bufferMatches[0] * bufferMatches[1]
          console.log("Before ", ratioTotal)
          ratioTotal += addToRatioTotal
          console.log("AFter ", ratioTotal)

        }else{
          console.log("ERROR", bufferMatches)
        }
      }

    }
  }

  // console.log(symbolData)
  return ratioTotal;
  }


