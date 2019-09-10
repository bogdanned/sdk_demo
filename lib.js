function printRowSeparator(length){
    let sep = " ";
    for(let i =0; i < length; i++){
        sep = sep + "--"
    }
    console.log(sep + "--")
}

function printRow(row, rowIndex){
    const str = row.reduce((mem, el, index) => {
        if(index == 2 || index === 5){
            return mem + " " + el + " |"
        }else{
            return mem + " " + el
        }
    }, "")
    console.log(str)
    if(rowIndex== 2 || rowIndex === 5){
        printRowSeparator(row.length)
    }
}

module.exports.printTable = function printTable(table){
    console.log("*****************")
    table.map(printRow)
    console.log("*****************")

}