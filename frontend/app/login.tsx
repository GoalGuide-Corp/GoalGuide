import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import axiosInstance from '../api/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window'); // Get device width and height

const LoginScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('Goal Guide');
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
                email,
                password,
            });
            const { token } = response.data;
            await AsyncStorage.setItem('token', token);
            router.push('/main');
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/images/GoalGuide_Logo.png')} 
                style={styles.backgroundLogo} 
            />
            <Animated.View style={[styles.centerContent, { opacity: fadeAnim }]}>
                <Text style={styles.brandName}>{message}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    placeholderTextColor="#666"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#666"
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('./createAccount')}>
                    <Text style={styles.createAccountText}>Create Account</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5E1C8',
    },
    backgroundLogo: {
        position: 'absolute',
        width: width * 1.2, // Scale logo based on screen width
        height: height * 1.2, // Scale height for better fit
        resizeMode: 'contain',
        opacity: 0.08,
        top: height * 0.1, // Adjust positioning for dynamic centering
    },
    centerContent: {
        width: width * 0.8, // Responsive width
        alignItems: 'center',
    },
    brandName: {
        fontSize: width < 400 ? 28 : 32, // Adjust font size for smaller screens
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        padding: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 10,
        marginVertical: 8,
    },
    loginButton: {
        backgroundColor: '#D4A373',
        paddingVertical: 12,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    createAccountText: {
        color: '#D4A373',
        fontWeight: 'bold',
        marginTop: 15,
    },
});

export default LoginScreen;
