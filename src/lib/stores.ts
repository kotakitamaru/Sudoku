import {derived, type Readable, type Writable, writable} from "svelte/store";
import {Difficult} from "$lib/types";
import {initDifficult, initInitialField, initUserField} from "./storesInitialization";
import {browser} from "$app/environment";


export const sudokuSize = writable(9)
export const difficult = writable(
    browser?
        (window.localStorage.getItem("difficult")?
            parseInt(window.localStorage.getItem("difficult")):Difficult.Easy):Difficult.Easy
);

export const  initialField:Writable<number[][]> = writable(initInitialField())
export const  userField:Writable<number[][]> = writable(initUserField())

export const fullField:Readable<number[][]> = derived([initialField,userField],
    ([$initialField,$userField])=> {
        const resField: number[][] = [];
        for (let i = 0; i < $initialField.length; i++) {
            resField.push([]);
            for (let j = 0; j < $initialField.length; j++) {
                resField[i][j] = $initialField[i][j] ? $initialField[i][j] : $userField[i][j]
            }
        }
        return resField;
    })

export const selectedCell =writable({x:0,y:0})
