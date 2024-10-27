import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const MainScreen = () => {
    const router = useRouter();

    const handleLogout = () => {
        // Clear token from local storage on logout
        localStorage.removeItem('token');
        router.push('/login'); // Navigate back to the Login screen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to the Goal Tracker App!</Text>
            <Button
                title="Log Out"
                onPress={handleLogout}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    welcomeText: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default MainScreen;
