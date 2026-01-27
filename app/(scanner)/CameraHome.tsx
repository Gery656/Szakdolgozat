import { useIsFocused } from '@react-navigation/native';
import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function CameraHome() {

  const QRlock = useRef(false);
  const isFocused = useIsFocused();
  
  return (isFocused &&
      <SafeAreaView
        style={
          StyleSheet.absoluteFillObject
        }
      >

        {Platform.OS==='android' ? <StatusBar hidden/>: null}
        
        <CameraView
        responsiveOrientationWhenOrientationLocked
           style={
             StyleSheet.absoluteFillObject
           }
          facing='back'
          onBarcodeScanned={({data})=>{
            if (!QRlock.current) {
              console.log("------------")
              console.log("Data:"+data);
              QRlock.current=true;
              router.navigate('/(tabs)/camera');
            }
            console.log('.')
          }}
          />
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
