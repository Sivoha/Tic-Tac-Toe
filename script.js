function Cell(cell, cellCharacter, num) {
    this.cell = cell;
    this.cellCharacter = cellCharacter;
    this.num = num;
    this.status = "none";
    this.player = "1";

    this.makeMove = () => { 
        if (this.status == "none" && this.player == "1") {
            cellCharacter.style.background = "url('cross.png')";
            cellCharacter.style.backgroundSize = "contain";
            cellCharacter.style.backgroundRepeat = "no-repeat";
            this.status = "cross";
            cells.forEach(Element => { Element.changePlayerTo2(); });  
        } else if (this.status == "none" && this.player == "2") {
            cellCharacter.style.background = "url('circle.png')";
            cellCharacter.style.backgroundSize = "contain";
            cellCharacter.style.backgroundRepeat = "no-repeat";
            this.status = "circle";
            cells.forEach(Element => { Element.changePlayerTo1(); }); 
        }
        checkCells();
    }

    this.changePlayerTo1 = () => {
        this.player = "1";
    }
    this.changePlayerTo2 = () => {
        this.player = "2";
    }
    this.resetCharacter = () => {
        this.cellCharacter.style.background = "none";
    }
    this.resetStatus = () => {
        this.status = "none";
    }
    this.setCrossStatus = () => {
        this.status = "cross";
    }
    this.setCircleStatus = () => {
        this.status = "circle";
    }
    this.resetBackground = () => {
        this.cell.style.backgroundColor = "deepskyblue";
    }
    this.setRedBackground = () => {
        this.cell.style.backgroundColor = "#B9FC6D";
    }
    this.getStatus = () => {
        return this.status;
    }
}

async function checkCells() {
    if (checkWin() || checkDraw()) {
        await sleep(2000);
        resetCells();
    }
}

function resetCells() {
    cells.forEach(Element => {
        Element.resetCharacter();
        Element.resetStatus();
        Element.resetBackground();
        Element.changePlayerTo1();
    })
    
}

function checkWin() {
    cellNum = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]];
    win = false;
    for (let i = 0; i < cellNum.length; ++i) {
        if ((cells[cellNum[i][0]].status == cells[cellNum[i][1]].status) && (cells[cellNum[i][1]].status == cells[cellNum[i][2]].status) && (cells[cellNum[i][0]].status != "none")) {
            cells[cellNum[i][0]].setRedBackground();
            cells[cellNum[i][1]].setRedBackground()
            cells[cellNum[i][2]].setRedBackground();
            win = true;
        }
    }
    return win;
}

function checkDraw() {
    if (cells.every(Element => Element.status != "none")) {
        sleep(2000);
        return true;
    }
    return false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let documentCells = document.querySelectorAll(".cell");
let documentCellCharacters = document.querySelectorAll(".cell-character")

let cells = [];
for (let i = 0; i < documentCells.length; ++i) {
    cells.push(new Cell(documentCells[i], documentCellCharacters[i], i));
    cells[i].cell.addEventListener("click", cells[i].makeMove);
}