import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import axiosInstance from '../api/axiosInstance';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('Welcome to Goal Tracker!');
    const [fadeAnim] = useState(new Animated.Value(0));
    const router = useRouter();

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post('/auth/login', {
                username,
                password,
            });

            const { token } = response.data;
            await AsyncStorage.setItem('token', token);

            console.log('Login successful:', token);
            router.push('/main');
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Login failed:', error.response.data.message);
                setMessage('Invalid username or password');
            } else {
                console.error('An unexpected error occurred:', error);
                setMessage('An unexpected error occurred');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Animated.Text style={[styles.message, { opacity: fadeAnim }]}>{message}</Animated.Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Create Account" onPress={() => router.push('./createAccount')} />
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
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    message: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default LoginScreen;
