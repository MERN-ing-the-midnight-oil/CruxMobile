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

	// Check boundaries
	if (row >= grid.length || row < 0 || col >= grid[row].length || col < 0) {
		return false;
	}

	// The cell must not be empty and must not be a clue cell
	return !grid[row][col].empty && !grid[row][col].clue;
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

	// Continue moving focus in the current direction within the same word
	while (
		isPositionValid(nextPosition, levels[currentLevel].grid) &&
		(!inputRefs.current[nextPosition] || // Cell is not focusable
			correctAnswers[nextPosition]) // Skip over correct letters
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

	// Only move focus if the next position is valid
	if (
		isPositionValid(nextPosition, levels[currentLevel].grid) &&
		inputRefs.current[nextPosition]
	) {
		if (focusDirection === "across") {
			console.log("Setting focus across");
		} else {
			console.log("Setting focus down");
		}
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
