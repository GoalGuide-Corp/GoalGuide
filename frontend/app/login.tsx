// frontend/app/login.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import axiosInstance from '../api/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fadeAnim] = useState(new Animated.Value(0));
    const router = useRouter();

    useEffect(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 2000, useNativeDriver: true }).start();
    }, []);

    const handleLogin = async () => {
        console.log('Starting login process');
        console.log('Email:', email);
        console.log('Password:', password);

        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            console.log('Login response:', response.data);

            if (response.data && response.data.token) {
                console.log('Token received:', response.data.token);

                await AsyncStorage.setItem('token', response.data.token);
                await AsyncStorage.setItem('isNewUser', 'false');

                console.log('Token and onboarding status saved to AsyncStorage');
                router.push('/main');
            } else {
                console.error('Token not found in the response data');
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An error occurred';
            console.error('Login error:', errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/GoalGuide_Logo.png')} style={styles.backgroundLogo} />
            <Animated.View style={[styles.centerContent, { opacity: fadeAnim }]}>
                <Text style={styles.brandName}>Goal Guide</Text>
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
                <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/onboarding')}>
                    <Text style={styles.createAccountText}>Create Account</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5E1C8' },
    backgroundLogo: { position: 'absolute', width: width * 1.2, height: height * 1.2, opacity: 0.08, top: height * 0.1 },
    centerContent: { width: width * 0.8, alignItems: 'center' },
    brandName: { fontSize: 32, fontWeight: 'bold', color: '#333', marginBottom: 30 },
    input: { width: '100%', padding: 12, backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 10, marginVertical: 8 },
    loginButton: { backgroundColor: '#D4A373', paddingVertical: 12, borderRadius: 10, width: '100%', alignItems: 'center', marginTop: 15 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    createAccountText: { color: '#D4A373', fontWeight: 'bold', marginTop: 15 },
});

export default LoginScreen;
