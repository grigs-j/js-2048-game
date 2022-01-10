document.addEventListener("DOMContentLoaded", () => {
    const gridDisplay = document.querySelector(".grid");
    const scoreDisplay = document.getElementById("score");
    const resultDisplay = document.getElementById("results");
    let squaresArr = [];
    const width = 4;
    let score = 0;

    //create the playing board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement("div");
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squaresArr.push(square);
        }
        //create 2 randomly generated 2s
        generate();
        generate();
    }
    createBoard();

    //generate a new number
    function generate() {
        randomNumber = Math.floor(Math.random() * squaresArr.length);
        //if the random square on the board is empty (a 0) we make it a 2
        if (squaresArr[randomNumber].innerHTML == 0) {
            squaresArr[randomNumber].innerHTML = 2;
            //check for no 0s each generate
            checkForGameOver();
            //otherwise, try again
        } else generate();
    }

    function moveRight() {
        for (let i = 0; i < 16; i++) {
            //if index is the far right side
            if (i % 4 === 0) {
                let totalOne = squaresArr[i].innerHTML;
                let totalTwo = squaresArr[i + 1].innerHTML;
                let totalThree = squaresArr[i + 2].innerHTML;
                let totalFour = squaresArr[i + 3].innerHTML;
                //parseInt to turn strings back into numbers
                let row = [
                    parseInt(totalOne),
                    parseInt(totalTwo),
                    parseInt(totalThree),
                    parseInt(totalFour),
                ];
                //filter row returning number squares if theyre true
                let filteredRow = row.filter((num) => num);
                //how many squares dont have a number
                let missing = 4 - filteredRow.length;
                //turn zeros into array and fill method to fill w 0s
                let zeros = Array(missing).fill(0);
                //filteredRow is method of concat to zeros, so visually 0s appear on left side, since we moved right
                let newRow = zeros.concat(filteredRow);

                squaresArr[i].innerHTML = newRow[0];
                squaresArr[i + 1].innerHTML = newRow[1];
                squaresArr[i + 2].innerHTML = newRow[2];
                squaresArr[i + 3].innerHTML = newRow[3];
            }
        }
    }

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squaresArr[i].innerHTML;
                let totalTwo = squaresArr[i + 1].innerHTML;
                let totalThree = squaresArr[i + 2].innerHTML;
                let totalFour = squaresArr[i + 3].innerHTML;
                let row = [
                    parseInt(totalOne),
                    parseInt(totalTwo),
                    parseInt(totalThree),
                    parseInt(totalFour),
                ];

                let filteredRow = row.filter((num) => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                //concat the opposite way
                let newRow = filteredRow.concat(zeros);

                squaresArr[i].innerHTML = newRow[0];
                squaresArr[i + 1].innerHTML = newRow[1];
                squaresArr[i + 2].innerHTML = newRow[2];
                squaresArr[i + 3].innerHTML = newRow[3];
            }
        }
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            //add width to each iteration instead of +1 b/c we are working in columns now not rows
            let totalOne = squaresArr[i].innerHTML;
            let totalTwo = squaresArr[i + width].innerHTML;
            let totalThree = squaresArr[i + width * 2].innerHTML;
            let totalFour = squaresArr[i + width * 3].innerHTML;
            let column = [
                parseInt(totalOne),
                parseInt(totalTwo),
                parseInt(totalThree),
                parseInt(totalFour),
            ];

            let filteredColumn = column.filter((num) => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            //zeros are concatted to bottom of array
            let newColumn = filteredColumn.concat(zeros);

            squaresArr[i].innerHTML = newColumn[0];
            squaresArr[i + width].innerHTML = newColumn[1];
            squaresArr[i + width * 2].innerHTML = newColumn[2];
            squaresArr[i + width * 3].innerHTML = newColumn[3];
        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squaresArr[i].innerHTML;
            let totalTwo = squaresArr[i + width].innerHTML;
            let totalThree = squaresArr[i + width * 2].innerHTML;
            let totalFour = squaresArr[i + width * 3].innerHTML;
            let column = [
                parseInt(totalOne),
                parseInt(totalTwo),
                parseInt(totalThree),
                parseInt(totalFour),
            ];

            let filteredColumn = column.filter((num) => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredColumn);

            squaresArr[i].innerHTML = newColumn[0];
            squaresArr[i + width].innerHTML = newColumn[1];
            squaresArr[i + width * 2].innerHTML = newColumn[2];
            squaresArr[i + width * 3].innerHTML = newColumn[3];
        }
    }

    function combineRow() {
        //looping over last square imppossible, so only loop to 15
        for (let i = 0; i < 15; i++) {
            //if the 2 squares touching are the same number, combine
            if (squaresArr[i].innerHTML === squaresArr[i + 1].innerHTML) {
                let combinedTotal =
                    parseInt(squaresArr[i].innerHTML) +
                    parseInt(squaresArr[i + 1].innerHTML);
                squaresArr[i].innerHTML = combinedTotal;
                squaresArr[i + 1].innerHTML = 0;
                //append and update score
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        //check after each combine for win
        checkForWin();
    }

    function combineColumn() {
        //looping thru to next row down to add column, so cannot loop thru last row
        for (let i = 0; i < 12; i++) {
            if (squaresArr[i].innerHTML === squaresArr[i + width].innerHTML) {
                let combinedTotal =
                    parseInt(squaresArr[i].innerHTML) +
                    parseInt(squaresArr[i + width].innerHTML);
                squaresArr[i].innerHTML = combinedTotal;
                squaresArr[i + width].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    //assign functions to keyCodes
    function control(e) {
        if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    }
    document.addEventListener("keyup", control);

    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generate();
    }

    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generate();
    }

    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generate();
    }

    //check for the number 2048 in the squares to win
    function checkForWin() {
        for (let i = 0; i < squaresArr.length; i++) {
            if (squaresArr[i].innerHTML == 2048) {
                resultDisplay.innerHTML = "You WIN";
                document.removeEventListener("keyup", control);
            }
        }
    }

    //check if there are no zeros on the board to lose
    function checkForGameOver() {
        let zeros = 0;
        for (let i = 0; i < squaresArr.length; i++) {
            if (squaresArr[i].innerHTML == 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            document.removeEventListener("keyup", control);
            resultDisplay.innerHTML = "You lose, try again";
            resultDisplay.style.fontSize = "2rem";
        }
    }

    //add colours
    function addColours() {
        for (let i = 0; i < squaresArr.length; i++) {
            if (squaresArr[i].innerHTML == 0)
                squaresArr[i].style.backgroundColor = "#afa192";
            else if (squaresArr[i].innerHTML == 2)
                squaresArr[i].style.backgroundColor = "#eee4da";
            else if (squaresArr[i].innerHTML == 4)
                squaresArr[i].style.backgroundColor = "#ede0c8";
            else if (squaresArr[i].innerHTML == 8)
                squaresArr[i].style.backgroundColor = "#f2b179";
            else if (squaresArr[i].innerHTML == 16)
                squaresArr[i].style.backgroundColor = "#ffcea4";
            else if (squaresArr[i].innerHTML == 32)
                squaresArr[i].style.backgroundColor = "#e8c064";
            else if (squaresArr[i].innerHTML == 64)
                squaresArr[i].style.backgroundColor = "#ffab6e";
            else if (squaresArr[i].innerHTML == 128)
                squaresArr[i].style.backgroundColor = "#fd9982";
            else if (squaresArr[i].innerHTML == 256)
                squaresArr[i].style.backgroundColor = "#ead79c";
            else if (squaresArr[i].innerHTML == 512)
                squaresArr[i].style.backgroundColor = "#76daff";
            else if (squaresArr[i].innerHTML == 1024)
                squaresArr[i].style.backgroundColor = "#beeaa5";
            else if (squaresArr[i].innerHTML == 2048)
                squaresArr[i].style.backgroundColor = "#d7d4f0";
        }
    }
    addColours();

    var myTimer = setInterval(addColours, 50);
});
