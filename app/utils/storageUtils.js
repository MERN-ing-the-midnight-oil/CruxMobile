import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadGuesses = async (currentLevel, setGuesses) => {
	const savedGuesses = await AsyncStorage.getItem(`guesses-${currentLevel}`);
	if (savedGuesses) {
		setGuesses(JSON.parse(savedGuesses));
	} else {
		setGuesses({});
	}
};

export const saveGuesses = async (currentLevel, guesses) => {
	const savedGuesses = JSON.stringify(guesses);
	await AsyncStorage.setItem(`guesses-${currentLevel}`, savedGuesses);
};

export const loadCorrectAnswers = async (currentLevel, setCorrectAnswers) => {
	const savedCorrectAnswers = await AsyncStorage.getItem(
		`correctAnswers-${currentLevel}`
	);
	if (savedCorrectAnswers) {
		setCorrectAnswers(JSON.parse(savedCorrectAnswers));
	} else {
		setCorrectAnswers({});
	}
};

export const saveCorrectAnswers = async (currentLevel, correctAnswers) => {
	const savedCorrectAnswers = JSON.stringify(correctAnswers);
	await AsyncStorage.setItem(
		`correctAnswers-${currentLevel}`,
		savedCorrectAnswers
	);
};

export const clearStorageForLevel = async (level) => {
	try {
		await AsyncStorage.removeItem(`guesses-${level}`);
		await AsyncStorage.removeItem(`correctAnswers-${level}`);
	} catch (e) {
		console.error("Failed to clear AsyncStorage", e);
	}
};
