import { createCluePaths } from "../utils/clueUtils";
import { createGridFromVisual } from "../utils/gridFromVisualGrid"; // Import the utility function

const levelId = "easylevel"; // Unique identifier for the easy level
const title = `"Getting Started"`; // Title of the level
const secondaryTitle =
	"The common element between the first two clues is the color yellow. So the answer to the first word across is `YELLOW`. Typing correct letters will turn the crossword spaces green. "; // Secondary title

const visualGrid = [
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],

	[["Y_"], ["E_"], ["L_"], ["L_"], ["O_"], ["W_"]],
	[["##"], ["01"], ["E_"], ["##"], ["02"], ["O_"]],
	[["##"], ["##"], ["O_"], ["##"], ["##"], ["L_"]],
	[["##"], ["##"], ["P_"], ["##"], ["##"], ["F_"]],
	[["##"], ["03"], ["A_"], ["##"], ["##"], ["07"]],
	[["P_"], ["U_"], ["R_"], ["P_"], ["L_"], ["E_"]],
	[["E_"], ["04"], ["D_"], ["##"], ["##"], ["##"]],
	[["A_"], ["##"], ["##"], ["##"], ["##"], ["##"]],
	[["C_"], ["##"], ["##"], ["##"], ["I_"], ["##"]],
	[["O_"], ["R_"], ["A_"], ["N_"], ["G_"], ["E_"]],
	[["C_"], ["05"], ["##"], ["06"], ["U_"], ["##"]],
	[["K_"], ["##"], ["##"], ["##"], ["A_"], ["##"]],
	[["##"], ["##"], ["T_"], ["A_"], ["N_"], ["##"]],
	[["##"], ["##"], ["##"], ["00"], ["A_"], ["##"]],
	[["##"], ["##"], ["##"], ["##"], ["##"], ["##"]],
];

const numberOfClues = 99;
const easylevel = {
	title: title,
	secondaryTitle: secondaryTitle,
	grid: createGridFromVisual(visualGrid),
	clues: createCluePaths(levelId, numberOfClues),
};

export default easylevel;
