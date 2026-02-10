import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="CameraHome" options={{title: "", headerShown:true, headerTransparent:true}} />
      <Stack.Screen name="BleHome" options={{headerShown:false}} />
      <Stack.Screen name="GeoHome" options={{headerShown:false}} />
      <Stack.Screen name="SecureStorageHome" options={{headerShown:false}} />
    </Stack>
  );
}
