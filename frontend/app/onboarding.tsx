import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import axiosInstance from '../api/axiosInstance';

const OnboardingScreen = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({
        age: '',
        gender: '',
        routineSatisfaction: '',
        supportAreas: [] as string[],
    });
    const router = useRouter();
    
    const questions = [
        "How old are you?",
        "What's your gender?",
        "How happy are you with your current routine?",
        "What areas would you like support with?"
    ];

    const handleNext = async () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            try {
                await axiosInstance.post('/onboarding', answers);
                await AsyncStorage.setItem('isNewUser', 'false');
                router.push('/main');
            } catch (error) {
                console.error('Error submitting onboarding data:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{questions[currentStep]}</Text>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>{currentStep < questions.length - 1 ? 'Next' : 'Finish'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#F5E1C8' },
    question: { fontSize: 18, marginBottom: 20 },
    button: { padding: 10, backgroundColor: '#D4A373', borderRadius: 5 },
    buttonText: { color: '#fff' },
});

export default OnboardingScreen;
