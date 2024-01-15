import {sudokuSize} from "./stores";

export function generateSudoku(difficulty:number) {
    const N = 9;
    const K = difficulty;

    // Compute square root of N
    const SRNd = Math.sqrt(N);
    const SRN = Math.floor(SRNd);

    // Initialize all entries as false to indicate
    // that there are no edges initially
    const mat = Array.from({
        length: N
    }, () => Array.from({
        length: N
    }, () => 0));

    // Sudoku Generator
    function fillValues() {
        // Fill the diagonal of SRN x SRN matrices
        fillDiagonal();

        // Fill remaining blocks
        fillRemaining(0, SRN);

        // Remove Randomly K digits to make game
        removeKDigits();
    }

    // Fill the diagonal SRN number of SRN x SRN matrices
    function fillDiagonal() {
        for (let i = 0; i < N; i += SRN) {
            // for diagonal box, start coordinates->i==j
            fillBox(i, i);
        }
    }

    // Returns false if given 3 x 3 block contains num.
    function unUsedInBox(rowStart, colStart, num) {
        for (let i = 0; i < SRN; i++) {
            for (let j = 0; j < SRN; j++) {
                if (mat[rowStart + i][colStart + j] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    // Fill a 3 x 3 matrix.
    function fillBox(row, col) {
        let num = 0;
        for (let i = 0; i < SRN; i++) {
            for (let j = 0; j < SRN; j++) {
                while (true) {
                    num = randomGenerator(N);
                    if (unUsedInBox(row, col, num)) {
                        break;
                    }
                }
                mat[row + i][col + j] = num;
            }
        }
    }

    // Random generator
    function randomGenerator(num) {
        return Math.floor(Math.random() * num + 1);
    }

    // Check if safe to put in cell
    function checkIfSafe(i, j, num) {
        return (
            unUsedInRow(i, num) &&
            unUsedInCol(j, num) &&
            unUsedInBox(i - (i % SRN), j - (j % SRN), num)
        );
    }

    // check in the row for existence
    function unUsedInRow(i, num) {
        for (let j = 0; j < N; j++) {
            if (mat[i][j] === num) {
                return false;
            }
        }
        return true;
    }

    // check in the row for existence
    function unUsedInCol(j, num) {
        for (let i = 0; i < N; i++) {
            if (mat[i][j] === num) {
                return false;
            }
        }
        return true;
    }

    // A recursive function to fill remaining
    // matrix
    function fillRemaining(i, j) {
        // Check if we have reached the end of the matrix
        if (i === N - 1 && j === N) {
            return true;
        }

        // Move to the next row if we have reached the end of the current row
        if (j === N) {
            i += 1;
            j = 0;
        }


        // Skip cells that are already filled
        if (mat[i][j] !== 0) {
            return fillRemaining(i, j + 1);
        }

        // Try filling the current cell with a valid value
        for (let num = 1; num <= N; num++) {
            if (checkIfSafe(i, j, num)) {
                mat[i][j] = num;
                if (fillRemaining(i, j + 1)) {
                    return true;
                }
                mat[i][j] = 0;
            }
        }

        // No valid value was found, so backtrack
        return false;
    }

    function removeKDigits() {
        let count = K;

        while (count !== 0) {
            // extract coordinates i and j
            let i = Math.floor(Math.random() * N);
            let j = Math.floor(Math.random() * N);
            if (mat[i][j] !== 0) {
                count--;
                mat[i][j] = 0;
            }
        }

        return;
    }

    fillValues()
    return mat;
}