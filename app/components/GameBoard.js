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
	TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import cliches from "../data/cliches";
import colorsandshapes from "../data/colorsandshapes";
//import tutorial from "../data/tutorial"; // Import the tutorial level
import easylevel from "../data/easylevel"; // Correct case-sensitive file name
import { imagePaths } from "../utils/imagePaths"; // Import the image paths
import {
	checkWordCompletion,
	moveFocus,
	moveFocusAndDelete,
	getNextPosition,
	isPositionValid,
} from "../utils/gameplayUtils";
import {
	getClueCellStyle,
	getClueColor,
	createCluePaths,
} from "../utils/clueUtils";
import styles from "./GameBoardStyles"; // Ensure correct import path

const { width, height } = Dimensions.get("window");

const GameBoard = () => {
	const levels = { easylevel, colorsandshapes, cliches }; // Add tutorial level here
	const [currentLevel, setCurrentLevel] = useState("");
	const [guesses, setGuesses] = useState({});
	const [correctAnswers, setCorrectAnswers] = useState({}); // State to track correct answers
	const [lastUpdatedPosition, setLastUpdatedPosition] = useState(null);
	const [showPickerModal, setShowPickerModal] = useState(false);
	const [showClueModal, setShowClueModal] = useState(false);
	const [currentClueUrl, setCurrentClueUrl] = useState("");
	const [currentClueKey, setCurrentClueKey] = useState(""); // Add state for the current clue key
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
					// Alert.alert("Congratulations!", "You completed a word!");
					console.log("Congratulations! You completed a word!"); // Optionally keep this log for debugging
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
			moveFocusAndDelete(
				position,
				focusDirection,
				inputRefs,
				correctAnswers,
				guesses,
				setGuesses,
				levels,
				currentLevel
			);
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
			moveFocus(
				position,
				"forward",
				focusDirection,
				inputRefs,
				correctAnswers,
				levels,
				currentLevel,
				setFocusDirection
			);
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
			moveFocusAndDelete(
				position,
				focusDirection,
				inputRefs,
				correctAnswers,
				guesses,
				setGuesses,
				levels,
				currentLevel
			);
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

	const handleTouchStart = (clueKey, e) => {
		e.stopPropagation();
		setCurrentClueKey(clueKey); // Store the current clue key
		setCurrentClueUrl(cluePaths[clueKey]);
		setShowClueModal(true);
		console.log("Clue URL:", cluePaths[clueKey]);
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
			cellStyle = {
				...cellStyle,
				...getClueCellStyle(levels[currentLevel].grid, rowIndex, colIndex),
			};
			return (
				<TouchableOpacity
					key={position}
					style={[styles.clueCell, cellStyle]}
					onPressIn={(e) => handleTouchStart(cell.clue, e)}
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
				cellStyle = { ...cellStyle, ...styles.correctGuessCell };
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
				<>
					<Text style={styles.levelTitle}>{levels[currentLevel].title}</Text>
					{levels[currentLevel].secondaryTitle && (
						<Text style={styles.secondaryTitle}>
							{levels[currentLevel].secondaryTitle}
						</Text>
					)}
				</>
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
								label="Select Puzzle"
								value=""
								color="#999"
							/>
							{Object.keys(levels).map((level) => (
								<Picker.Item
									key={level}
									label={levels[level].title} // Display the level title
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

			<KeyboardAwareFlatList
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
				ListFooterComponent={() => (
					<View style={[styles.footer, !currentLevel && styles.hidden]}>
						<Button
							title="Erase All and Start Over"
							onPress={clearGuesses}
						/>
					</View>
				)}
			/>
			{showClueModal && (
				<Modal
					transparent={true}
					animationType="fade"
					visible={showClueModal}
					onRequestClose={() => setShowClueModal(false)}>
					<TouchableWithoutFeedback onPress={() => setShowClueModal(false)}>
						<View style={styles.modalBackdrop}>
							<View
								style={[
									styles.modalContent,
									{ borderColor: getClueColor(currentClueKey) }, // Apply the clue color to the modal border
								]}>
								<Image
									source={{ uri: currentClueUrl }}
									style={styles.modalImage}
									resizeMode="contain"
								/>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			)}
		</View>
	);
};

export default GameBoard;
