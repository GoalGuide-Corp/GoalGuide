import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack initialRouteName="login">
            <Stack.Screen name="login" />
            <Stack.Screen name="main" />
        </Stack>
    );
}
