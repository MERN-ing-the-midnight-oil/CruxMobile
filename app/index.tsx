import React, { useState } from 'react';
import { View } from 'react-native';
import Introduction from './components/Introduction';
import GameBoard from './components/GameBoard';

const App = () => {
    const [showIntroduction, setShowIntroduction] = useState(true);

    const handleDismissIntroduction = () => {
        setShowIntroduction(false);
    };

    return (
        <View style={{ flex: 1 }}>
            {showIntroduction && (
                <Introduction onDismiss={handleDismissIntroduction} />
            )}
            {!showIntroduction && <GameBoard />}
        </View>
    );
};

export default App;
