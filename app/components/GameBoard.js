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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import level1 from "../data/level1";
import level2 from "../data/level2";
import { getClueColor } from "../utils/getClueColor";
import { checkWordCompletion } from "../utils/checkWordCompletion";
import { createCluePaths } from "../utils/cluePathGenerator";

const { width } = Dimensions.get("window");

const GameBoard = () => {
	const levels = { level1, level2 };
	const [currentLevel, setCurrentLevel] = useState("");
	const [guesses, setGuesses] = useState({});
	const [correctAnswers, setCorrectAnswers] = useState({}); // State to track correct answers
	const [lastUpdatedPosition, setLastUpdatedPosition] = useState(null);
	const [showPickerModal, setShowPickerModal] = useState(false);
	const [showClueModal, setShowClueModal] = useState(false);
	const [currentClueUrl, setCurrentClueUrl] = useState("");
	const [gameContainerWidth, setGameContainerWidth] = useState(0);
	const [focusDirection, setFocusDirection] = useState("across");
	const [focusedPosition, setFocusedPosition] = useState(null); // Track focused position
	const inputRefs = useRef({});
	const [cluePaths, setCluePaths] = useState({});

	useEffect(() => {
		const loadGuesses = async () => {
			const savedGuesses = await AsyncStorage.getItem(
				`guesses-${currentLevel}`
			);
			console.log("Loaded Guesses:", savedGuesses);
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
		const loadCorrectAnswers = async () => {
			const savedCorrectAnswers = await AsyncStorage.getItem(
				`correctAnswers-${currentLevel}`
			);
			console.log("Loaded Correct Answers:", savedCorrectAnswers);
			if (savedCorrectAnswers) {
				setCorrectAnswers(JSON.parse(savedCorrectAnswers));
			} else {
				setCorrectAnswers({});
			}
		};
		loadCorrectAnswers();
	}, [currentLevel]);

	useEffect(() => {
		const saveCorrectAnswers = async () => {
			const savedCorrectAnswers = JSON.stringify(correctAnswers);
			await AsyncStorage.setItem(
				`correctAnswers-${currentLevel}`,
				savedCorrectAnswers
			);
		};
		saveCorrectAnswers();
	}, [correctAnswers, currentLevel]);

	useEffect(() => {
		if (currentLevel) {
			const numClues = levels[currentLevel].clues
				? Object.keys(levels[currentLevel].clues).length
				: 0;
			setCluePaths(createCluePaths(currentLevel, numClues));
		}
	}, [currentLevel]);

	useEffect(() => {
		if (lastUpdatedPosition) {
			const [rowIndex, colIndex] = lastUpdatedPosition.split("-").map(Number);
			const correct =
				levels[currentLevel].grid[rowIndex][colIndex].letter ===
				guesses[lastUpdatedPosition];
			if (correct) {
				setCorrectAnswers((prevCorrectAnswers) => ({
					...prevCorrectAnswers,
					[lastUpdatedPosition]: true,
				}));
				const wordCompleted = checkWordCompletion(
					levels[currentLevel].grid,
					guesses,
					lastUpdatedPosition
				);
				if (wordCompleted) {
					Alert.alert("Congratulations!", "You completed a word!");
					console.log("Congratulations! You completed a word!");
				}
			}
		}
	}, [guesses, lastUpdatedPosition, currentLevel]);

	const handleLevelChange = (value) => {
		setCurrentLevel(value);
		setGuesses({});
		setCorrectAnswers({});
		setLastUpdatedPosition(null);
		setShowPickerModal(false);
	};

	const handleInputChange = (position, text) => {
		if (correctAnswers[position]) {
			return; // Don't allow changes to correct answers
		}
		const newGuess = text.toUpperCase();
		if (newGuess === "") {
			// Handle backspace
			console.log(`Delete key was pushed at ${position}`);
			setGuesses((prevGuesses) => {
				const updatedGuesses = { ...prevGuesses };
				delete updatedGuesses[position];
				return updatedGuesses;
			});
			moveFocusAndDelete(position);
		} else {
			setGuesses((prevGuesses) => {
				const updatedGuesses = {
					...prevGuesses,
					[position]: newGuess.slice(-1),
				};
				console.log(`Updated guesses: ${JSON.stringify(updatedGuesses)}`);
				return updatedGuesses;
			});
			setLastUpdatedPosition(position);
			moveFocus(position, "forward");
		}
	};

	const handleKeyPress = (position, key) => {
		if (key === "Backspace") {
			console.log(`Backspace key was pushed at ${position}`);
			setGuesses((prevGuesses) => {
				const updatedGuesses = { ...prevGuesses };
				delete updatedGuesses[position];
				return updatedGuesses;
			});
			moveFocusAndDelete(position);
		}
	};

	const handleFocus = (position) => {
		console.log(`Input focused at ${position}`);
		setFocusedPosition(position);
		if (guesses[position] && !correctAnswers[position]) {
			setGuesses((prevGuesses) => ({
				...prevGuesses,
				[position]: "",
			}));
		}
	};

	const handleBlur = (position) => {
		console.log(`Input blur at ${position}`);
		setFocusedPosition(null);
	};

	const moveFocusAndDelete = (currentPosition) => {
		let [row, col] = currentPosition.split("-").map(Number);

		const deleteCharacter = (pos) => {
			setGuesses((prevGuesses) => {
				const updatedGuesses = { ...prevGuesses };
				delete updatedGuesses[pos];
				return updatedGuesses;
			});
		};

		const moveFocus = (newPosition) => {
			if (isPositionValid(newPosition) && inputRefs.current[newPosition]) {
				console.log(`Focusing on position ${newPosition}`);
				inputRefs.current[newPosition].focus();
				return newPosition;
			}
			return null;
		};

		const directions =
			focusDirection === "across" ? ["left", "up"] : ["up", "left"];
		for (let direction of directions) {
			let nextPosition =
				direction === "left" ? `${row}-${col - 1}` : `${row - 1}-${col}`;
			while (isPositionValid(nextPosition)) {
				const [nextRow, nextCol] = nextPosition.split("-").map(Number);
				if (!correctAnswers[nextPosition] && guesses[nextPosition]) {
					deleteCharacter(nextPosition);
					const newPos = moveFocus(nextPosition);
					if (newPos) {
						row = nextRow;
						col = nextCol;
					} else {
						break;
					}
				} else {
					break;
				}
				nextPosition =
					direction === "left" ? `${row}-${col - 1}` : `${row - 1}-${col}`;
			}
		}
	};

	const moveFocus = (currentPosition, direction = "forward") => {
		const [row, col] = currentPosition.split("-").map(Number);
		let nextPosition = getNextPosition(row, col, focusDirection, direction);

		console.log(
			`Trying to move focus ${direction} from ${currentPosition} to ${nextPosition}`
		);

		while (isPositionValid(nextPosition) && correctAnswers[nextPosition]) {
			// Skip positions that are already correct answers
			const [nextRow, nextCol] = nextPosition.split("-").map(Number);
			if (focusDirection === "across") {
				nextPosition =
					direction === "forward"
						? `${nextRow}-${nextCol + 1}`
						: `${nextRow}-${nextCol - 1}`;
			} else {
				nextPosition =
					direction === "forward"
						? `${nextRow + 1}-${nextCol}`
						: `${nextRow - 1}-${nextCol}`;
			}
			console.log(`Skipping correct answer, next position: ${nextPosition}`);
		}

		if (isPositionValid(nextPosition) && inputRefs.current[nextPosition]) {
			console.log(`Focusing on position ${nextPosition}`);
			inputRefs.current[nextPosition].focus();
		} else {
			// If no valid next position, try changing direction
			const newDirection = focusDirection === "across" ? "down" : "across";
			nextPosition = getNextPosition(row, col, newDirection, direction);

			while (isPositionValid(nextPosition) && correctAnswers[nextPosition]) {
				// Skip positions that are already correct answers
				const [nextRow, nextCol] = nextPosition.split("-").map(Number);
				if (newDirection === "across") {
					nextPosition =
						direction === "forward"
							? `${nextRow}-${nextCol + 1}`
							: `${nextRow}-${nextCol - 1}`;
				} else {
					nextPosition =
						direction === "forward"
							? `${nextRow + 1}-${nextCol}`
							: `${nextRow - 1}-${nextCol}`;
				}
				console.log(`Skipping correct answer, next position: ${nextPosition}`);
			}

			if (isPositionValid(nextPosition) && inputRefs.current[nextPosition]) {
				console.log(`Focusing on position ${nextPosition}`);
				inputRefs.current[nextPosition].focus();
				setFocusDirection(newDirection); // Change direction
			}
		}
	};

	const getNextPosition = (row, col, direction, moveDirection) => {
		if (direction === "across") {
			return moveDirection === "forward"
				? `${row}-${col + 1}`
				: `${row}-${col - 1}`;
		} else {
			return moveDirection === "forward"
				? `${row + 1}-${col}`
				: `${row - 1}-${col}`;
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
		console.log("Clue URL:", cluePaths[clueKey]);
	};

	const handleTouchEnd = (e) => {
		e.stopPropagation();
		setShowClueModal(false);
	};

	const clearStorageForLevel = async (level) => {
		try {
			await AsyncStorage.removeItem(`guesses-${level}`);
			await AsyncStorage.removeItem(`correctAnswers-${level}`);
			console.log(`AsyncStorage cleared for level ${level}`);
		} catch (e) {
			console.error("Failed to clear AsyncStorage", e);
		}
	};

	const clearGuesses = async () => {
		await clearStorageForLevel(currentLevel);
		setGuesses({});
		setCorrectAnswers({});
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
						onChangeText={(text) => {
							console.log(`Character entered at ${position}: ${text}`);
							handleInputChange(position, text);
						}}
						onKeyPress={({ nativeEvent: { key } }) =>
							handleKeyPress(position, key)
						}
						onFocus={() => handleFocus(position)}
						onBlur={() => handleBlur(position)}
						style={styles.input}
						autoCapitalize="characters" // Keep autoCapitalize as needed
						autoCorrect={false} // Disable autocorrect
						keyboardType="default" // Ensure default keyboard type
						editable={!correctAnswers[position]} // Disable editing for correct answers
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
		alignItems: "center",
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
