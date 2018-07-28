var displayedSymbol = 'X',
    startGameButton = document.getElementById('startGame'),
    minutes = 0,
    seconds = 0,
    timer;

startGameButton.onclick = function () {
    console.log("Game started");

    var div = document.createElement('div');
    div.className = "board";
    document.body.replaceChild(div, startGameButton)

    for (var i=0; i<9 ; i++) {
        div = document.createElement('div');
        div.className = "boardCell";
        div.id = "'cell_"+i;
        div.addEventListener('click', marked)
        document.getElementsByClassName("board")[0].appendChild(div);
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

    timer = setInterval(timerStep, 1000);
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
        reset();
    }

    if (seconds < 10){
        visibleSeconds = "0" + seconds;
    } else {
        visibleSeconds = seconds;
    }

    if (minutes < 10) {
        visibleMinutes = "0"+minutes;
    } else {
        visibleMinutes = minutes;
    }

    result = visibleMinutes + ":" + visibleSeconds;
    timer.innerText = result;
}

function reset() {
    console.log("reseted");
    var boardCell = document.getElementsByClassName('boardCell'),
        timer = document.getElementById('timer');
    for (var i=0; i<boardCell.length; i++){
        boardCell[i].innerText = "";
    }
    timer.innerText = "00:00";
    minutes = 0;
    seconds = 0;
}

function marked() {
    if (this.innerText === ""){
        this.innerText = displayedSymbol;
        displayedSymbol = switcherDisplayedSymbol(displayedSymbol);
    } else {
        console.log(this.id + " is not empty");
    }
    checkEndOfGame ();
}

function switcherDisplayedSymbol(displayedSymbol) {
    if (displayedSymbol == 'X') return 'O'
        return 'X'
}

function checkEndOfGame() {

}