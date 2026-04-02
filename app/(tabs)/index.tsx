
import { apiURL, getValueFor, reset, save, setEvents, setToken, setUser } from '@/redux/applicationSlice';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';


export default function HomeScreen() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    async function loading() {
      dispatch(reset())
      const response = await fetch(apiURL + "/resources", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer " + await getValueFor("token")
        }
      });
      const recievedData = await response.json();
      if (!response.ok) {
        await save("token","");
        router.dismissTo('/login')
      }
      else{
      dispatch(setToken(await getValueFor("token")));
      dispatch(setUser(recievedData.user));
      dispatch(setEvents(recievedData.events));
      router.dismissTo('/MyEvents');
      }
    }

    loading();
  },[]);

  return (isFocused &&
    <SafeAreaView className='bg-custom-background min-w-full min-h-full '>

      <View className="m-auto rounded-lg">
        <ActivityIndicator className="m-auto scale-150" size={"large"} ></ActivityIndicator>
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
