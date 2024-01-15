<script>
import {difficult} from "$lib/stores";
import {Difficult} from "$lib/types";
import {browser} from "$app/environment";
import {newSudokuHandle} from "$lib/sudokuActions";

$:{
    if(browser){
        window.localStorage.setItem('difficult',$difficult);
    }
}

</script>

<select bind:value={$difficult}
        on:change={() => newSudokuHandle()}>
    {#each Object.keys(Difficult)
        .filter((v) => isNaN(Number(v)))
        .sort((o1,o2)=>Difficult[o1]>Difficult[o2]?1:(Difficult[o1]===Difficult[o2]?0:-1))
            as diff}
        <option value={Difficult[diff]}>{diff}</option>
    {/each}
</select>