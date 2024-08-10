// utils/gridFromVisualGrid.js

export function createGridFromVisual(visualGrid) {
	if (!Array.isArray(visualGrid)) {
		console.error("visualGrid is not an array:", visualGrid);
		return [];
	}

	const grid = visualGrid.map((row, rowIndex) => {
		if (!Array.isArray(row) || row.length === 0) {
			console.error("Row is not an array or is empty at index:", rowIndex, row);
			return [];
		}

		return row.map((cell, cellIndex) => {
			if (!Array.isArray(cell) || cell.length === 0) {
				console.error(
					"Cell is not an array or is empty at row, cell index:",
					rowIndex,
					cellIndex,
					cell
				);
				return { empty: true };
			}

			const content = cell[0];
			if (content === undefined || content === null) {
				console.error(
					"Content is undefined or null at row, cell index:",
					rowIndex,
					cellIndex,
					cell
				);
				return { empty: true };
			}

			if (content === "##") {
				return { empty: true };
			}

			if (typeof content === "string" && content.match(/^\d\d$/)) {
				// Matches two digits representing a clue
				return { clue: `clue${content}` };
			}

			if (typeof content === "string" && content.endsWith("_")) {
				// Check if content ends with an underscore, indicating a letter
				return { letter: content[0] };
			}

			console.error(
				"Unexpected content format at row, cell index:",
				rowIndex,
				cellIndex,
				cell
			);
			return { empty: true };
		});
	});

	// Log the created grid to the console for demonstration purposes
	return grid;
}
