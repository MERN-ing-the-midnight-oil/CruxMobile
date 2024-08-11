import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: "#fff",
	},
	header: {
		marginBottom: 10,
	},
	levelTitle: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 10,
	},
	gameContainer: {
		flexDirection: "column",
		alignItems: "center",
	},
	clueCell: {
		borderColor: "#333",
		borderWidth: 1,
	},
	letterCell: {
		borderColor: "#ccc",
		borderWidth: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	emptyCell: {
		backgroundColor: "#f0f0f0",
	},
	correctGuessCell: {
		backgroundColor: "#90ee90", // Light green
	},
	input: {
		fontSize: 24,
		textAlign: "center",
		width: "100%",
		height: "100%",
		color: "#333",
	},
	pickerModal: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	picker: {
		width: width * 0.8,
		backgroundColor: "#fff",
		borderRadius: 10,
	},
	modalBackdrop: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		width: width * 0.8,
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 10,
	},
	modalImage: {
		width: "100%",
		height: width * 0.8,
	},
	footer: {
		marginTop: 10,
	},
	hidden: {
		display: "none",
	},
});
