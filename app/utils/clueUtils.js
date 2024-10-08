import { imagePaths } from "./imagePaths";

export const createCluePaths = (levelId, numClues) => {
	let paths = {};
	for (let i = 0; i < numClues; i++) {
		const clueKey = `clue${String(i).padStart(2, "0")}`; // Formats as 'clue00', 'clue01', etc.
		if (imagePaths[levelId] && imagePaths[levelId][clueKey]) {
			paths[clueKey] = imagePaths[levelId][clueKey];
		}
	}
	return paths;
};

function simpleHash(str) {
	if (!str || typeof str !== "string") {
		return 0;
	}

	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash |= 0; // Convert to 32bit integer
	}
	return Math.abs(hash);
}

export function getClueColor(clue) {
	const hash = simpleHash(clue);
	const colors = [
		"#00BFFF", // deepskyblue
		"#5F9EA0", // cadetblue
		"#4682B4", // steelblue
		"#7B68EE", // mediumslateblue
		"#6A5ACD", // slateblue
		"#48D1CC", // mediumturquoise
		"#00CED1", // darkturquoise
		"#20B2AA", // lightseagreen
		"#40E0D0", // turquoise
		"#8B4513", // saddlebrown
		"#A0522D", // sienna
		"#D2691E", // chocolate
		"#CD853F", // peru
		"#BC8F8F", // rosybrown
		"#F4A460", // sandybrown
		"#D2B48C", // tan
		"#8FBC8F", // darkseagreen
		"#556B2F", // darkolivegreen
		"#FF6347", // tomato
		"#4682B4", // steelblue (used for good contrast)
	];
	return colors[hash % colors.length];
}

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
