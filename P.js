const Grid = [
    [1, 1, 3, 5, 5],
    [1, 1, 4, 4, 5],
    [1, 1, 4, 4, 5],
    [2, 1, 4, 4, 5],
    [2, 2, 4, 5, 5]
];

const starGrid = [ // Separate grid to track star placement
    ['.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.']
];

const placedRegions = []; // Array to store regions where stars are placed

function canPlace(row, col) {
    //  Row Check
    for (let i = 0; i < 5; i++) {
        if (starGrid[row][i] === '*') {  
            return false; 
        }
    }

    //  Column Check
    for (let i = 0; i < 5; i++) {
        if (starGrid[i][col] === '*') {
            return false; 
        }
    }

    //  Region Check
    let region = Grid[row][col]; // Get the region number
    if (placedRegions.includes(region)) { 
        return false; // If region already has a star, return false
    }

    return true; 
}

function placeStar(row, col) {
    if (canPlace(row, col)) {
        starGrid[row][col] = '*';  // Place star in the copied grid
        let region = Grid[row][col]; // Get the region number
        placedRegions.push(region); // Store the region number
        console.log(`Star placed at (${row}, ${col})`);
    } else {
        console.log(`Cannot place at (${row}, ${col})`);
    }
}

// Test
placeStar(0, 0); //  Region 1
placeStar(1, 1); //  (Same region as (0,0))
placeStar(2, 2); //  Region 4
placeStar(4, 4); //  Region 5
placeStar(3, 0); //  Region 2
placeStar(4, 1); //  (Same region as (3,0))

// console.log(starGrid); 
// console.log("Regions with stars: ", placedRegions);
