import { Tabs } from 'expo-router'; // Keeping your tab navigation system
import React from 'react';
import { Colors } from '../../constants/Colors';  // Go back to 'constants'
import { useColorScheme } from '../../hooks/useColorScheme';  // Go back to 'hooks'
import TabBarIcon from '../../components/navigation/TabBarIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint, // Customizing tab colors
        headerShown: false, // You can toggle this to show/hide header
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />, // Customize icon for Home tab
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />, // Customize icon for Profile tab
        }}
      />

      {/* Add more screens here */}
    </Tabs>
  );
}
