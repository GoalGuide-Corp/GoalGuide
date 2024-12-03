import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';
import { Picker } from '@react-native-picker/picker'; // Updated Picker import

const Onboarding = () => {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [routineSatisfaction, setRoutineSatisfaction] = useState('');
    const [supportAreas, setSupportAreas] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleOnboardingSubmit = async () => {
        if (!age || !gender || !routineSatisfaction || !supportAreas) {
            Alert.alert("Validation Error", "Please complete all fields before submitting.");
            return;
        }

        const onboardingData = {
            age: parseInt(age, 10),
            gender,
            routineSatisfaction: parseInt(routineSatisfaction, 10),
            supportAreas: supportAreas.split(',').map((area) => area.trim()),
        };

        try {
            // Post onboarding data to the backend
            await axiosInstance.post('/onboarding', onboardingData);

            // Mark onboarding as complete in AsyncStorage
            await AsyncStorage.setItem('isNewUser', 'false');

            // Navigate to the Main screen
            router.push('/main');
        } catch (error) {
            // Check if error is an AxiosError
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.message || 'An error occurred during onboarding.');
            } else {
                setMessage('An unknown error occurred during onboarding.');
            }

            console.error('Onboarding error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Onboarding Questions</Text>

            {/* Age Dropdown */}
            <Text style={styles.label}>How old are you?</Text>
            <Picker
                selectedValue={age}
                style={styles.picker}
                onValueChange={(itemValue: string) => setAge(itemValue)}
            >
                <Picker.Item label="Select Age" value="" />
                {Array.from({ length: 100 }, (_, i) => i + 1).map((age) => (
                    <Picker.Item key={age} label={age.toString()} value={age.toString()} />
                ))}
            </Picker>

            {/* Gender Dropdown */}
            <Text style={styles.label}>What's your gender?</Text>
            <Picker
                selectedValue={gender}
                style={styles.picker}
                onValueChange={(itemValue: string) => setGender(itemValue)}
            >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Non-binary" value="Non-binary" />
                <Picker.Item label="Prefer not to answer" value="Prefer not to answer" />
            </Picker>

            {/* Routine Satisfaction Dropdown */}
            <Text style={styles.label}>How happy are you with your routine? (1-10)</Text>
            <Picker
                selectedValue={routineSatisfaction}
                style={styles.picker}
                onValueChange={(itemValue: string) => setRoutineSatisfaction(itemValue)}
            >
                <Picker.Item label="Select Routine Satisfaction" value="" />
                {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                    <Picker.Item key={value} label={value.toString()} value={value.toString()} />
                ))}
            </Picker>

            {/* Support Areas Dropdown */}
            <Text style={styles.label}>Areas for support (e.g., fitness, productivity)</Text>
            <Picker
                selectedValue={supportAreas}
                style={styles.picker}
                onValueChange={(itemValue: string) => setSupportAreas(itemValue)}
            >
                <Picker.Item label="Select Support Areas" value="" />
                <Picker.Item label="Fitness" value="Fitness" />
                <Picker.Item label="Productivity" value="Productivity" />
                <Picker.Item label="Diet" value="Diet" />
                <Picker.Item label="Stress Management" value="Stress Management" />
            </Picker>

            {/* Display error or success message */}
            {message ? <Text style={styles.message}>{message}</Text> : null}

            <Button title="Submit" onPress={handleOnboardingSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F5E1C8', // Matching background color for consistency
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
    picker: {
        width: '100%',
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff', // Better contrast for dropdown
    },
    message: {
        fontSize: 16,
        color: 'red',
        marginBottom: 20,
    },
});

export default Onboarding;
