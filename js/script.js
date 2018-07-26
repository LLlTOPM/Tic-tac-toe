var boardCell = document.getElementsByClassName('boardCell');
var displayedSymbol = 'X';

for (var i=0; i < boardCell.length; i++) {
    boardCell[i].addEventListener('click', welcome);
}

function welcome() {
    console.log("clicked on " + this.id)
    this.innerHTML = displayedSymbol;
    displayedSymbol = switcher(displayedSymbol);
}

function switcher(displayedSymbol) {
    if (displayedSymbol == 'X') {
        return 'O'
    } else {
        return 'X'
    }
}