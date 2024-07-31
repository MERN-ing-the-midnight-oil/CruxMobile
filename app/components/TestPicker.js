import React, { useState } from "react";
import { View, Button, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";

const TestPicker = () => {
	const [selectedValue, setSelectedValue] = useState("level1");
	const [showPickerModal, setShowPickerModal] = useState(false);

	return (
		<View>
			<Button
				title="Show Picker"
				onPress={() => setShowPickerModal(true)}
			/>
			<Modal
				transparent={true}
				animationType="slide"
				visible={showPickerModal}
				onRequestClose={() => setShowPickerModal(false)}>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "rgba(0,0,0,0.5)",
					}}>
					<View
						style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
						<Picker
							selectedValue={selectedValue}
							onValueChange={(itemValue) => setSelectedValue(itemValue)}
							style={{ height: 200, width: 300 }}>
							<Picker.Item
								label="Pick Me"
								value="pickMe"
							/>
							<Picker.Item
								label="Level 1"
								value="level1"
							/>
							<Picker.Item
								label="Level 2"
								value="level2"
							/>
						</Picker>
						<Button
							title="Close"
							onPress={() => setShowPickerModal(false)}
						/>
					</View>
				</View>
			</Modal>
		</View>
	);
};

export default TestPicker;
