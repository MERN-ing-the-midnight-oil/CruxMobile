import { getClueCellStyle } from "./clueUtils";

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

	// Try to move focus in the current direction
	while (
		isPositionValid(nextPosition, levels[currentLevel].grid) &&
		(correctAnswers[nextPosition] || !inputRefs.current[nextPosition])
	) {
		console.log(`Skipping locked cell at ${nextPosition}.`);
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

	// If no valid cell was found in the current direction, switch direction
	if (
		!isPositionValid(nextPosition, levels[currentLevel].grid) ||
		!inputRefs.current[nextPosition]
	) {
		console.log(
			`No valid cell to focus on in the ${focusDirection} direction. Switching direction.`
		);

		const newDirection = focusDirection === "across" ? "down" : "across";
		nextPosition = getNextPosition(row, col, newDirection, direction);

		// Try to move focus in the new direction
		while (
			isPositionValid(nextPosition, levels[currentLevel].grid) &&
			(correctAnswers[nextPosition] || !inputRefs.current[nextPosition])
		) {
			console.log(`Skipping locked cell at ${nextPosition}.`);
			const [nextRow, nextCol] = nextPosition.split("-").map(Number);
			nextPosition =
				newDirection === "across"
					? direction === "forward"
						? `${nextRow}-${nextCol + 1}`
						: `${nextRow}-${nextCol - 1}`
					: direction === "forward"
					? `${nextRow + 1}-${nextCol}`
					: `${nextRow - 1}-${nextCol}`;
		}

		if (
			isPositionValid(nextPosition, levels[currentLevel].grid) &&
			inputRefs.current[nextPosition]
		) {
			console.log(
				`Focusing on cell at ${nextPosition} in the ${newDirection} direction.`
			);
			inputRefs.current[nextPosition].focus();
		} else {
			console.log(
				`No valid cell to focus on in the ${newDirection} direction.`
			);
		}
	} else {
		console.log(
			`Focusing on cell at ${nextPosition} in the ${focusDirection} direction.`
		);
		inputRefs.current[nextPosition].focus();
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

const getNextPosition = (row, col, direction, moveDirection) => {
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

const isPositionValid = (position, grid) => {
	const [row, col] = position.split("-").map(Number);
	if (row >= grid.length || row < 0) {
		return false;
	}
	if (col >= grid[row].length || col < 0) {
		return false;
	}
	return !grid[row][col].empty;
};
