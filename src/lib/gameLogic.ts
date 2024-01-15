import type {Point} from "$lib/types";
import {fullField} from "./stores";

export function checkNumber(n:number,coord:Point){
    return checkNumberInRow(n,coord)
        && checkNumberInColumn(n,coord)
        && checkNumberInRect(n,coord);
}

function checkNumberInRow(n:number,coord:Point){
    let fullGameField :number[][]|undefined;
    fullField.subscribe((value)=>{
        fullGameField = value;
    })
    if(!fullGameField)
        throw new Error("FullGameField is null");

    let res = true;
    fullGameField[coord.y].forEach((x,i)=>{
        if(x === n && i != coord.x)
            res = false;
    })
    return res;
}

function checkNumberInColumn(n:number,coord:Point){
    let fullGameField :number[][]|undefined;
    fullField.subscribe((value)=>{
        fullGameField = value;
    })
    if(!fullGameField)
        throw new Error("FullGameField is null");

    let res = true;
    for (let i = 0; i < fullGameField.length; i++) {
        if(fullGameField[i][coord.x] === n && i != coord.y)
            res = false
    }
    return res;
}

function checkNumberInRect(n:number,coord:Point){
    let fullGameField :number[][]|undefined;
    fullField.subscribe((value)=>{
        fullGameField = value;
    })
    if(!fullGameField)
        throw new Error("FullGameField is null");

    const squareSectionSize = Math.sqrt(fullGameField.length);
    const squareSectionCoord = {
        x: Math.floor(coord.x/squareSectionSize),
        y: Math.floor(coord.y/squareSectionSize)
    }

    let res = true;
    for(let i = squareSectionCoord.y*squareSectionSize;
        i < (squareSectionCoord.y+1)*squareSectionSize; i++){
        for(let j = squareSectionCoord.x*squareSectionSize;
            j < (squareSectionCoord.x+1)*squareSectionSize; j++){
            if(fullGameField[i][j] === n && i != coord.y && j != coord.x)
                res = false
        }
    }

    return res;
}