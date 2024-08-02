const checkWordCompletion = (grid, guesses, position) => {
	const [row, col] = position.split("-").map(Number);
	console.log(`Checking word completion at position: (${row}, ${col})`);

	const wordVertical = checkVertical(grid, guesses, row, col);
	const wordHorizontal = checkHorizontal(grid, guesses, row, col);

	return wordVertical || wordHorizontal;
};

const checkVertical = (grid, guesses, row, col) => {
	console.log(`Checking vertical word at position: (${row}, ${col})`);

	// Traverse upwards
	let startRow = row;
	while (
		startRow > 0 &&
		isValidOrEmptyCell(grid[startRow - 1][col], guesses, startRow - 1, col)
	) {
		startRow--;
	}
	console.log(`Vertical word start at row: ${startRow}`);

	// Traverse downwards
	let endRow = row;
	while (
		endRow < grid.length - 1 &&
		isValidOrEmptyCell(grid[endRow + 1][col], guesses, endRow + 1, col)
	) {
		endRow++;
	}
	console.log(`Vertical word end at row: ${endRow}`);

	// Ensure the word has at least two letters
	if (endRow - startRow < 1) {
		console.log("Vertical word is less than two letters, not completed");
		return false;
	}

	// Check for word completion
	for (let r = startRow; r <= endRow; r++) {
		const cell = grid[r][col];
		const guess = guesses[`${r}-${col}`];
		console.log(
			`Checking cell at (${r}, ${col}): expected ${cell.letter}, guessed ${guess}`
		);
		if (cell.letter && guess !== cell.letter) {
			if (guess === undefined) {
				console.log(
					`Vertical word not completed: undefined guess at position (${r}, ${col})`
				);
				return false;
			}
			console.log(`Vertical word not completed at position: (${r}, ${col})`);
			return false;
		}
	}
	console.log("A vertical word was completed");
	return true;
};

const checkHorizontal = (grid, guesses, row, col) => {
	console.log(`Checking horizontal word at position: (${row}, ${col})`);

	// Traverse leftwards
	let startCol = col;
	while (
		startCol > 0 &&
		isValidOrEmptyCell(grid[row][startCol - 1], guesses, row, startCol - 1)
	) {
		startCol--;
	}
	console.log(`Horizontal word start at column: ${startCol}`);

	// Traverse rightwards
	let endCol = col;
	while (
		endCol < grid[row].length - 1 &&
		isValidOrEmptyCell(grid[row][endCol + 1], guesses, row, endCol + 1)
	) {
		endCol++;
	}
	console.log(`Horizontal word end at column: ${endCol}`);

	// Ensure the word has at least two letters
	if (endCol - startCol < 1) {
		console.log("Horizontal word is less than two letters, not completed");
		return false;
	}

	// Check for word completion
	for (let c = startCol; c <= endCol; c++) {
		const cell = grid[row][c];
		const guess = guesses[`${row}-${c}`];
		console.log(
			`Checking cell at (${row}, ${c}): expected ${cell.letter}, guessed ${guess}`
		);
		if (cell.letter && guess !== cell.letter) {
			if (guess === undefined) {
				console.log(
					`Horizontal word not completed: undefined guess at position (${row}, ${c})`
				);
				return false;
			}
			console.log(`Horizontal word not completed at position: (${row}, ${c})`);
			return false;
		}
	}
	console.log("A horizontal word was completed");
	return true;
};

const isValidOrEmptyCell = (cell, guesses, row, col) => {
	if (cell.empty || cell.clue) {
		return false;
	}
	const guess = guesses[`${row}-${col}`];
	console.log(
		`Validating cell at (${row}, ${col}): expected ${cell.letter}, guessed ${guess}`
	);
	if (cell.letter && guess !== cell.letter && guess !== undefined) {
		return false;
	}
	return true;
};

export { checkWordCompletion };
