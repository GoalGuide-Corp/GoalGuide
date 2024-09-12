import React from 'react';
import { Ionicons } from '@expo/vector-icons';  // Assuming you're using Expo's icon library

export default function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}