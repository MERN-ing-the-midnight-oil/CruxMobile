import React, { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Modal,
	Image,
	FlatList,
	Dimensions,
	Button,
} from "react-native";
import Confetti from "react-native-confetti";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import level0 from "../data/level0";
import level1 from "../data/level1";
import level2 from "../data/level2";
import { getClueColor, createCluePaths } from "../utils/clueUtils";
import { checkWordCompletion } from "../utils/checkWordCompletion";

const { width, height } = Dimensions.get("window");

const GameBoard = () => {
	const levels = { level0, level1, level2 };
	const [currentLevel, setCurrentLevel] = useState("level0");
	const [guesses, setGuesses] = useState({});
	const [showClueModal, setShowClueModal] = useState(false);
	const [currentClueUrl, setCurrentClueUrl] = useState("");
	const [showPickerModal, setShowPickerModal] = useState(false);
	const [gameContainerWidth, setGameContainerWidth] = useState(0);
	const modalRef = useRef(null);
	const inputRefs = useRef({});
	const [focusDirection, setFocusDirection] = useState("across");
	const [confettiActive, setConfettiActive] = useState(false);
	const [confettiOrigin, setConfettiOrigin] = useState({ x: 0.5, y: 0.5 });
	const [sparklingCells, setSparklingCells] = useState({});

	useEffect(() => {
		const loadGuesses = async () => {
			const savedGuesses = await AsyncStorage.getItem(
				`guesses-${currentLevel}`
			);
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

	const handleLevelChange = (value) => {
		setCurrentLevel(value);
		setGuesses({});
		inputRefs.current = {};
		setShowPickerModal(false);
	};

	const handleInputChange = (position, value) => {
		const newGuess = value.toUpperCase().slice(0, 1);
		const existingGuess = guesses[position] || "";

		setGuesses((prevGuesses) => ({
			...prevGuesses,
			[position]: newGuess,
		}));
		moveFocus(position);

		if (newGuess !== existingGuess) {
			const [rowIndex, colIndex] = position.split("-").map(Number);
			const correct =
				levels[currentLevel].grid[rowIndex][colIndex].letter === newGuess;
			if (correct) {
				const wordCompleted = checkWordCompletion(
					levels[currentLevel].grid,
					guesses,
					position
				);
				if (wordCompleted) {
					setSparklingCells((prevCells) => ({
						...prevCells,
						[position]: true,
					}));
					setTimeout(() => {
						setSparklingCells((prevCells) => {
							const updatedCells = { ...prevCells };
							delete updatedCells[position];
							return updatedCells;
						});
					}, 10000);
				}
			}
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

	const handleTouchStart = (clueUrl, e) => {
		e.stopPropagation();
		setCurrentClueUrl(clueUrl);
		setShowClueModal(true);
	};

	const handleTouchEnd = (e) => {
		e.stopPropagation();
		setShowClueModal(false);
	};

	const renderCell = (cell, rowIndex, colIndex) => {
		const position = `${rowIndex}-${colIndex}`;
		const clueUrl = cell.clue ? levels[currentLevel].clues[cell.clue] : null;
		const cellSize = gameContainerWidth / 6; // Calculate cell size dynamically based on game container width
		let cellStyle = {
			borderColor: "#ccc",
			borderWidth: 1,
			width: cellSize,
			height: cellSize,
		};

		let cellClassNames = "letter-cell";
		let inputClassNames = "";

		if (guesses[position] === cell.letter) {
			inputClassNames += " correct";
		}

		if (sparklingCells[position]) {
			cellClassNames += " sparkle";
		}

		if (cell.clue) {
			const clueColor = getClueColor(cell.clue);
			cellStyle.backgroundColor = clueColor; // Set background color instead of border color

			return (
				<TouchableOpacity
					key={position}
					style={[styles.clueCell, cellStyle]}
					onPressIn={(e) => handleTouchStart(clueUrl, e)}
					onPressOut={handleTouchEnd}
					onLongPress={(e) => e.preventDefault()}>
					<View />
				</TouchableOpacity>
			);
		} else if (cell.empty) {
			return (
				<View
					key={position}
					style={[styles.emptyCell, cellStyle]}>
					<View />
				</View>
			);
		} else {
			return (
				<View
					key={position}
					style={[styles.letterCell, cellStyle]}>
					<TextInput
						ref={(el) => (inputRefs.current[position] = el)}
						maxLength={1}
						value={guesses[position] || ""}
						onChangeText={(text) => handleInputChange(position, text)}
						style={styles.input}
					/>
				</View>
			);
		}
	};

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
							onValueChange={(itemValue) => handleLevelChange(itemValue)}
							style={styles.picker}>
							<Picker.Item
								label="Pick Me"
								value=""
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
			<Button
				title="Select Level"
				onPress={() => setShowPickerModal(true)}
			/>
			<View
				style={styles.gameContainer}
				onLayout={(event) => {
					const { width } = event.nativeEvent.layout;
					setGameContainerWidth(width);
				}}>
				{confettiActive && <Confetti />}
				<Text style={styles.levelTitle}>{levels[currentLevel].title}</Text>
				<FlatList
					data={levels[currentLevel].grid}
					renderItem={({ item: row, index: rowIndex }) => (
						<View
							key={rowIndex}
							style={{ flexDirection: "row", width: "100%" }}>
							{row.map((cell, colIndex) =>
								renderCell(cell, rowIndex, colIndex)
							)}
						</View>
					)}
					keyExtractor={(item, index) => index.toString()}
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
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "green",
		padding: 10,
		margin: 0,
		width: "100%",
	},
	gameContainer: {
		flex: 1,
		width: "100%", // Ensure it takes the full width
		justifyContent: "center",
		alignItems: "center",
		padding: 0, // Ensure no padding
		margin: 0, // Ensure no margin
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
		height: 200, // Increased height for better interaction
		width: "100%",
		backgroundColor: "lightgreen",
		marginBottom: 20,
		borderRadius: 10,
		padding: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden", // Hide overflow to contain the selection box
	},
	levelTitle: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 10, // Add margin to create space above the title
		marginBottom: 20,
	},
	clueCell: {
		backgroundColor: "lightblue",
		justifyContent: "center",
		alignItems: "center",
	},
	emptyCell: {
		backgroundColor: "gray", // Change to grey
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
