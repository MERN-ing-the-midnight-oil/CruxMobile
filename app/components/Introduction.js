import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { imagePaths } from "../utils/imagePaths";

const { width } = Dimensions.get("window");

const Introduction = () => {
	return (
		<View style={styles.container}>
			<Image
				source={{ uri: imagePaths.cruxIcon }} // Use the image path
				style={styles.image}
			/>
			<Text style={styles.title}>Welcome to Crux!</Text>
			<Text style={styles.text}>
				Tap on the colorful cells to see the clue images for the adjacent
				unknown words. Each clue contains imagry related to any and all adjacent
				words. By finding commonalities between the clues that touch any given
				word, you can guess the word. Type your letter guesses into the white
				squares. Correct guesses will turn the squares green. Good luck!
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
	image: {
		width: 100,
		height: 100,
		alignSelf: "center",
		marginBottom: 10,
	},
	title: {
		fontSize: width * 0.08, // Responsive font size
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
		color: "#333", // Dark text color
	},
	text: {
		fontSize: width * 0.07, // Responsive font size
		lineHeight: width * 0.07, // Line height for better readability
		color: "#555", // Medium-dark text color for better readability
	},
	link: {
		color: "#007bff", // Bootstrap primary blue color
		textDecorationLine: "underline",
		lineHeight: width * 0.07, // Line height for better readability
	},
});

export default Introduction;
