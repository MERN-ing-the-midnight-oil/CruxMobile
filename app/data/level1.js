import { createCluePaths } from "../utils/clueUtils";
import { createGridFromVisual } from "../utils/gridFromVisualGrid"; // Import the utility function
const levelId = "level1"; // Unique identifier for level 1
const title = `"Don't count your clichés before they hatch."`; // Title of the level

// The visual representation of the grid (the "easy grid!")
const visualGrid = [
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
	[["##"], ["##"], ["00"], ["F_"], ["##"], ["##"]],
	[["##"], ["##"], ["N_"], ["E_"], ["S_"], ["T_"]],
	[["##"], ["##"], ["##"], ["A_"], ["01"], ["##"]],
	[["##"], ["##"], ["##"], ["T_"], ["A_"], ["R_"]],
	[["##"], ["##"], ["##"], ["H_"], ["02"], ["##"]],
	[["##"], ["##"], ["##"], ["E_"], ["##"], ["##"]],
	[["##"], ["B_"], ["I_"], ["R_"], ["D_"], ["S_"]],
	[["##"], ["U_"], ["03"], ["##"], ["03"], ["##"]],
	[["##"], ["S_"], ["03"], ["03"], ["03"], ["##"]],
	[["##"], ["H_"], ["A_"], ["N_"], ["D_"], ["##"]],
	[["##"], ["16"], ["##"], ["05"], ["O_"], ["04"]],
	[["##"], ["##"], ["##"], ["05"], ["W_"], ["04"]],
	[["##"], ["##"], ["W_"], ["I_"], ["N_"], ["D_"]],
	[["##"], ["##"], ["H_"], ["06"], ["06"], ["06"]],
	[["09"], ["09"], ["I_"], ["07"], ["##"], ["06"]],
	[["09"], ["08"], ["S_"], ["T_"], ["O_"], ["P_"]],
	[["W_"], ["E_"], ["T_"], ["##"], ["##"], ["##"]],
	[["##"], ["##"], ["L_"], ["##"], ["##"], ["##"]],
	[["C_"], ["L_"], ["E_"], ["A_"], ["N_"], ["##"]],
	[["##"], ["##"], ["##"], ["10"], ["O_"], ["N_"]],
	[["##"], ["##"], ["##"], ["12"], ["S_"], ["15"]],
	[["##"], ["B_"], ["L_"], ["E_"], ["E_"], ["D_"]],
	[["##"], ["##"], ["11"], ["D_"], ["13"], ["R_"]],
	[["##"], ["##"], ["14"], ["G_"], ["##"], ["Y_"]],
	[["C_"], ["A_"], ["S_"], ["E_"], ["##"], ["##"]],
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
];

const numberOfClues = 99;
const level1 = {
	title: title,
	grid: createGridFromVisual(visualGrid),
	clues: createCluePaths(levelId, numberOfClues),
};

export default level1;
