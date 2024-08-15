import { getClueCellStyle } from "./clueUtils";

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
					direction === "forward" ? `${nextRow + 1}` : `${nextRow - 1}`;
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
