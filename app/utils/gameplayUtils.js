import { getClueCellStyle } from "./clueUtils";

// Function to calculate the next position based on the current direction
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

// Function to check if a position is valid (inside the grid and not empty)
const isPositionValid = (position, grid) => {
	const [row, col] = position.split("-").map(Number);
	return (
		row >= 0 &&
		row < grid.length &&
		col >= 0 &&
		col < grid[row].length &&
		grid[row][col] &&
		!grid[row][col].empty
	);
};

// Function to move focus based on the current position and direction
export const moveFocus = (
	currentPosition,
	direction,
	focusDirection,
	inputRefs,
	correctAnswers,
	levels,
	currentLevel
) => {
	let [row, col] = currentPosition.split("-").map(Number);
	let nextPosition = getNextPosition(row, col, focusDirection, direction);

	// Continue moving focus in the current direction until a valid cell is found
	while (
		isPositionValid(nextPosition, levels[currentLevel].grid) &&
		(!inputRefs.current[nextPosition] || correctAnswers[nextPosition])
	) {
		const [nextRow, nextCol] = nextPosition.split("-").map(Number);
		nextPosition =
			focusDirection === "across"
				? direction === "forward"
					? `${nextRow}-${nextCol + 1}`
					: `${nextRow}-${nextCol - 1}`
				: direction === "forward"
				? `${nextRow + 1}-${nextCol}`
				: `${nextRow - 1}-${nextCol}`;
	}

	// Focus the next valid cell or stop if there's no more valid cell in that direction
	if (
		isPositionValid(nextPosition, levels[currentLevel].grid) &&
		inputRefs.current[nextPosition]
	) {
		inputRefs.current[nextPosition].focus();
	}
};

// Function to move focus and delete the current character
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
	const [row, col] = currentPosition.split("-").map(Number);

	// Delete the current character
	setGuesses((prevGuesses) => {
		const updatedGuesses = { ...prevGuesses };
		delete updatedGuesses[currentPosition];
		return updatedGuesses;
	});

	// Determine the previous position
	const previousPosition =
		focusDirection === "across" ? `${row}-${col - 1}` : `${row - 1}-${col}`;

	// Check if the previous position is valid and focus on it
	if (
		isPositionValid(previousPosition, levels[currentLevel].grid) &&
		inputRefs.current[previousPosition] &&
		!correctAnswers[previousPosition]
	) {
		inputRefs.current[previousPosition].focus();
	}
};
