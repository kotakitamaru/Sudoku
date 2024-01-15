import {difficult, fullField, initialField, selectedCell, sudokuSize, userField} from "$lib/stores";
import {generateSudoku} from "$lib/sudokuGenerator";
import {browser} from "$app/environment";
import type {Point} from "$lib/types";
import {error} from "@sveltejs/kit";
import {checkNumber} from "$lib/gameLogic";
import {playHonk} from "$lib/sounds";

export function newSudokuHandle(){
    let $sudokuSize : number|undefined;
    sudokuSize.subscribe(x=>{
        $sudokuSize = x;
    })
    let $difficult : number|undefined;
    difficult.subscribe(x=>{
        $difficult = x;
    })
    $difficult && initialField.set(generateSudoku($difficult as number));
    $sudokuSize && userField.set(Array.from({ length: $sudokuSize }, () => Array($sudokuSize).fill(0)))

    let $userField, $initialField;
    userField.subscribe(x=>{
        $userField = x;
    })
    initialField.subscribe(x=>{
        $initialField = x;
    })

    if(browser){
        window.localStorage.setItem('initial_field',JSON.stringify($initialField));
        window.localStorage.setItem('user_field',JSON.stringify($userField));
    }
}

export  function resetHandle(){
    let $userField;
    userField.subscribe(x=>{
        $userField = x;
    })
    let $sudokuSize : number|undefined;
    sudokuSize.subscribe(x=>{
        $sudokuSize = x;
    })
    $sudokuSize && userField.set(Array.from({ length: $sudokuSize }, () => Array($sudokuSize).fill(0)))
    if(browser){
        window.localStorage.setItem('user_field',JSON.stringify($userField));
    }
}

export function setNumber(number:number) {
    let $selectedCell : Point|undefined;
    selectedCell.subscribe(val=>{
        $selectedCell = val;
    })
    userField.update(x=>{
        if(!$selectedCell)
            throw Error("Девелопер конч");
        x[$selectedCell.y][$selectedCell.x] = number;
        return [...x];
    })
    if(checkIsGameOver()){
        if(hasErrors())
            playHonk();
        else
            alert("You won!!!") //todo: win window
    }
    else if(number && $selectedCell && !checkNumber(number,$selectedCell)) {
        playHonk();
    }
    let $userField;
    userField.subscribe(x=>{
        $userField = x;
    })
    if(browser){
        window.localStorage.setItem("user_field",JSON.stringify($userField));
    }
}


function checkIsGameOver(){
    let $fullField:number[][]|undefined;
    fullField.subscribe(x=>{
        $fullField = x;
    })

    if(!$fullField)
        throw new Error("Мудак")

    for (let i = 0; i < $fullField.length; i++) {
        for(let j = 0; j < $fullField.length; j++){
            if($fullField[i][j] === 0){
                return false;
            }
        }
    }
    return true;
}

function hasErrors(){
    let $userField: number[][]|undefined;
    userField.subscribe(x=>{
        $userField = x;
    })
    if(!$userField)
        throw Error("Clown");
    for (let i = 0; i < $userField.length; i++) {
        for(let j = 0; j < $userField.length; j++){
            if(!checkNumber($userField[i][j],{x:j,y:i})){
                return true;
            }
        }
    }
    return false;
}

