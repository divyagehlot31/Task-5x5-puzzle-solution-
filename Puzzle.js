const readline = require('readline'); // User input lene ke liye readline module import kiya

// Readline interface create kiya jo input lega terminal se
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ye grid regions dikhata h, jisme hume star rakhna h
const Grid = [
    [1, 1, 3, 5, 5],
    [1, 1, 4, 4, 5],
    [1, 1, 4, 4, 5],
    [2, 1, 4, 4, 5],
    [2, 2, 4, 5, 5]
];
console.log("\n ********** Welcome to the Star Placement Game **********");
console.table(Grid);

// Ye grid stars store karega
const starGrid = [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ']
];

const placedRegions = []; // Un regions ki list jisme star rakh chuke h
let starsPlaced = 0; // Kitne stars place ho chuke h, ye count karega

// Ye function check karega ki given position pr star rakh sakte h ya nhi
function canPlace(row, col) {
    // Row check karega ki us row me pehle se star h ya nhi
    for (let i = 0; i < 5; i++) {
        if (starGrid[row][i] === '*') return false;
        if (starGrid[i][col] === '*') return false;
    }
    
    // Ye check karega ki jis region me star rakh rahe h, waha pehle se star h ya nhi
    let region = Grid[row][col]; // Current region nikalenge
    if (placedRegions.includes(region)) return false; // Agar us region me star h to false

    return true; // Agar sab kuch sahi h to star place kar sakte h
}

// Ye function check karega ki star kisi aur star ke bilkul paas to nhi h
function isSafe(row, col) {
    let directions = [
        [-1, -1], [-1, 0], [-1, 1],  // Upar-left, upar, upar-right
        [0, -1],         [0, 1],      // Left, Right
        [1, -1], [1, 0], [1, 1]       // Niche-left, niche, niche-right
    ];
    
    for (let [dx, dy] of directions) {
        let newRow = row + dx;
        let newCol = col + dy;

        // Check karega ki newRow aur newCol grid ke andar h ya nhi
        if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 5) {
            if (starGrid[newRow][newCol] === '*') { 
                return false; // Agar aas paas star h to false
            }
        }
    }
    return true; // Agar aas paas koi star nhi h to true
}

// Ye function star place karega agar possible h to
function placeStar(row, col) {
    if (canPlace(row, col) && isSafe(row, col)) {
        starGrid[row][col] = '*';  // Star rakh denge
        
        let region = Grid[row][col]; // Uska region nikalenge

        placedRegions.push(region);  // Region list me add karenge

        starsPlaced++; // Stars count badha denge

        console.log(` Star placed at (${row}, ${col})
                       `);
    } else {
        console.log(` Cannot place at (${row}, ${col}). Try another position.`);
    }
}

// User se input lene ka function, jab tak 5 stars place nhi ho jaye tab tak chalega
function askForInput() {
    if (starsPlaced >= 5) {
        console.log("\n🎉 All 5 stars placed successfully!\n");
        // console.table(starGrid); // Final star grid dikhayenge

        rl.close(); // Input band karenge
        return;
    }

    // User se input lenge
    rl.question(`Enter row (0-4) and col (0-4) to place star (e.g. 2 3): `, (input) => {
        let [row, col] = input.split(" ").map(Number); // Input ko number me convert karenge

        // Check karenge ki input valid h ya nhi
        if (isNaN(row) || isNaN(col) || row < 0 || row > 4 || col < 0 || col > 4) {
            console.log(" Invalid input! Please enter numbers between 0-4.");
        } else {
            placeStar(row, col); // Star place karne ka function call karenge
        }

        askForInput(); // Dubara input maangenge jab tak 5 stars place na ho
    });
}

// Game start karenge

console.log("***You need to place 5 stars in a valid position on the grid!***\n");
askForInput(); // User se input lena start karenge

// console.table(starGrid); // Empty grid dikhayenge


// placeStar(2, 0); 
// placeStar(4, 1); 
// placeStar(0, 2); 
// placeStar(3, 3); 
// placeStar(0, 4); 
// placeStar(1, 4); 