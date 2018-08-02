var displayedSymbol = 'X',
    startGameButton = document.getElementById('startGame'),
    columns = 3,
    rows = 3,
    minutes = 0,
    seconds = 0,
    timerid;

var modalWindow = {
    show: function (text) {
        document.getElementById('blockscreen').innerHTML = text;
        document.getElementById('blockscreen').style.display = 'flex';
    },
    close: function () {
        reset();
        document.getElementById('blockscreen').style.display = 'none';
    }
}

function startGame() {
    document.body.removeChild(document.getElementById('startGame'));
    document.getElementById('board').style.display = 'flex';

    for (var i = 0; i < (columns * rows); i++) {
        var div = document.createElement('div');
        div.className = "boardCell";
        div.id = "cell_" + i;
        div.addEventListener('click', marked)
        document.getElementById("board").appendChild(div);
    }

    var input = document.createElement('input');
    input.type = "button";
    input.value = "Новая игра";
    input.onclick = reset;
    document.body.appendChild(input);

    div = document.createElement('div');
    div.id = "timer";
    div.innerText = "00:00";
    document.body.appendChild(div);

    timerid = setInterval(timerStep, 1000);
}

function timerStep() {
    var timer = document.getElementById('timer'),
        result,
        visibleMinutes,
        visibleSeconds;

    seconds += 1;

    if (seconds > 59) {
        minutes += 1;
        seconds = 0;
    }

    if (minutes > 59) {
        checkEndOfGame();
    }

    if (seconds < 10) {
        visibleSeconds = "0" + seconds;
    } else {
        visibleSeconds = seconds;
    }

    if (minutes < 10) {
        visibleMinutes = "0" + minutes;
    } else {
        visibleMinutes = minutes;
    }

    result = visibleMinutes + ":" + visibleSeconds;
    timer.innerText = result;
}

function reset() {

    var boardCell = document.getElementsByClassName('boardCell'),
        timer = document.getElementById('timer');

    for (var i = 0; i < boardCell.length; i++) {
        boardCell[i].innerText = "";
    }

    timer.innerText = "00:00";
    displayedSymbol = 'X';
    minutes = 0;
    seconds = 0;

    if (timerid) {
        clearInterval(timerid);
        timerid = setInterval(timerStep, 1000);
    } else {
        timerid = setInterval(timerStep, 1000);
    }

}

function marked() {
    if (this.innerText === "") {
        this.innerText = displayedSymbol;
        displayedSymbol = switcherDisplayedSymbol(displayedSymbol);
        checkEndOfGame();
    } else {
        console.log(this.id + " is not empty");
    }
}

function switcherDisplayedSymbol(displayedSymbol) {
    if (displayedSymbol == 'X') return 'O'
    return 'X'
}

function collectBoardCellsValuesToArray() {
    var valuesOfBoardCells = [],
        numberOfCell = 0;

    for (var i = 0; i < rows; i++) {
        valuesOfBoardCells[i] = [];

        for (var j = 0; j < columns; j++) {
            valuesOfBoardCells[i][j] = document.getElementById("cell_" + numberOfCell).innerText;
            numberOfCell++;
        }
    }
    return valuesOfBoardCells;
}

function checkWinner() {
    var boardCellsValues = collectBoardCellsValuesToArray(),
        sortBoardCellsValues = [],
        winCrossCombination = "XXX",
        winCircleCombination = "OOO";

    //checkRow
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            sortBoardCellsValues[j] = boardCellsValues[i][j];
        }
        if (sortBoardCellsValues.join('') == winCrossCombination || sortBoardCellsValues.join('') == winCircleCombination) {
            displayedSymbol = switcherDisplayedSymbol(displayedSymbol);
            return "Выиграл игрок " + displayedSymbol;
        }
    }

    //checkColomn
    for (j = 0; j < columns; j++) {
        for (i = 0; i < rows; i++) {
            sortBoardCellsValues[i] = boardCellsValues[i][j];
        }
        if (sortBoardCellsValues.join('') == winCrossCombination || sortBoardCellsValues.join('') == winCircleCombination) {
            displayedSymbol = switcherDisplayedSymbol(displayedSymbol);
            return "Выиграл игрок " + displayedSymbol;
        }
    }

    //checkDiagonal
    for (i = 0, j = 0; i < rows; i++, j++) {
        sortBoardCellsValues[i] = boardCellsValues[i][j];
    }
    if (sortBoardCellsValues.join('') == winCrossCombination || sortBoardCellsValues.join('') == winCircleCombination) {
        displayedSymbol = switcherDisplayedSymbol(displayedSymbol);
        return "Выиграл игрок " + displayedSymbol;
    }

    for (i = 0, j = columns - 1; i < rows; i++, j--) {
        sortBoardCellsValues[i] = boardCellsValues[i][j];
    }
    if (sortBoardCellsValues.join('') == winCrossCombination || sortBoardCellsValues.join('') == winCircleCombination) {
        displayedSymbol = switcherDisplayedSymbol(displayedSymbol);
        return "Выиграл игрок " + displayedSymbol;
    }
    //tie
    if (checkTie()) {
        return "Ничья";
    }

    //time is up
    if (minutes > 59) {
        return "Время истекло";
    }

    return false;
}

function checkTie() {
    for (i = 0; i < rows * columns; i++) {
        if (document.getElementsByClassName('boardCell')[i].innerHTML == '') {
            return false;
        }
    }
    return true;
}

function checkEndOfGame() {
    var resultsOfGame = checkWinner();
    if (resultsOfGame) {
        clearInterval(timerid);
        modalWindow.show(resultsOfGame);
    }
}