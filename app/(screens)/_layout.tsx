import { Stack } from 'expo-router';
import React from 'react';

import StartSignUpSwitch from '@/components/startSignUpSwitch';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
    <Stack screenOptions={{contentStyle:{backgroundColor:'#fffdf5'}}}>
      <Stack.Screen name="MyEvents" options={{headerShown:false, animation:"slide_from_left"}} />
      <Stack.Screen name="NewEventScreen" options={{headerShown:false, animation: "slide_from_bottom"}} />
      <Stack.Screen name="BluetoothDevicesScreen" options={{headerShown:false,animation: "slide_from_bottom"}} />
      <Stack.Screen name="NewBluetoothDeviceScreen" options={{headerShown:false,animation:"slide_from_right"}} />
      <Stack.Screen name="ChosenEventScreen" options={{headerShown:false,animation:"slide_from_right"}} />
      <Stack.Screen name="NewCatalogScreen" options={{headerShown:false,animation: "slide_from_bottom"}} />
      <Stack.Screen name="ChosenCatalogScreen" options={{headerShown:false,animation:"slide_from_right"}} />
      <Stack.Screen name="OnSuccessfulCatalogCreation" options={{headerShown:false,animation:"slide_from_right"}} />

      <Stack.Screen name="SignUpOnACatalogScreen" options={{headerShown:false, animation:"slide_from_right"}} />
    </Stack>

    <StartSignUpSwitch />
    </>
  );
}
