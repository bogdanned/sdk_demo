const { printTable } = require('./lib')

// table example
let table = [
    [4, 1, 9, "_", 8, "_", "_", "_", "_"],
    [5, "_", 8, "_", "_", "_", "_", "_", 6],
    ["_", "_", "_", 5, "_", "_", "_", "_", "_"],
    ["_", 9, "_", 6, "_", "_", "_", "_", 4],
    ["_", 4, "_", "_", "_", "_", "_", "_", 3],
    [6, "_", "_", 2, 9, "_", "_", 8, "_"],
    ["_", "_", 2, 3, "_", 1, "_", "_", "_"],
    ["_", "_", "_", "_", "_", 9, 2, 5, "_"],
    ["_", 7, "_", "_", "_", "_", "_", "_", "_"]
]

// gets a box boundaries assuming a 9X9 sudoku board
function getBoxBoundary(rowIndex) {
    if (rowIndex < 3) return [0, 1, 2]
    if (rowIndex > 2 && rowIndex < 6) return [3, 4, 5]
    return [6, 7, 8]
}

// extract the number already in a box
function extractBoxNumbers(rowIndex, colIndex, table) {
    const rowBox = getBoxBoundary(rowIndex)
    const colBox = getBoxBoundary(colIndex)
    let candidates = []
    for (let i = 0; i < rowBox.length; i++) {
        for (let j = 0; j < colBox.length; j++) {
            if (table[rowBox[i]][colBox[j]] !== "_") {
                candidates = [
                    ...candidates,
                    table[rowBox[i]][colBox[j]]
                ]
            }
        }
    }
    return candidates
}


function getCandidates(rowIndex, colIndex, table) {
    let candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let row = table[rowIndex]
    // removing what is already in row
    candidates = candidates.filter((cand) => (row.indexOf(cand) == -1))

    // removing a candidate already in the column
    let colCandidates = table.map(row => row[colIndex])
    candidates = candidates.filter((cand) => (colCandidates.indexOf(cand) == -1))

    // removing candidates already in the box
    let boxCandidates = extractBoxNumbers(rowIndex, colIndex, table)
    candidates = candidates.filter((cand) => (boxCandidates.indexOf(cand) == -1))

    return candidates
}

// find the index of the next position to be calculated
function findIndexes(table) {
    let colIndex, rowIndex;
    for(let i=0;i<table.length; i++){
        const colIndexTemp = table[i].findIndex((el)=>(el === "_"))
        if (colIndexTemp !== -1) {
            colIndex = colIndexTemp
            rowIndex = i
            break
        }
    }
    return [rowIndex, colIndex]
}

// calculates an array of new tables(sdk borads) based on the candidates found for a position
function placeNumber(table) {
    let tableList = []
    const [rowIndex, colIndex] = findIndexes(table);
    const candidates = getCandidates(rowIndex, colIndex, table)
    if (candidates.length > 0) {
        placed = true
        tableList = candidates.map((cand, index) => {
            let newTable = JSON.parse(JSON.stringify(table))
            newTable[rowIndex][colIndex] = cand
            
            // printTable(newTable)
            return newTable
        })
    } else {
        return tableList
    }

    return tableList
}

function isSolved(table) {
    return table.reduce((mem, row) => {
        const isComplete = row.reduce((mem, el) => (el === "_" ? false : mem), true)
        return isComplete && mem
    }, true)
}

function solveSudoku(table) {
    let tableList = placeNumber(table)

    // as long as no valid board if ofund we keep generating new boards with all the candidates posible for a position
    while (tableList[0] && !isSolved(tableList[0])) {
        tableList = tableList.reduce((mem, table) => {
            let list = placeNumber(table)
            return [
                ...mem,
                ...list
            ]
        }, [])
        // printing the table
        tableList.map(printTable)
    }
    return tableList[0]
}


console.log("XXXXXXXXXXXXXXXXXX")
printTable(table)
console.log("XXXXXXXXXXXXXXXXXX")

// solve dudoku
table = solveSudoku(table)
