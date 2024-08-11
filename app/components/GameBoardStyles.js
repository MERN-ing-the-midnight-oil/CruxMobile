import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const gameBoardStyles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		padding: 0,
		margin: 0,
		backgroundColor: "#f8f9fa", // Light background color
	},
	header: {
		padding: 10,
		width: "100%",
		alignItems: "center",
	},
	levelTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginVertical: 10,
	},
	gameContainer: {
		alignItems: "center",
		padding: 10,
		backgroundColor: "#ffffff", // Background color for game container
	},
	pickerModal: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	picker: {
		width: 200,
		backgroundColor: "#fff",
		borderRadius: 10,
	},
	footer: {
		marginVertical: 20,
		width: "100%",
	},
	hidden: {
		display: "none",
	},
	clueCell: {
		justifyContent: "center",
		alignItems: "center",
	},
	emptyCell: {
		backgroundColor: "#4F4F4F", // Grey background for empty cells
	},
	letterCell: {
		justifyContent: "center",
		alignItems: "center",
	},
	correctGuessCell: {
		backgroundColor: "#d4edda", // Green background for correct guesses
	},
	input: {
		width: "100%",
		height: "100%",
		fontSize: width * 0.08,
		fontWeight: "bold",
		textAlign: "center",
		textTransform: "uppercase",
	},
	modalBackdrop: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalContent: {
		width: "80%",
		height: "80%",
		backgroundColor: "#fff",
		borderRadius: 10,
		borderWidth: 5,
	},
	modalImage: {
		width: "100%",
		height: "100%",
	},
});

export default gameBoardStyles;
