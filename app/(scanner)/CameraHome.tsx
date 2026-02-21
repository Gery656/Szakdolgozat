import { useIsFocused } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function CameraHome() {

  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  useEffect(() => {
    async function requestTheNeededPermissions() {
      await requestPermission();
    }

    if (!isPermissionGranted) {
      requestTheNeededPermissions();
    }
  },[]);


  const QRlock = useRef(false);
  const isFocused = useIsFocused();

  return (isFocused &&
    <SafeAreaView
      style={
        StyleSheet.absoluteFillObject
      }
    >

      {Platform.OS === 'android' ? <StatusBar hidden /> : null}

      {isPermissionGranted &&
      <CameraView
        responsiveOrientationWhenOrientationLocked
        style={
          StyleSheet.absoluteFillObject
        }
        facing='back'
        onBarcodeScanned={({ data }) => {
          if (!QRlock.current) {
            console.log("------------")
            console.log("Data:" + data);
            QRlock.current = true;
            if (router.canGoBack()) {
              router.back();
            }
          }
          console.log('.')
        }}
      />  
    }
    {!isPermissionGranted &&
        <View className="bg-custom-primary w-11/12 py-3 px-3 rounded-2xl m-auto grid grid-flow-row">

            <Text className="text-xl">Kamera engedélyezése szükséges</Text>
            <Text className="mx-auto mt-2">Kérjük engedélyezze a kamera használatát a beállításokban.</Text>

            <Pressable onPress={Linking.openSettings} className="w-full mt-2 h-16 bg-custom-secondary rounded-lg">
                <Text className="text-[#F5F5F5] m-auto">Beállítások</Text>
            </Pressable>

            <Pressable onPress={requestPermission} className="w-full mt-10 h-16 bg-custom-secondary rounded-lg">
                <Text className="text-[#F5F5F5] m-auto">Frissítés</Text>
            </Pressable>
        </View>
    }
      <Text className='text-red-500 text-lg mt-20 mx-auto'></Text>
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
