import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const IntroScreen = () => {
    const [logoFadeAnim] = useState(new Animated.Value(0));
    const [messageFadeAnim] = useState(new Animated.Value(0));
    const [showInitialMessage, setShowInitialMessage] = useState(true);
    const router = useRouter();

    useEffect(() => {
        Animated.timing(logoFadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                setShowInitialMessage(false);

                Animated.timing(messageFadeAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }).start(() => {
                    setTimeout(async () => {
                        router.push('/login'); // Always navigate to login first
                    }, 4000);
                });
            }, 4000);
        });
    }, [logoFadeAnim, messageFadeAnim, router]);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/GoalGuide_Logo.png')} style={styles.logo} />
            {showInitialMessage ? (
                <Animated.Text style={[styles.goalGuideText, { opacity: logoFadeAnim }]}>
                    Goal Guide
                </Animated.Text>
            ) : (
                <Animated.Text style={[styles.pathMessageText, { opacity: messageFadeAnim }]}>
                    Your path, one step at a time
                </Animated.Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5E1C8' },
    logo: { width: 150, height: 150, marginBottom: 20 },
    goalGuideText: { fontSize: 24, color: '#333', textAlign: 'center', marginTop: 10, position: 'absolute', top: '60%' },
    pathMessageText: { fontSize: 24, color: '#333', textAlign: 'center', marginTop: 10, position: 'absolute', top: '60%' },
});

export default IntroScreen;
