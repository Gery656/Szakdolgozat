import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

import { useColorScheme } from '@/hooks/use-color-scheme';
import "../global.css";

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <Stack screenOptions={{contentStyle:{backgroundColor:'#fffdf5'}}}>
          <Stack.Screen name="(scanner)" options={{ headerShown: false }} />
          <Stack.Screen name="(screens)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </Provider>
    </ThemeProvider>
  );
}
