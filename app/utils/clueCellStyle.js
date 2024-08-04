import { getClueColor } from "./getClueColor";

export function getClueCellStyle(grid, rowIndex, colIndex) {
	const cell = grid[rowIndex][colIndex];
	const color = getClueColor(cell.clue);
	let borderColor = "#ccc";

	const cellStyle = {
		borderColor: borderColor,
		borderWidth: 1,
		backgroundColor: color,
	};

	if (cell.clue) {
		// Check adjacent cells to determine if borders should be melded
		if (rowIndex > 0 && grid[rowIndex - 1][colIndex].clue === cell.clue) {
			cellStyle.borderTopColor = color;
		}
		if (colIndex > 0 && grid[rowIndex][colIndex - 1].clue === cell.clue) {
			cellStyle.borderLeftColor = color;
		}
		if (
			rowIndex < grid.length - 1 &&
			grid[rowIndex + 1][colIndex].clue === cell.clue
		) {
			cellStyle.borderBottomColor = color;
		}
		if (
			colIndex < grid[rowIndex].length - 1 &&
			grid[rowIndex][colIndex + 1].clue === cell.clue
		) {
			cellStyle.borderRightColor = color;
		}
	}

	return cellStyle;
}
