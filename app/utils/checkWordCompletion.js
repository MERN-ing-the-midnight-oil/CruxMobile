export const checkWordCompletion = (grid, guesses, position) => {
	const [row, col] = position.split("-").map(Number);
	let horizontalCompleted = false;
	let verticalCompleted = false;

	// Check horizontal word
	let startCol = col;
	let endCol = col;
	while (startCol > 0 && grid[row][startCol - 1].letter) startCol--;
	while (endCol < grid[row].length - 1 && grid[row][endCol + 1].letter)
		endCol++;

	console.log(`Checking horizontal word at position: (${row}, ${col})`);
	console.log(`Horizontal word start at column: ${startCol}`);
	console.log(`Horizontal word end at column: ${endCol}`);

	if (endCol - startCol > 0) {
		horizontalCompleted = true;
		for (let c = startCol; c <= endCol; c++) {
			const expected = grid[row][c].letter;
			const guessed = guesses[`${row}-${c}`];
			console.log(
				`Checking cell at (${row}, ${c}): expected ${expected}, guessed ${guessed}`
			);
			if (expected !== guessed) {
				horizontalCompleted = false;
				break;
			}
		}
		if (horizontalCompleted) {
			console.log("A horizontal word was completed");
		}
	} else {
		console.log("Horizontal word is less than two letters, not completed");
	}

	// Check vertical word
	let startRow = row;
	let endRow = row;
	while (startRow > 0 && grid[startRow - 1][col].letter) startRow--;
	while (endRow < grid.length - 1 && grid[endRow + 1][col].letter) endRow++;

	console.log(`Checking vertical word at position: (${row}, ${col})`);
	console.log(`Vertical word start at row: ${startRow}`);
	console.log(`Vertical word end at row: ${endRow}`);

	if (endRow - startRow > 0) {
		verticalCompleted = true;
		for (let r = startRow; r <= endRow; r++) {
			const expected = grid[r][col].letter;
			const guessed = guesses[`${r}-${col}`];
			console.log(
				`Checking cell at (${r}, ${col}): expected ${expected}, guessed ${guessed}`
			);
			if (expected !== guessed) {
				verticalCompleted = false;
				break;
			}
		}
		if (verticalCompleted) {
			console.log("A vertical word was completed");
		}
	} else {
		console.log("Vertical word is less than two letters, not completed");
	}

	// Return true if either word is completed
	if (horizontalCompleted || verticalCompleted) {
		return true;
	}

	return false;
};
