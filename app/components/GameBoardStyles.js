// app/components/GameBoardStyles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f0f0f5", // Soft neutral background color
		width: "100%",
	},
	header: {
		backgroundColor: "#f0f0f5", // Same background color for consistency
		padding: 10,
		width: "100%",
	},
	gameContainer: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f0f0f5", // Same background color for consistency
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
		backgroundColor: "#d1e0e0", // Soft complimentary color
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
		color: "#333", // Darker color for text
	},
	clueCell: {
		justifyContent: "center",
		alignItems: "center",
	},
	emptyCell: {
		backgroundColor: "#000000", // Black background for null cells
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
		fontSize: 24, // Increase font size for better visibility
		color: "#333", // Darker color for input text
	},
	correctGuessCell: {
		backgroundColor: "#00FA9A", // Lighter green for correct guesses
	},
	modalBackdrop: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
		padding: 0, // Remove padding
	},
	modalContent: {
		width: "90%",
		backgroundColor: "white",
		alignItems: "center",
		borderRadius: 10,
		overflow: "hidden", // Ensure image fits within the modal
	},
	modalImage: {
		width: "100%",
		height: undefined,
		aspectRatio: 1, // Adjust aspect ratio as needed
	},
});

export default styles;
