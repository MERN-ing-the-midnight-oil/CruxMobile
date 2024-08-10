import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import from the correct package

const PickerTest = () => {
	const [selectedValue, setSelectedValue] = useState("level0");
	const levels = {
		level0: "Level 0",
		level1: "Level 1",
		level2: "Level 2",
	};

	return (
		<View style={styles.container}>
			<Picker
				selectedValue={selectedValue}
				onValueChange={(itemValue) => setSelectedValue(itemValue)}
				style={styles.picker}>
				<Picker.Item
					label="Pick Me"
					value=""
				/>
				{Object.keys(levels).map((level) => (
					<Picker.Item
						key={level}
						label={levels[level]}
						value={level}
					/>
				))}
			</Picker>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "lightgray",
	},
	picker: {
		height: 200,
		width: 300,
		backgroundColor: "lightgreen",
	},
	pickerItem: {
		color: "black",
	},
});

export default PickerTest;
