import {initialField, selectedCell, userField} from '$lib/stores';
import type {Point} from "$lib/types";
import {checkNumber} from "$lib/gameLogic";

export function drawField(canvas : HTMLCanvasElement){
    const context = canvas.getContext('2d')
    if(!context)
        return;
    let size;
    initialField.subscribe((value : number[][]) => {
        size = value.length;
    })
    if(!size)
        return;

    context.strokeStyle = 'rgb(100,100,100)';
    context.strokeRect(0,0,canvas.width,canvas.height)

    const rectSize = canvas.width / size;
    for(let i = 0; i < size; i++){
        for(let j = i; j < size; j++){
            context.strokeRect(j*rectSize,i*rectSize,rectSize,rectSize);
            context.strokeRect(i*rectSize,j*rectSize,rectSize,rectSize);
        }
    }

    const squareSectionSize = Math.sqrt(size);
    context.strokeStyle='rgb(255,255,255)';
    for(let i = 0; i < squareSectionSize; i++){
        for(let j = i; j < squareSectionSize; j++){
            context.strokeRect(j*rectSize*squareSectionSize,i*rectSize*squareSectionSize
                ,rectSize*squareSectionSize,rectSize*squareSectionSize);
            context.strokeRect(i*rectSize*squareSectionSize,j*rectSize*squareSectionSize
                ,rectSize*squareSectionSize,rectSize*squareSectionSize);
        }
    }
}

export function drawSelectedCell(canvas){
    let point:Point|undefined;
    selectedCell.subscribe((value)=>{
        point = value
    })
    if(!point)
        return;
    const context = canvas.getContext('2d');
    if(!context)
        return;
    context.clearRect(0,0,canvas.width,canvas.height);
    let size = 0;
    initialField.subscribe((value)=>{
        size = value.length;
    })
    const rectSize = canvas.width / size;
    const squareSectionSize = Math.sqrt(size);
    const squareSectionX = Math.floor(point.x/squareSectionSize);
    const squareSectionY = Math.floor(point.y/squareSectionSize);
    context.fillStyle= 'rgba(255,255,255,10%)';
    context.fillRect(point.x*rectSize,0,rectSize,canvas.height);
    context.fillRect(0,point.y*rectSize,canvas.width,rectSize);
    context.clearRect(squareSectionX*squareSectionSize*rectSize,squareSectionY*squareSectionSize*rectSize
        ,squareSectionSize*rectSize,squareSectionSize*rectSize);
    context.fillRect(squareSectionX*squareSectionSize*rectSize,squareSectionY*squareSectionSize*rectSize
        ,squareSectionSize*rectSize,squareSectionSize*rectSize);


    context.fillStyle= 'rgba(255,255,255,40%)';
    context.clearRect(point.x*rectSize,point.y*rectSize,rectSize,rectSize);
    context.fillRect(point.x*rectSize,point.y*rectSize,rectSize,rectSize);
    drawField(canvas);
    fillNumbers(canvas);
}

export function fillNumbers(canvas){
    const context = canvas.getContext('2d');
    let gameField:number[][]|undefined;
    let userGameField:number[][]|undefined;
    let size;
    initialField.subscribe(value=>{
        gameField = value;
        size= value.length
    })
    userField.subscribe(value=>{
        userGameField = value;
    })
    if(!gameField || !size || !userGameField)
        return;
    let selectedNumber;
    selectedCell.subscribe((value)=>{
        if(!gameField || !userGameField)
            return;
        selectedNumber = gameField[value.y][value.x]?
            gameField[value.y][value.x]
            :userGameField[value.y][value.x];
    })
    const rectSize = canvas.width / size;
    context.font=rectSize*0.8+"px Courier New";
    context.fillStyle='#00ADB5';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let currNum= gameField[i][j];
            if(currNum === selectedNumber && !!currNum){
                context.fillStyle = "rgba(238,238,238,0.25)"
                context.fillRect(j*rectSize,i*rectSize,rectSize,rectSize);
            }
            if(!currNum) {
                const userCurrNum = userGameField[i][j];
                if(!userCurrNum)
                    continue;
                currNum = userCurrNum;
                if(currNum === selectedNumber){
                    context.fillStyle = "rgba(238,238,238,0.25)"
                    context.fillRect(j*rectSize,i*rectSize,rectSize,rectSize);
                }
                context.fillStyle=checkNumber(currNum,{x:j,y:i})?'#c4c100':'red';
            }
            else
                context.fillStyle='#00ADB5';
            context.fillText(currNum,j*rectSize+rectSize*0.25,(i+1)*rectSize-rectSize*0.25);
        }
    }
}