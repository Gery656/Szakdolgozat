import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack screenOptions={{contentStyle:{backgroundColor:'#fffdf5'}}}>
      <Stack.Screen name="MyEvents" options={{headerShown:false}} />
      <Stack.Screen name="NewEventScreen" options={{headerShown:false}} />
      <Stack.Screen name="BluetoothDevicesScreen" options={{headerShown:false}} />
    </Stack>
  );
}
