import { createCluePaths } from "../utils/clueUtils";
import { createGridFromVisual } from "../utils/gridFromVisualGrid"; // Import the utility function
const levelId = "tutorial"; // Unique identifier for tutorial level
const title = "Tutorial Level"; // Title of the tutorial level

// The visual representation of the grid
const visualGrid = [
	[["C_"], ["I_"], ["R_"], ["C_"], ["L_"], ["E_"]],
	[["##"], ["C_"], ["##"], ["##"], ["I_"], ["##"]],
	[["##"], ["I_"], ["##"], ["##"], ["M_"], ["##"]],
	[["##"], ["C_"], ["U_"], ["B_"], ["E_"], ["##"]],
	[["##"], ["L_"], ["##"], ["L_"], ["##"], ["##"]],
	[["##"], ["E_"], ["##"], ["U_"], ["##"], ["##"]],
	[["##"], ["##"], ["##"], ["E_"], ["##"], ["##"]],
];

const numberOfClues = 99;
const tutorial = {
	title: title,
	grid: createGridFromVisual(visualGrid),
	clues: createCluePaths(levelId, numberOfClues),
};

export default tutorial;
