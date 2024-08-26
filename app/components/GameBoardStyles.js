import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const gameBoardStyles = StyleSheet.create({
	container: {
		flex: 1, // Ensures the container takes up the full screen height
		justifyContent: "center", // Centers content vertically
		alignItems: "center", // Centers content horizontally
		padding: 0,
		margin: 0,
		backgroundColor: "#f8f9fa", // Light background color
	},
	header: {
		justifyContent: "center", // Center vertically
		alignItems: "center", // Center horizontally
		padding: 10,
		width: "100%",
	},
	levelTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginVertical: 10,
	},
	secondaryTitle: {
		fontSize: 16,
		textAlign: "center",
		color: "#777",
		marginBottom: 10,
	},
	gameContainer: {
		borderColor: "#000",
		padding: 2,
		backgroundColor: "#fff",
	},
	pickerModal: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	pickerWrapper: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 20,
		width: "80%",
		height: "60%",
		alignItems: "center",
	},
	pickerTitle: {
		fontSize: 18,
		marginBottom: 10,
	},
	pickerContainer: {
		width: "100%",
		height: "80%", // Set a fixed height to properly contain the picker options
		justifyContent: "center",
		overflow: "hidden", // Ensure options don't overflow the container
	},
	picker: {
		width: "100%",
		height: "100%", // Ensure the picker fills the container
	},
	closeButton: {
		marginTop: 20, // Add space between the picker and the button
		backgroundColor: "#007bff",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	closeButtonText: {
		color: "#fff",
		fontSize: 16,
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
		backgroundColor: "#8fd18b", // Green background for correct guesses
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
