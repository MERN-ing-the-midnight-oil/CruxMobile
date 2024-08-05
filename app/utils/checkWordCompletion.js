export const checkWordCompletion = (grid, guesses, position) => {
	const [rowIndex, colIndex] = position.split("-").map(Number);

	const horizontalWordCompleted = checkHorizontalWord(
		grid,
		guesses,
		rowIndex,
		colIndex
	);
	const verticalWordCompleted = checkVerticalWord(
		grid,
		guesses,
		rowIndex,
		colIndex
	);

	return horizontalWordCompleted || verticalWordCompleted;
};

const checkHorizontalWord = (grid, guesses, rowIndex, colIndex) => {
	let startCol = colIndex;
	let endCol = colIndex;

	while (startCol > 0 && grid[rowIndex][startCol - 1].letter) {
		startCol--;
	}
	while (
		endCol < grid[rowIndex].length - 1 &&
		grid[rowIndex][endCol + 1].letter
	) {
		endCol++;
	}

	for (let i = startCol; i <= endCol; i++) {
		const cellPos = `${rowIndex}-${i}`;
		if (!guesses[cellPos] || guesses[cellPos] !== grid[rowIndex][i].letter) {
			console.log(
				`Checking cell at (${rowIndex}, ${i}): expected ${grid[rowIndex][i].letter}, guessed ${guesses[cellPos]}`
			);
			return false;
		}
	}

	const isWordComplete = endCol - startCol >= 1; // Ensure the word is at least 2 letters long
	if (isWordComplete) {
		console.log("A horizontal word was completed");
	}
	return isWordComplete;
};

const checkVerticalWord = (grid, guesses, rowIndex, colIndex) => {
	let startRow = rowIndex;
	let endRow = rowIndex;

	while (startRow > 0 && grid[startRow - 1][colIndex].letter) {
		startRow--;
	}
	while (endRow < grid.length - 1 && grid[endRow + 1][colIndex].letter) {
		endRow++;
	}

	for (let i = startRow; i <= endRow; i++) {
		const cellPos = `${i}-${colIndex}`;
		if (!guesses[cellPos] || guesses[cellPos] !== grid[i][colIndex].letter) {
			console.log(
				`Checking cell at (${i}, ${colIndex}): expected ${grid[i][colIndex].letter}, guessed ${guesses[cellPos]}`
			);
			return false;
		}
	}

	const isWordComplete = endRow - startRow >= 1; // Ensure the word is at least 2 letters long
	if (isWordComplete) {
		console.log("A vertical word was completed");
	}
	return isWordComplete;
};
