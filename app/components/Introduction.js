import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Linking,
	TouchableOpacity,
	Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const Introduction = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Crux</Text>
			<Text style={styles.text}>
				Welcome to Crux! Tap on the colorful tile shapes to see clues pertaining
				to the crossword words they sit next to. Each clue contains imagery
				related to any and all adjacent words. By finding commonalities between
				the image clues touching one word, you can guess the word. Type your
				guesses into the blank squares. Correct letters will turn green. Good
				luck!
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: "#f8f9fa", // Light background color
		borderRadius: 10,
		margin: 10,
	},
	title: {
		fontSize: width * 0.08, // Responsive font size
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
		color: "#333", // Dark text color
	},
	text: {
		fontSize: width * 0.05, // Responsive font size
		lineHeight: width * 0.07, // Line height for better readability
		color: "#555", // Medium-dark text color for better readability
	},
	link: {
		color: "#007bff", // Bootstrap primary blue color
		textDecorationLine: "underline",
	},
});

export default Introduction;
