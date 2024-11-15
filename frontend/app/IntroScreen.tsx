// frontend/app/Intro.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const IntroScreen = () => {
    const [fadeAnim] = useState(new Animated.Value(0));
    const [secondFadeAnim] = useState(new Animated.Value(0));
    const [showInitialMessage, setShowInitialMessage] = useState(true);
    const router = useRouter();

    useEffect(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 3000, useNativeDriver: true }).start(() => {
            setShowInitialMessage(false);

            Animated.timing(secondFadeAnim, { toValue: 1, duration: 3000, useNativeDriver: true }).start(async () => {
                const isNewUser = await AsyncStorage.getItem('isNewUser');
                if (isNewUser === 'true') {
                    router.push('/onboarding');  // Changed to '/onboarding'
                } else {
                    router.push('/login');  // Changed to '/login'
                }
            });
        });
    }, [fadeAnim, secondFadeAnim, router]);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/GoalGuide_Logo.png')} style={styles.logo} />
            {showInitialMessage ? (
                <Animated.Text style={[styles.message, { opacity: fadeAnim }]}>Goal Guide</Animated.Text>
            ) : (
                <Animated.Text style={[styles.message, { opacity: secondFadeAnim }]}>Your path, one step at a time</Animated.Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5E1C8' },
    logo: { width: 150, height: 150, marginBottom: 20 },
    message: { fontSize: 24, color: '#333', textAlign: 'center', marginTop: 20 }  // Added 'message' style
});

export default IntroScreen;
