// app/utils/gameplayUtils.js

import { getClueColor, getClueCellStyle } from "./clueUtils";

// Check word completion function
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

// Utility functions
export const getNextPosition = (row, col, direction, moveDirection) => {
	if (direction === "across") {
		return moveDirection === "forward"
			? `${row}-${col + 1}`
			: `${row}-${col - 1}`;
	} else {
		return moveDirection === "forward"
			? `${row + 1}-${col}`
			: `${row - 1}-${col}`;
	}
};

export const isPositionValid = (position, grid) => {
	const [row, col] = position.split("-").map(Number);
	if (row >= grid.length || row < 0) {
		return false;
	}
	if (col >= grid[row].length || col < 0) {
		return false;
	}
	return !grid[row][col].empty;
};

export const moveFocus = (
	currentPosition,
	direction,
	focusDirection,
	inputRefs,
	correctAnswers,
	levels,
	currentLevel,
	setFocusDirection
) => {
	const [row, col] = currentPosition.split("-").map(Number);
	let nextPosition = getNextPosition(row, col, focusDirection, direction);

	while (
		isPositionValid(nextPosition, levels[currentLevel].grid) &&
		correctAnswers[nextPosition]
	) {
		const [nextRow, nextCol] = nextPosition.split("-").map(Number);
		if (focusDirection === "across") {
			nextPosition =
				direction === "forward"
					? `${nextRow}-${nextCol + 1}`
					: `${nextRow}-${nextCol - 1}`;
		} else {
			nextPosition =
				direction === "forward"
					? `${nextRow + 1}-${nextCol}`
					: `${nextRow - 1}-${nextCol}`;
		}
	}

	if (
		isPositionValid(nextPosition, levels[currentLevel].grid) &&
		inputRefs.current[nextPosition]
	) {
		inputRefs.current[nextPosition].focus();
	} else {
		const newDirection = focusDirection === "across" ? "down" : "across";
		nextPosition = getNextPosition(row, col, newDirection, direction);

		while (
			isPositionValid(nextPosition, levels[currentLevel].grid) &&
			correctAnswers[nextPosition]
		) {
			const [nextRow, nextCol] = nextPosition.split("-").map(Number);
			if (newDirection === "across") {
				nextPosition =
					direction === "forward"
						? `${nextRow}-${nextCol + 1}`
						: `${nextRow}-${nextCol - 1}`;
			} else {
				nextPosition =
					direction === "forward"
						? `${nextRow + 1}-${nextCol}`
						: `${nextRow - 1}-${nextCol}`;
			}
		}

		if (
			isPositionValid(nextPosition, levels[currentLevel].grid) &&
			inputRefs.current[nextPosition]
		) {
			inputRefs.current[nextPosition].focus();
			setFocusDirection(newDirection);
		}
	}
};

export const moveFocusAndDelete = (
	currentPosition,
	focusDirection,
	inputRefs,
	correctAnswers,
	guesses,
	setGuesses,
	levels,
	currentLevel
) => {
	let [row, col] = currentPosition.split("-").map(Number);

	const deleteCharacter = (pos) => {
		setGuesses((prevGuesses) => {
			const updatedGuesses = { ...prevGuesses };
			delete updatedGuesses[pos];
			return updatedGuesses;
		});
	};

	const moveFocus = (newPosition) => {
		if (
			isPositionValid(newPosition, levels[currentLevel].grid) &&
			inputRefs.current[newPosition]
		) {
			inputRefs.current[newPosition].focus();
			return newPosition;
		}
		return null;
	};

	const directions =
		focusDirection === "across" ? ["left", "up"] : ["up", "left"];
	for (let direction of directions) {
		let nextPosition =
			direction === "left" ? `${row}-${col - 1}` : `${row - 1}-${col}`;
		while (isPositionValid(nextPosition, levels[currentLevel].grid)) {
			const [nextRow, nextCol] = nextPosition.split("-").map(Number);
			if (!correctAnswers[nextPosition] && guesses[nextPosition]) {
				deleteCharacter(nextPosition);
				const newPos = moveFocus(nextPosition);
				if (newPos) {
					row = nextRow;
					col = nextCol;
				} else {
					break;
				}
			} else {
				break;
			}
			nextPosition =
				direction === "left" ? `${row}-${col - 1}` : `${row - 1}-${col}`;
		}
	}
};

// Style utilities for clue cells
export { getClueCellStyle } from "./clueUtils";
