<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Star Grid Game</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
        }
        #grid {
            display: grid;
            gap: 5px;
            margin: 20px auto;
        }
        .cell {
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            border: 1px solid black;
            cursor: pointer;
        }
        .cell.star {
            background-color: yellow;
        }
        button {
            margin-top: 10px;
            padding: 10px;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h1>Star Grid Game</h1>
    <label for="size">Enter grid size: </label>
    <input type="number" id="size" min="1" value="5">
    <button onclick="generateGrid()">Start Game</button>
    <div id="grid"></div>
    <button onclick="checkSolution()">Check Solution</button>
    <p id="message"></p>

    <script>
        let size = 5;
        let grid = [];
        
        function generateGrid() {
            size = parseInt(document.getElementById('size').value);
            const gridElement = document.getElementById('grid');
            gridElement.innerHTML = '';
            gridElement.style.gridTemplateColumns = `repeat(${size}, 50px)`;
            grid = Array.from({ length: size }, () => Array(size).fill(' '));
            
            for (let row = 0; row < size; row++) {
                for (let col = 0; col < size; col++) {
                    let cell = document.createElement('div');
                    cell.classList.add('cell');
                    cell.dataset.row = row;
                    cell.dataset.col = col;
                    cell.addEventListener('click', toggleStar);
                    gridElement.appendChild(cell);
                }
            }
        }

        function toggleStar(event) {
            let row = event.target.dataset.row;
            let col = event.target.dataset.col;
            
            if (grid[row][col] === '*') {
                grid[row][col] = ' ';
                event.target.classList.remove('star');
                event.target.textContent = '';
            } else if (canPlace(row, col) && isSafe(row, col)) {
                grid[row][col] = '*';
                event.target.classList.add('star');
                event.target.textContent = '*';
            }
        }

        function canPlace(row, col) {
            for (let i = 0; i < size; i++) {
                if (grid[row][i] === '*' || grid[i][col] === '*') return false;
            }
            return true;
        }

        function isSafe(row, col) {
            let directions = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1],         [0, 1],
                [1, -1], [1, 0], [1, 1]
            ];
            for (let [dx, dy] of directions) {
                let newRow = parseInt(row) + dx;
                let newCol = parseInt(col) + dy;
                if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
                    if (grid[newRow][newCol] === '*') return false;
                }
            }
            return true;
        }

        function checkSolution() {
            for (let row = 0; row < size; row++) {
                let rowCount = 0, colCount = 0;
                for (let col = 0; col < size; col++) {
                    if (grid[row][col] === '*') rowCount++;
                    if (grid[col][row] === '*') colCount++;
                }
                if (rowCount > 1 || colCount > 1) {
                    document.getElementById('message').textContent = '❌ Invalid Solution!';
                    return;
                }
            }
            document.getElementById('message').textContent = '✅ Valid Solution!';
        }
    </script>
</body>
</html>

