import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Button, View } from 'react-native';
import GameBoard from './components/GameBoard';
import Introduction from './components/Introduction';

const App = () => {
	const [showIntroduction, setShowIntroduction] = useState(true);

	const handleDismissIntroduction = () => {
		setShowIntroduction(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			{showIntroduction ? (
				<View style={styles.introductionContainer}>
					<Introduction />
					<Button title="Got it!" onPress={handleDismissIntroduction} />
				</View>
			) : (
				<GameBoard />
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	introductionContainer: {
		marginBottom: 20,
	},
});

export default App;
