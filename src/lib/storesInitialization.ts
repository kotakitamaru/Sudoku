import {browser} from "$app/environment";
import {generateSudoku} from "$lib/sudokuGenerator";
import {Difficult} from "$lib/types";

export function initInitialField() {
    if(browser) {
        const str = window.localStorage.getItem("initial_field");
        let res: number[][];
        if (!str || str === "") {
            res = generateSudoku(40);
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
            res = generateSudoku(0);
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