import { createCluePaths } from "../utils/clueUtils";
import { createGridFromVisual } from "../utils/gridFromVisualGrid"; // Import the utility function
const levelId = "tutorial"; // Unique identifier for tutorial level
const title = "Tutorial Level"; // Title of the tutorial level

// The visual representation of the grid
const visualGrid = [
	[["C_"], ["I_"], ["R_"], ["C_"], ["L_"], ["E_"]],
	[["01"], ["C_"], ["##"], ["03"], ["I_"], ["##"]],
	[["##"], ["I_"], ["##"], ["03"], ["M_"], ["##"]],
	[["##"], ["C_"], ["U_"], ["B_"], ["E_"], ["02"]],
	[["##"], ["L_"], ["##"], ["L_"], ["##"], ["##"]],
	[["##"], ["E_"], ["00"], ["U_"], ["##"], ["##"]],
	[["##"], ["##"], ["##"], ["E_"], ["##"], ["##"]],
];

const numberOfClues = 99;
const tutorial = {
	title: title,
	grid: createGridFromVisual(visualGrid),
	clues: createCluePaths(levelId, numberOfClues),
};

export default tutorial;
