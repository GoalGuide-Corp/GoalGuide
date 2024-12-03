import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../api/axiosInstance';

type Goal = {
    _id: string;
    title: string;
    type: string;
    deadline: string;
    frequency: string;
    notes?: string;
    streak: number;
};

const MainScreen = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [newGoal, setNewGoal] = useState({
        title: '',
        type: 'Achievement',
        deadline: '',
        frequency: 'Daily',
        notes: '',
    });

    useEffect(() => {
        const fetchUserIdAndGoals = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');

                if (!storedUserId) {
                    console.error('User ID is missing from AsyncStorage');
                    return;
                }

                setUserId(storedUserId);

                const response = await axiosInstance.get(`/goals/${storedUserId}`);
                setGoals(response.data);
            } catch (error) {
                console.error('Error fetching user ID or goals:', error);
            }
        };

        fetchUserIdAndGoals();
    }, []);

    const handleAddGoal = async () => {
        if (!userId) {
            console.error('User ID is missing');
            return;
        }

        try {
            const response = await axiosInstance.post('/goals/add', {
                ...newGoal,
                userId,
            });

            setGoals((prevGoals) => [...prevGoals, response.data]);

            setNewGoal({
                title: '',
                type: 'Achievement',
                deadline: '',
                frequency: 'Daily',
                notes: '',
            });
        } catch (error) {
            console.error('Error adding goal:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Goal Dashboard</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Goal Title"
                    value={newGoal.title}
                    onChangeText={(text) => setNewGoal((prev) => ({ ...prev, title: text }))}
                />
                <Picker
                    selectedValue={newGoal.type}
                    onValueChange={(itemValue) =>
                        setNewGoal((prev) => ({ ...prev, type: itemValue }))
                    }
                    style={styles.input}
                >
                    <Picker.Item label="Achievement" value="Achievement" />
                    <Picker.Item label="Habit" value="Habit" />
                    <Picker.Item label="Wellness" value="Wellness" />
                    <Picker.Item label="Career" value="Career" />
                    <Picker.Item label="Education" value="Education" />
                </Picker>
                <TextInput
                    style={styles.input}
                    placeholder="Deadline (e.g., 2024-12-31)"
                    value={newGoal.deadline}
                    onChangeText={(text) => setNewGoal((prev) => ({ ...prev, deadline: text }))}
                />
                <Picker
                    selectedValue={newGoal.frequency}
                    onValueChange={(itemValue) =>
                        setNewGoal((prev) => ({ ...prev, frequency: itemValue }))
                    }
                    style={styles.input}
                >
                    <Picker.Item label="Daily" value="Daily" />
                    <Picker.Item label="Weekly" value="Weekly" />
                    <Picker.Item label="Monthly" value="Monthly" />
                    <Picker.Item label="Yearly" value="Yearly" />
                </Picker>
                <TextInput
                    style={styles.input}
                    placeholder="Additional notes (optional)"
                    value={newGoal.notes}
                    onChangeText={(text) => setNewGoal((prev) => ({ ...prev, notes: text }))}
                />
            </View>
            <Button title="Add Goal" onPress={handleAddGoal} color="#4CAF50" />
            <Text style={styles.subtitle}>Your Goals:</Text>
            {goals.length > 0 ? (
                <FlatList
                    data={goals}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.goalItem}>
                            <Text>Title: {item.title}</Text>
                            <Text>Type: {item.type}</Text>
                            <Text>Deadline: {new Date(item.deadline).toLocaleDateString()}</Text>
                            <Text>Frequency: {item.frequency}</Text>
                            <Text>Notes: {item.notes || 'None'}</Text>
                            <Text>Streak: {item.streak} days</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noGoalsText}>No goals yet. Start by adding one!</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#F7F4EF' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
    inputContainer: { marginBottom: 20 },
    input: { width: '100%', padding: 12, marginVertical: 8, borderWidth: 1, borderRadius: 8, backgroundColor: '#fff' },
    subtitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#333' },
    goalItem: { padding: 15, backgroundColor: '#E8F5E9', borderRadius: 8, marginVertical: 8 },
    noGoalsText: { textAlign: 'center', fontSize: 16, color: '#666' },
});

export default MainScreen;
