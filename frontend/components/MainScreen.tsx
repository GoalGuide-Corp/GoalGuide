// frontend/components/MainScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from './navigation/StackNavigator'; // Updated path

type MainScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Main'>;

type Props = {
    navigation: MainScreenNavigationProp;
};

const MainScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to the Goal Tracker App!</Text>
            <Button
                title="Log Out"
                onPress={() => navigation.navigate('Login')}
            />
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
    welcomeText: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default MainScreen;
