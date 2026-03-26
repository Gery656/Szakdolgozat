
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadingTime(x: number) {
      await setTimeout(() => {
        router.dismissTo('/login');
      }, x);
    }

    loadingTime(2000);
  });
  return (isFocused &&
    <SafeAreaView className='bg-custom-background min-w-full min-h-full '>

      <View className="m-auto rounded-lg">
        <ActivityIndicator className="m-auto scale-150" size={"large"} ></ActivityIndicator>
        <Text></Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
