<script lang="ts">
    import "./GameWindow.svelte.css"
    import { onMount} from "svelte";
    import {drawSelectedCell} from "./GameWindow";
    import {initialField, selectedCell, userField} from "$lib/stores";
    let canvas :HTMLCanvasElement;
    let context;

    onMount(()=>{
        context = canvas.getContext('2d');
        canvas.width =canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        drawSelectedCell(canvas)
    })

    $:{
        $userField;
        canvas && drawSelectedCell(canvas);
    }
    function onClickHandle(e:MouseEvent){
        const point = {
            x:e.clientX-canvas.offsetLeft,
            y:e.clientY-canvas.offsetTop
        }
        const size = $initialField.length;
        const rectSize = canvas.width / size;
        const rectX = Math.floor(point.x/(canvas.width/size));
        const rectY = Math.floor(point.y/(canvas.width/size));
        selectedCell.set({
            x:rectX,
            y:rectY
        })
        drawSelectedCell(canvas);
    }
</script>

<div class="game-wrapper">
    <canvas class="game-canvas"
            bind:this={canvas}
            on:click={onClickHandle}
    />
</div>