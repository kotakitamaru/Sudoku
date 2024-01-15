import {browser} from "$app/environment";
import {generateSudoku} from "$lib/sudokuGenerator";
import {Difficult} from "$lib/types";
import {difficult} from "$lib/stores";

export function initInitialField() {
    if(browser) {
        const str = window.localStorage.getItem("initial_field");
        let res: number[][];
        let diff: number|undefined;
        difficult.subscribe((val)=>{
            diff = val;
        })
        if(!diff)
            throw new Error(":D");
        if (!str || str === "") {
            res = generateSudoku(diff);
            window.localStorage.setItem("initial_field", JSON.stringify(res));
        } else
            res = JSON.parse(str);
        return res;
    }
}

export function initUserField() {
    if(browser) {
        const str = window.localStorage.getItem("user_field");
        let res: number[][];
        if (!str || str === "") {
            res = generateSudoku(81);
            window.localStorage.setItem("user_field", JSON.stringify(res));
        } else
            res = JSON.parse(str);
        return res;
    }
}


export function initDifficult(defaultDiff: Difficult) {
    if(browser) {
        const str = window.localStorage.getItem("difficult");
        let res: string;
        if (!str || str === "") {
            res = Difficult[defaultDiff];
            window.localStorage.setItem("difficult",res);
        } else
            res = str;
        return res;
    }
    else
        return Difficult[defaultDiff];
}