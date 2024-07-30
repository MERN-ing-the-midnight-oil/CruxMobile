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
		width: '100%', // Ensure it takes the full width
		justifyContent: 'center',
		alignItems: 'center',
		padding: 0,
		margin: 0,
		backgroundColor: 'red', // For debugging
	},
	introductionContainer: {
		marginBottom: 20,
		width: '100%', // Ensure it takes the full width
	},
});

export default App;
