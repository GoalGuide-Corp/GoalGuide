// frontend/app/Main.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MainScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Goal Guide!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5E1C8' },
    text: { fontSize: 24, color: '#333' },
});

export default MainScreen;
