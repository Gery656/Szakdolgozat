import ParallaxScrollView from '@/components/parallax-scroll-view';
import { useIsFocused } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NfcManager, { Ndef, NfcEvents, NfcTech } from "react-native-nfc-manager";


export default function NFCScanScreen() {
  const isFocused = useIsFocused();
  const [errorText, setErrorText] = useState({state:"loading",message:""});

  function listenToNfcEventOnce() {
  const cleanUp = () => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.setEventListener(NfcEvents.SessionClosed, null);
  };

  return new Promise((resolve :any) => {
    let tagFound : any = null;

    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag : any) => {
      tagFound = tag;
      resolve(tagFound);
      NfcManager.unregisterTagEvent();
    });

    NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
      cleanUp();
      if (!tagFound) {
        resolve();
      }
    });

    NfcManager.registerTagEvent();
  });
}

    async function readNdef() {
    try {
      NfcManager.start()
      // register for the NFC tag with NDEF in it
      if (Platform.OS==="ios") {
        // await NfcManager.requestTechnology(NfcTech.MifareIOS);
        // const tag = await NfcManager.getTag();
        // const gotBytes : number[] = [];
        // tag?.ndefMessage[0].payload.forEach(num => gotBytes.push(num))
        // const decodeddata = new Uint8Array(gotBytes)
        // console.warn('Tag found', Ndef.text.decodePayload(decodeddata));
        const tag : any = await listenToNfcEventOnce()
        const gotBytes : number[] = [];
        tag.ndefMessage[0].payload.forEach((num : any) => gotBytes.push(num))
        const decodeddata = new Uint8Array(gotBytes)

        console.warn('Tag found', Ndef.text.decodePayload(decodeddata));
        setErrorText(prevState => {
          return {
            ...prevState,
            state: "done",
            message: Ndef.text.decodePayload(decodeddata)
          }
        });

      }
      else{
        await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
        const tag = await NfcManager.getTag();
        const gotBytes : number[] = [];
        tag?.ndefMessage[0].payload.forEach(num => gotBytes.push(num))
        const decodeddata = new Uint8Array(gotBytes)

        console.warn('Tag found', Ndef.text.decodePayload(decodeddata));
                setErrorText(prevState => {
          return {
            ...prevState,
            state: "done",
            message: Ndef.text.decodePayload(decodeddata)
          }
        });

      }
    } catch (ex) {
      console.warn('Oops!', ex);
      setErrorText(prevState => {
          return {
            ...prevState,
            state: "error",
            message: "Nem sikerült beolvasni a jelet."
          }
        });
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }


  useEffect(() => {
    async function checkIfEnabledAndScan() {
      if (await NfcManager.isEnabled()) {
        setErrorText(prevState => {
          return {
            ...prevState,
            state: "scanning",
            message: ""
          }
        });
        readNdef();
        console.log("Scanning...")
      }
      else {

        setErrorText(prevState => {
          return {
            ...prevState,
            state: "error",
            message: "NFC nincs bekapcsolva."
          }
        });
      }
    }

    checkIfEnabledAndScan();
    console.log("useEffect()");
    return(()=>{
      NfcManager.cancelTechnologyRequest();
      console.log("end of useEffect()")
    })
  },[]);

  return (isFocused &&
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
          />
        }>
        <Text className='text-black dark:text-white m-auto text-2xl'> - NFC Scan -</Text>
        <View className='flex justify-center items-center'>
            <TouchableOpacity onPress={readNdef}>
                <Text className='text-white'>Scan a Tag</Text>
            </TouchableOpacity>
            <Text className='mt-10 mx-auto text-white text-xl'>{errorText.state}</Text>
            <Text className='mt-10 mx-auto text-white'>{errorText.message}</Text>
        </View>
        
    </ParallaxScrollView>
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
  wrapper: {
    color:"#ffffff",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
