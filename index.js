
let playerText = document.getElementById("Winner_Tag");
let restartButton = document.getElementById('Restart');
let blocks = Array.from(document.getElementsByClassName('box'));
let winIndicator = getComputedStyle(document.body).getPropertyValue('--winning')

console.log(blocks);

const O = "O";
const X = 'X';
let current_player = X;
let spaces = Array(9).fill(null);
let gameWon = false; // Track if the game has been won

const start_Game = () => {
    blocks.forEach(box => box.addEventListener('click', boxClicked));
}


function boxClicked(e) {
    // Check if the game has been won, and if so, return without further processing
    if (gameWon) {
        return;
    }

    const identity = e.target.id;

    if (spaces[identity] == null) {
        spaces[identity] = current_player;
        e.target.innerText = current_player;

        if (player_won() != false) {
            playerText.innerHTML = `${current_player} has won!`; // Update playerText
            let Winning_Block = player_won();
            
            // console.log(Winning_Block);

            Winning_Block.map(box => 
                blocks[box].style.backgroundColor = winIndicator)

            gameWon = true; // Set the gameWon flag to true          
        } else if (spaces.indexOf(null) === -1) {
            // All spaces are filled, and no one has won, so it's a tie
            playerText.innerHTML = "Match Tied!";
            gameWon = true;
        } else {
            current_player = current_player == X ? O : X;
        }
     
}
}

restartButton.addEventListener('click', restartGame);

function restartGame() {
    spaces.fill(null);

    blocks.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    });

    current_player = X;
    playerText.innerText = 'Tic-Tac-Toe';

    gameWon = false; // Reset the gameWon flag
}

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

function player_won() {
    for (const p of winningCombination) {
        let [x, y, z] = p;

        if (spaces[x] && (spaces[x] == spaces[y]) && (spaces[x] == spaces[z])) {
            return [x, y, z];
        }
    }
    return false;
}

start_Game();
