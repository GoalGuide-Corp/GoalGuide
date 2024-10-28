// frontend/app/createAccount.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import axiosInstance from '../api/axiosInstance';

const CreateAccount = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            const response = await axiosInstance.post('/auth/register', {
                username,
                password,
            });

            setMessage('Account created successfully! Redirecting...');
            setTimeout(() => router.push('/login'), 2000); // Redirect to login after 2 seconds
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'An error occurred during registration');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
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
            {message ? <Text style={styles.message}>{message}</Text> : null}
            <Button title="Create Account" onPress={handleRegister} />
            <Button title="Back to Login" onPress={() => router.push('/login')} />
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
    title: {
        fontSize: 24,
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
    message: {
        fontSize: 16,
        color: 'green',
        marginBottom: 20,
    },
});

export default CreateAccount;
