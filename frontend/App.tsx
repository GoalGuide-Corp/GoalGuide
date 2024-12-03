import { NavigationContainer } from "@react-navigation/native";
import RootLayout from "./app/_layout"; // Adjusted path to match the file location

export default function App() {
    return (
        <NavigationContainer>
            <RootLayout />
        </NavigationContainer>
    );
}
