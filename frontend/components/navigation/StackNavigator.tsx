// navigation/StackNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../LoginScreen';
import MainScreen from '../MainScreen';

// Define the type for navigation parameters
export type StackParamList = {
    Login: undefined;
    Main: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Navigator>
    );
}

export default AppNavigator;