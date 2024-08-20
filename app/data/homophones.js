import { createCluePaths } from "../utils/clueUtils";
import { createGridFromVisual } from "../utils/gridFromVisualGrid"; // Import the utility function

const levelId = "homophones"; // Unique identifier for the homophones level
const title = `"Same-same but different"`; // Title of the level

const visualGrid = [
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
	[["K_"], ["##"], ["##"], ["##"], ["##"], ["##"]],
	[["N_"], ["I_"], ["G_"], ["H_"], ["T_"], ["##"]],
	[["I_"], ["##"], ["##"], ["##"], ["##"], ["##"]],
	[["G_"], ["##"], ["##"], ["T_"], ["##"], ["##"]],
	[["H_"], ["##"], ["##"], ["I_"], ["##"], ["##"]],
	[["T_"], ["H_"], ["Y_"], ["M_"], ["E_"], ["##"]],
	[["##"], ["##"], ["##"], ["E_"], ["##"], ["##"]],
	[["##"], ["##"], ["##"], ["##"], ["##"], ["H_"]],
	[["##"], ["##"], ["F_"], ["##"], ["##"], ["A_"]],
	[["##"], ["##"], ["L_"], ["##"], ["##"], ["I_"]],
	[["F_"], ["L_"], ["O_"], ["W_"], ["E_"], ["R_"]],
	[["##"], ["##"], ["U_"], ["##"], ["##"], ["##"]],
	[["H_"], ["A_"], ["R_"], ["E_"], ["##"], ["##"]],
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
	[["##"], ["##"], ["##"], ["P_"], ["##"], ["##"]],
	[["##"], ["D_"], ["U_"], ["A_"], ["L_"], ["##"]],
	[["##"], ["U_"], ["##"], ["I_"], ["##"], ["##"]],
	[["P_"], ["E_"], ["A_"], ["R_"], ["S_"], ["##"]],
	[["##"], ["L_"], ["##"], ["S_"], ["##"], ["##"]],
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
	[["##"], ["##"], ["##"], ["##"], ["Y_"], ["##"]],
	[["##"], ["##"], ["M_"], ["##"], ["O_"], ["##"]],
	[["##"], ["##"], ["U_"], ["##"], ["K_"], ["##"]],
	[["M_"], ["U_"], ["S_"], ["S_"], ["E_"], ["L_"]],
	[["##"], ["##"], ["C_"], ["##"], ["##"], ["##"]],
	[["Y_"], ["O_"], ["L_"], ["K_"], ["##"], ["##"]],
	[["##"], ["##"], ["E_"], ["##"], ["##"], ["##"]],
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
];

const numberOfClues = 99;
const homophones = {
	title: title,
	grid: createGridFromVisual(visualGrid),
	clues: createCluePaths(levelId, numberOfClues),
};

export default homophones;
