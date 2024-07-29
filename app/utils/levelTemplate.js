// src/levels/level999999.js

import { createCluePaths } from "../utils/cluePathGenerator";
const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL || ""; // Base URL for images
const levelId = "level9999"; // Unique identifier for level
const title = "Wow what a great title."; // Title of the leve
// Define the visual representation of the grid
// prettier-ignore
const visualGrid = [
    
    [["##"], ["##"], ["##"], ["##"], ["##"] ],
    [["##"], ["##"], ["##"], ["##"], ["##"],["##"]],
    [["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
    [["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
    [["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
    [["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
 
];

function createGridFromVisual(visualGrid) {
	return visualGrid.map((row) => {
		if (row.length === 0) {
			return [];
		}
		return row.map((cell) => {
			const content = cell[0];
			if (content === "##") {
				return { empty: true };
			}
			if (content.match(/^\d\d$/)) {
				// Matches two digits representing a clue
				return { clue: `clue${content}` };
			}
			if (content.endsWith("_")) {
				// Check if content ends with an underscore, indicating a letter
				return { letter: content[0] };
			}
			return { empty: true };
		});
	});
}

const numberOfClues = 99;
const leve999 = {
	title: title,
	grid: createGridFromVisual(visualGrid),
	clues: createCluePaths(baseUrl, levelId, numberOfClues),
};

//export default level999;
