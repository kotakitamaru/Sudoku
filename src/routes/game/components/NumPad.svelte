<script lang="ts">
    import "./NumPad.svelte.css"
    import DifficultSelect from "./DifficultSelect.svelte";
    import {newSudokuHandle, resetHandle, setNumber} from "$lib/sudokuActions";

    function onKeyDown(e){
        if(e.keyCode >= 49 && e.keyCode <= 57){
            setNumber(e.keyCode-48);
        }
        else if(e.keyCode === 8)
        {
            setNumber(0);
        }
    }

</script>


<div class="numpad-wrapper">
    <DifficultSelect/>
    <button on:click={()=>newSudokuHandle()}>🆕</button>
    <button on:click={()=>resetHandle()}>↻</button>
    <button on:click={()=>setNumber(0)}>{"<-"}</button>
    {#each [1,2,3,4,5,6,7,8,9] as number}
        <button on:click={()=>setNumber(number)}>{number}</button>
    {/each}
</div>

<svelte:window on:keydown|preventDefault={onKeyDown} />