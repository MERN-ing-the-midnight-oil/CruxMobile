// utils/checkWordCompletion.js

/**
 * Checks if completing a word by entering a letter.
 * @param {Array} grid - The entire game grid as a 2D array.
 * @param {Object} guesses - Current guesses state.
 * @param {string} position - The position of the newly guessed letter, in "row-col" format.
 * @returns {boolean} - True if any word is just completed, otherwise false.
 */
export const checkWordCompletion = (grid, guesses, position) => {
	const [row, col] = position.split("-").map(Number);
	const directions = [
		{ name: "horizontal", vector: [0, 1] }, // Right
		{ name: "horizontal", vector: [0, -1] }, // Left
		{ name: "vertical", vector: [1, 0] }, // Down
		{ name: "vertical", vector: [-1, 0] }, // Up
	];

	let isComplete = false;

	for (let { name, vector } of directions) {
		let [dRow, dCol] = vector;
		let sequence = [];
		let sequencePositions = [];

		// Traverse in one direction
		let i = row,
			j = col;
		while (true) {
			i += dRow;
			j += dCol;
			if (
				i < 0 ||
				i >= grid.length ||
				j < 0 ||
				j >= grid[i].length ||
				grid[i][j].empty
			) {
				break;
			}
			sequence.push(grid[i][j].letter);
			sequencePositions.push(`${i}-${j}`);
		}

		// Reset indices to start position before traversing in the opposite direction
		i = row;
		j = col;

		// Traverse in the opposite direction
		while (true) {
			i -= dRow;
			j -= dCol;
			if (
				i < 0 ||
				i >= grid.length ||
				j < 0 ||
				j >= grid[i].length ||
				grid[i][j].empty
			) {
				break;
			}
			sequence.unshift(grid[i][j].letter);
			sequencePositions.unshift(`${i}-${j}`);
		}

		// Check completion for the current direction
		if (
			sequence.length > 1 &&
			sequence.every(
				(letter, idx) => guesses[sequencePositions[idx]] === letter
			)
		) {
			console.log(
				`${name} word at position ${position} is complete from ${
					sequencePositions[0]
				} to ${sequencePositions[sequencePositions.length - 1]}`
			);
			isComplete = true; // Set true if at least one word is completed
		}
	}

	return isComplete;
};
