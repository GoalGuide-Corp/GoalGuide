import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const MainScreen = () => {
    const [fadeAnim] = useState(new Animated.Value(0));
    const [showInitialMessage, setShowInitialMessage] = useState(true);

    useEffect(() => {
        // Fade in the logo and initial message
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 4000, // 4 seconds
            useNativeDriver: true,
        }).start(() => {
            // After 4 seconds, switch the message
            setShowInitialMessage(false);
        });
    }, [fadeAnim]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/GoalGuide_Logo.png')}
                style={styles.logo}
            />
            <Animated.Text style={[styles.message, { opacity: fadeAnim }]}>
                {showInitialMessage ? 'Goal Guide' : 'Welcome to the Goal Tracker App!'}
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5E1C8', // Light brown background
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    message: {
        fontSize: 24,
        color: '#333',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default MainScreen;
