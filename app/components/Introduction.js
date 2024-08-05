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
				Welcome to Crux! The crossword game with a dash of{" "}
				<TouchableOpacity
					onPress={() =>
						Linking.openURL("https://boardgamegeek.com/boardgame/39856/dixit")
					}>
					<Text style={styles.link}>Dixit</Text>
				</TouchableOpacity>{" "}
				and a sprinkle of{" "}
				<TouchableOpacity
					onPress={() =>
						Linking.openURL(
							"https://boardgamegeek.com/boardgame/181304/mysterium"
						)
					}>
					<Text style={styles.link}>Mysterium</Text>
				</TouchableOpacity>
				. Tap on the colorful regions of the crossword to see visual clues. Each
				visual clue contains a hint for any word that is touching that region.
				So a colorful region that borders three different words will show an
				image that has hints about the three words. Type your guesses into the
				blank squares. Correct letters will turn green. Good luck!
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
