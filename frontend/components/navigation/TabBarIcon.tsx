import React from 'react';
import { Ionicons } from '@expo/vector-icons';  // Assuming you're using Expo's icon library

// Define the valid icon names that can be used with Ionicons
type IoniconNames = keyof typeof Ionicons.glyphMap;

export default function TabBarIcon(props: { name: IoniconNames; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
