import React, { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Modal,
	Image,
	Button,
	FlatList,
	Dimensions,
	Alert,
} from "react-native";
import Confetti from "react-native-confetti";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import level1 from "../data/level1";
import level2 from "../data/level2";
import { getClueColor } from "../utils/getClueColor";
import { checkWordCompletion } from "../utils/checkWordCompletion";
import { createCluePaths } from "../utils/cluePathGenerator"; // Corrected import path

const { width } = Dimensions.get("window");

const GameBoard = () => {
	const levels = { level1, level2 };
	const [currentLevel, setCurrentLevel] = useState("");
	const [guesses, setGuesses] = useState({});
	const [lastUpdatedPosition, setLastUpdatedPosition] = useState(null); // New state
	const [showPickerModal, setShowPickerModal] = useState(false);
	const [showClueModal, setShowClueModal] = useState(false);
	const [currentClueUrl, setCurrentClueUrl] = useState("");
	const [gameContainerWidth, setGameContainerWidth] = useState(0);
	const [focusDirection, setFocusDirection] = useState("across");
	const inputRefs = useRef({});
	const [cluePaths, setCluePaths] = useState({});

	useEffect(() => {
		const loadGuesses = async () => {
			const savedGuesses = await AsyncStorage.getItem(
				`guesses-${currentLevel}`
			);
			console.log("Loaded Guesses:", savedGuesses); // Add this line
			if (savedGuesses) {
				setGuesses(JSON.parse(savedGuesses));
			} else {
				setGuesses({});
			}
		};
		loadGuesses();
	}, [currentLevel]);

	useEffect(() => {
		const saveGuesses = async () => {
			const savedGuesses = JSON.stringify(guesses);
			await AsyncStorage.setItem(`guesses-${currentLevel}`, savedGuesses);
		};
		saveGuesses();
	}, [guesses, currentLevel]);

	useEffect(() => {
		if (currentLevel) {
			const numClues = levels[currentLevel].clues
				? Object.keys(levels[currentLevel].clues).length
				: 0;
			setCluePaths(createCluePaths(currentLevel, numClues)); // Generate clue paths
		}
	}, [currentLevel]);

	useEffect(() => {
		if (lastUpdatedPosition) {
			const [rowIndex, colIndex] = lastUpdatedPosition.split("-").map(Number);
			const correct =
				levels[currentLevel].grid[rowIndex][colIndex].letter ===
				guesses[lastUpdatedPosition];
			if (correct) {
				console.log("Checked For Word Completion"); // Log added here
				const wordCompleted = checkWordCompletion(
					levels[currentLevel].grid,
					guesses,
					lastUpdatedPosition
				);
				if (wordCompleted) {
					Alert.alert("Congratulations!", "You completed a word!");
				}
			}
		}
	}, [guesses, lastUpdatedPosition, currentLevel]); // Trigger check after guesses update

	const handleLevelChange = (value) => {
		setCurrentLevel(value);
		setGuesses({});
		setLastUpdatedPosition(null); // Reset last updated position
		setShowPickerModal(false);
	};

	const handleInputChange = (position, text) => {
		const newGuess = text.toUpperCase().slice(-1); // Get the last typed character

		setGuesses((prevGuesses) => ({
			...prevGuesses,
			[position]: newGuess,
		}));
		setLastUpdatedPosition(position); // Update last position

		moveFocus(position);
	};

	const handleFocus = (position) => {
		if (guesses[position]) {
			setGuesses((prevGuesses) => ({
				...prevGuesses,
				[position]: "",
			}));
		}
	};

	const moveFocus = (currentPosition) => {
		const [row, col] = currentPosition.split("-").map(Number);
		let nextPosition = getNextPosition(row, col, focusDirection);

		if (!isPositionValid(nextPosition)) {
			const newDirection = focusDirection === "across" ? "down" : "across";
			nextPosition = getNextPosition(row, col, newDirection);
			if (isPositionValid(nextPosition)) {
				setFocusDirection(newDirection);
			} else {
				return;
			}
		}

		if (inputRefs.current[nextPosition]) {
			inputRefs.current[nextPosition].focus();
		}
	};

	const getNextPosition = (row, col, direction) => {
		if (direction === "across") {
			return `${row}-${col + 1}`;
		} else {
			return `${row + 1}-${col}`;
		}
	};

	const isPositionValid = (position) => {
		const [row, col] = position.split("-").map(Number);
		if (row >= levels[currentLevel].grid.length || row < 0) {
			return false;
		}
		if (col >= levels[currentLevel].grid[row].length || col < 0) {
			return false;
		}
		return !levels[currentLevel].grid[row][col].empty;
	};

	const handleTouchStart = (clueKey, e) => {
		e.stopPropagation();
		setCurrentClueUrl(cluePaths[clueKey]);
		setShowClueModal(true);
		console.log("Clue URL:", cluePaths[clueKey]); // Log clue URL to verify path
	};

	const handleTouchEnd = (e) => {
		e.stopPropagation();
		setShowClueModal(false);
	};

	const clearStorageForLevel = async (level) => {
		try {
			await AsyncStorage.removeItem(`guesses-${level}`);
			console.log(`AsyncStorage cleared for level ${level}`);
		} catch (e) {
			console.error("Failed to clear AsyncStorage", e);
		}
	};

	const clearGuesses = async () => {
		await clearStorageForLevel(currentLevel);
		setGuesses({});
	};

	const renderCell = (cell, rowIndex, colIndex) => {
		const position = `${rowIndex}-${colIndex}`;
		const cellSize = gameContainerWidth / 6;
		let cellStyle = {
			borderColor: "#ccc",
			borderWidth: 1,
			width: cellSize,
			height: cellSize,
		};

		if (cell.clue) {
			cellStyle.backgroundColor = getClueColor(cell.clue);
			return (
				<TouchableOpacity
					key={position}
					style={[styles.clueCell, cellStyle]}
					onPressIn={(e) => handleTouchStart(cell.clue, e)}
					onPressOut={handleTouchEnd}
				/>
			);
		} else if (cell.empty) {
			return (
				<View
					key={position}
					style={[styles.emptyCell, cellStyle]}
				/>
			);
		} else {
			// Apply green background if the guess is correct
			const isCorrectGuess =
				guesses[position] && guesses[position] === cell.letter;
			if (isCorrectGuess) {
				cellStyle.backgroundColor = "green";
			}

			return (
				<View
					key={position}
					style={[styles.letterCell, cellStyle]}>
					<TextInput
						ref={(el) => (inputRefs.current[position] = el)}
						maxLength={1}
						value={guesses[position] || ""}
						onChangeText={(text) => handleInputChange(position, text)}
						onFocus={() => handleFocus(position)}
						style={styles.input}
					/>
				</View>
			);
		}
	};

	const renderHeader = () => (
		<View style={styles.header}>
			<Button
				title="Select Level"
				onPress={() => setShowPickerModal(true)}
			/>
			{currentLevel && (
				<Text style={styles.levelTitle}>{levels[currentLevel].title}</Text>
			)}
		</View>
	);

	return (
		<View style={styles.container}>
			{showPickerModal && (
				<Modal
					transparent={true}
					animationType="slide"
					visible={showPickerModal}
					onRequestClose={() => setShowPickerModal(false)}>
					<View style={styles.pickerModal}>
						<Picker
							selectedValue={currentLevel}
							onValueChange={(value) => {
								if (value) {
									handleLevelChange(value);
								}
							}}
							style={styles.picker}>
							<Picker.Item
								label="Select Level"
								value=""
								color="#999"
							/>
							{Object.keys(levels).map((level) => (
								<Picker.Item
									key={level}
									label={`Level ${level.replace("level", "")}`}
									value={level}
								/>
							))}
						</Picker>
						<Button
							title="Close"
							onPress={() => setShowPickerModal(false)}
						/>
					</View>
				</Modal>
			)}
			<FlatList
				ListHeaderComponent={renderHeader}
				data={levels[currentLevel]?.grid || []}
				renderItem={({ item: row, index: rowIndex }) => (
					<View
						key={rowIndex}
						style={{ flexDirection: "row", width: "100%" }}>
						{row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
					</View>
				)}
				keyExtractor={(item, index) => index.toString()}
				contentContainerStyle={styles.gameContainer}
				onLayout={(event) => {
					const { width } = event.nativeEvent.layout;
					setGameContainerWidth(width);
				}}
			/>
			{showClueModal && (
				<Modal
					transparent={true}
					animationType="slide"
					visible={showClueModal}
					onRequestClose={() => setShowClueModal(false)}>
					<View style={styles.modalView}>
						<Image
							source={{ uri: currentClueUrl }}
							style={styles.modalImage}
							resizeMode="contain"
						/>
					</View>
				</Modal>
			)}
			<Button
				title="Start Over"
				onPress={clearGuesses}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "green",
		width: "100%",
	},
	header: {
		backgroundColor: "green",
		padding: 10,
		width: "100%",
	},
	gameContainer: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "pink",
	},
	pickerModal: {
		flex: 1,
		justifyContent: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
		padding: 20,
	},
	picker: {
		height: 200,
		width: "100%",
		backgroundColor: "lightgreen",
		marginBottom: 20,
		borderRadius: 10,
		padding: 10,
		borderWidth: 1,
		borderColor: "#ccc",
	},
	levelTitle: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 10,
		marginBottom: 20,
	},
	clueCell: {
		justifyContent: "center",
		alignItems: "center",
	},
	emptyCell: {
		backgroundColor: "gray",
		justifyContent: "center",
		alignItems: "center",
	},
	letterCell: {
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
	input: {
		width: "100%",
		height: "100%",
		textAlign: "center",
		fontSize: 18,
	},
	modalView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalImage: {
		width: "80%",
		height: "80%",
	},
});

export default GameBoard;
