import { Stack } from 'expo-router';
import React from 'react';

import RegisterLoginSwitch from '@/components/registerLoginSwitch';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
    <Stack
    screenOptions={{contentStyle:{backgroundColor:'#fffdf5'}}}>
      <Stack.Screen
        name="index"
        options={{headerShown:false, animation:"slide_from_left"}}
      />
      <Stack.Screen
        name="login"
        options={{headerShown:false, animation:"slide_from_right"}}
      />
        <Stack.Screen
          name="camera"
          options={{headerShown:false}}
        />
    </Stack>
    <RegisterLoginSwitch></RegisterLoginSwitch>
    </>
  );
}
