import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	Modal,
	TouchableOpacity,
} from "react-native";
import { imagePaths } from "../utils/imagePaths";

const { width } = Dimensions.get("window");

const Introduction = ({ onDismiss }) => {
	const [modalVisible, setModalVisible] = useState(true);

	const closeModal = () => {
		setModalVisible(false);
		onDismiss(); // Call the passed-in onDismiss function
	};

	useEffect(() => {
		return () => {
			// Clean up to prevent any leftover listeners or effects
			setModalVisible(false);
		};
	}, []);

	return (
		<Modal
			visible={modalVisible}
			animationType="slide"
			transparent={true}
			onRequestClose={closeModal}>
			<View style={styles.modalContainer}>
				<View style={styles.container}>
					<Image
						source={{ uri: imagePaths.cruxIcon }}
						style={styles.image}
					/>
					<Text style={styles.title}>Welcome to Crux!</Text>
					<Text style={styles.text}>
						Tap on the colorful cells to see the clue images for the adjacent
						unknown words. Each clue contains imagery related to any and all
						adjacent words. By finding commonalities between the clues that
						touch any given word, you can guess the word. Type your letter
						guesses into the white squares. Correct guesses will turn the
						squares green. Good luck!
					</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={closeModal}>
						<Text style={styles.buttonText}>Got It</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	container: {
		padding: 20,
		backgroundColor: "#f8f9fa",
		borderRadius: 10,
		margin: 10,
		alignItems: "center",
	},
	image: {
		width: 100,
		height: 100,
		alignSelf: "center",
		marginBottom: 10,
	},
	title: {
		fontSize: width * 0.08,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
		color: "#333",
	},
	text: {
		fontSize: width * 0.07,
		lineHeight: width * 0.07,
		color: "#555",
		textAlign: "center",
		marginBottom: 20,
	},
	button: {
		backgroundColor: "#007bff",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: width * 0.05,
	},
});

export default Introduction;
