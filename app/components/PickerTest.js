import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const PickerTest = () => {
	const [selectedValue, setSelectedValue] = useState("");

	return (
		<View style={styles.container}>
			<Picker
				selectedValue={selectedValue}
				onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
				style={styles.picker}>
				<Picker.Item
					label="Pick Me"
					value=""
				/>
				<Picker.Item
					label="Option 1"
					value="option1"
				/>
				<Picker.Item
					label="Option 2"
					value="option2"
				/>
			</Picker>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	picker: {
		height: 50,
		width: 200,
	},
});

export default PickerTest;
