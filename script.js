//console.log("welcome to my tic tac toe");
let turn = "X";
let gameover = false;

// on load
function load() {
    console.log('localStorage: ', localStorage);
    if(localStorage.getItem('player-0'))
        document.querySelector('.Info').innerText ="Last Game, 0 Win";
    else if(localStorage.getItem('player-X'))
        document.querySelector('.Info').innerText = "Last Game, X Win";
    else if(localStorage.getItem('tie'))
        document.querySelector('.Info').innerText = "Last Game Tie";
    localStorage.clear();
}
window.onload = load;

//  function to change the turn 
const changeTurn = () => {
    return turn === "X" ? "0" : "X"
}

// Game Logic 
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '') {
            boxtext.innerText = turn;
            turn = changeTurn();
            checkWin();
            if (!gameover) {
                document.getElementsByClassName("Info")[0].innerText = "Turn for " + turn;
            }
        }
    })
})

// funtion to check for win  win 
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    //console.log('boxtext: ', boxtext[0].innerText);
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    wins.forEach(e => {
        //console.log(boxtext[e[0]].innerText); // X
        if ( (boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && (boxtext[e[0]].innerText !== "")) 
        {
            document.querySelector('.Info').innerText = boxtext[e[0]].innerText + " Win";
            localStorage.clear();
            if (turn=="0")
                localStorage.setItem('player-X', `Player-X Win!`) // player-0:Win
            else
                localStorage.setItem('player-0', `Player-0 Win!`) // player-0:Win
            gameover = true
        }
        else if(boxtext[0].innerText!="" && boxtext[1].innerText!="" && boxtext[2].innerText!="" && boxtext[3].innerText!="" && boxtext[4].innerText!="" && boxtext[5].innerText!="" && boxtext[6].innerText!="" && boxtext[7].innerText!="" && boxtext[8].innerText!="" && gameover==false)
        {
            gameover = true
            localStorage.clear();
            localStorage.setItem('tie', "Game Tie");
            document.querySelector('.Info').innerText = "Game Tie";
        }
    })
}

// Add onclick listener to reset button
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X";
    gameover = false
    document.getElementsByClassName("Info")[0].innerText = "Turn for " + turn;
})