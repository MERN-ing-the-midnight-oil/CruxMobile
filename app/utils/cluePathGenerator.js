import { imagePaths } from "../utils/imagePaths";

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
