// Initialize variables
const boxes = document.querySelectorAll(".box");
let turn = "X"; // X always starts
let isGameOver = false;

// Reset all boxes at the start
boxes.forEach(box => {
    box.innerHTML = "";
    box.addEventListener("click", () => {
        if (!isGameOver && box.innerHTML === "" && turn === "X") {
            box.innerHTML = turn; // Player places "X"
            checkWin();
            checkDraw();
            if (!isGameOver) {
                changeTurn();
                setTimeout(aiMove, 500); // AI makes its move after a delay
            }
        }
    });
});

// Change the player's turn
function changeTurn() {
    turn = turn === "X" ? "O" : "X";
    const turnIndicator = document.querySelector(".bg");
    turnIndicator.style.left = turn === "X" ? "0" : "85px";
    turnIndicator.style.backgroundColor = turn === "X" ? "#FF2E63" : "#08D9D6";
}

// Check if there's a winner
function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (
            boxes[a].innerHTML &&
            boxes[a].innerHTML === boxes[b].innerHTML &&
            boxes[a].innerHTML === boxes[c].innerHTML
        ) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = `${turn} wins!`;
            document.querySelector("#play-again").style.display = "inline";
            [a, b, c].forEach(index => boxes[index].classList.add("win-box"));
            return;
        }
    }
}

// Check if the game ends in a draw
function checkDraw() {
    if (![...boxes].some(box => box.innerHTML === "") && !isGameOver) {
        isGameOver = true;
        document.querySelector("#results").innerHTML = "Draw!";
        document.querySelector("#play-again").style.display = "inline";
    }
}

// AI move logic
function aiMove() {
    if (isGameOver) return; // Prevent AI from making a move if the game is over

    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // Check if AI can win
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (
            (boxes[a].innerHTML === "O" && boxes[b].innerHTML === "O" && boxes[c].innerHTML === "") ||
            (boxes[b].innerHTML === "O" && boxes[c].innerHTML === "O" && boxes[a].innerHTML === "") ||
            (boxes[a].innerHTML === "O" && boxes[c].innerHTML === "O" && boxes[b].innerHTML === "")
        ) {
            const move = [a, b, c].find(i => boxes[i].innerHTML === "");
            boxes[move].innerHTML = "O";
            checkWin();
            checkDraw();
            if (!isGameOver) changeTurn();
            return;
        }
    }

    // Block player's winning move
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (
            (boxes[a].innerHTML === "X" && boxes[b].innerHTML === "X" && boxes[c].innerHTML === "") ||
            (boxes[b].innerHTML === "X" && boxes[c].innerHTML === "X" && boxes[a].innerHTML === "") ||
            (boxes[a].innerHTML === "X" && boxes[c].innerHTML === "X" && boxes[b].innerHTML === "")
        ) {
            const move = [a, b, c].find(i => boxes[i].innerHTML === "");
            boxes[move].innerHTML = "O";
            checkWin();
            checkDraw();
            if (!isGameOver) changeTurn();
            return;
        }
    }

    // Prioritize center
    if (boxes[4].innerHTML === "") {
        boxes[4].innerHTML = "O";
        checkWin();
        checkDraw();
        if (!isGameOver) changeTurn();
        return;
    }

    // Random move if no strategic move found
    const emptyBoxes = [...boxes].filter(box => box.innerHTML === "");
    if (emptyBoxes.length > 0) {
        const move = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        move.innerHTML = "O";
        checkWin();
        checkDraw();
        if (!isGameOver) changeTurn();
    }
}

// Reset the game when "Play Again" is clicked
document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector(".bg").style.backgroundColor = "#FF2E63";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";
    boxes.forEach(box => {
        box.innerHTML = "";
        box.classList.remove("win-box");
    });
});

// About modal pop-up
const modal = document.querySelector("#about");
const modalClose = document.querySelector(".close");
const aboutButton = document.querySelector('a[href="#about"]');

aboutButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("hidden");
});

modalClose.addEventListener("click", () => {
    modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});
