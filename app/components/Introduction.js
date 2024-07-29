import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Linking,
	TouchableOpacity,
} from "react-native";

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
				. Click on the colored areas to see picture clues that somehow pertain
				to all adjacent words. Type your solutions into the white squares.
				Correct letters will turn the grid square from white to green. Good
				luck!
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
	},
	text: {
		fontSize: 16,
	},
	link: {
		color: "blue",
		textDecorationLine: "underline",
	},
});

export default Introduction;
