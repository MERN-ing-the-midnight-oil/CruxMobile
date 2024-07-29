import { Asset } from "expo-asset";

export const imagePaths = {
	level1: {
		clue00: Asset.fromModule(
			require("../../assets/images/clues/level1/clue00.webp")
		).uri,
		clue01: Asset.fromModule(
			require("../../assets/images/clues/level1/clue01.webp")
		).uri,
		clue02: Asset.fromModule(
			require("../../assets/images/clues/level1/clue02.webp")
		).uri,
		clue03: Asset.fromModule(
			require("../../assets/images/clues/level1/clue03.webp")
		).uri,
		// Continue adding all other clues for level1
	},
	level2: {},
	// Add more levels as needed
};
