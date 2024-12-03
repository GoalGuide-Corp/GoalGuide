import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack initialRouteName="IntroScreen">
            <Stack.Screen name="IntroScreen" />
            <Stack.Screen name="login" />
            <Stack.Screen name="createAccount" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="main" />
        </Stack>
    );
}
