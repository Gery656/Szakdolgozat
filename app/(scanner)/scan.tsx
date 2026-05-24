import MessageBlock from '@/components/ui/messageBlock';
import PageTitle from '@/components/ui/pageTitle';
import { apiURL, getMethodToSignUp, getToken, setMandatoryCatalogs } from '@/redux/applicationSlice';
import { useIsFocused } from '@react-navigation/native';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';
import NfcManager, { Ndef, NfcEvents, NfcTech } from "react-native-nfc-manager";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';


export default function NFCScanScreen() {
  const isFocused = useIsFocused();
  const [stateOfScan, setStateOfScan] = useState({ state: "loading", message: "" });

  const { isGPSNeeded } = useSelector(getMethodToSignUp);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorText, setErrorText] = useState<string[]>([]);
  const [eventName, setEventName] = useState("");
  const [catalogName, setCatalogName] = useState("");

  const token = useSelector(getToken);
  const dispatch = useDispatch();

  function listenToNfcEventOnce() {
    const cleanUp = () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };

    return new Promise((resolve: any) => {
      let tagFound: any = null;

      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
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
    let data = "";
    try {
      NfcManager.start()
      if (Platform.OS === "ios") { //IOS
        const tag: any = await listenToNfcEventOnce()
        const gotBytes: number[] = [];
        tag.ndefMessage[0].payload.forEach((num: any) => gotBytes.push(num))
        const decodeddata = new Uint8Array(gotBytes)

        data = Ndef.text.decodePayload(decodeddata)
      }
      else { //Android
        await NfcManager.requestTechnology(NfcTech.Ndef);
        const tag = await NfcManager.getTag();
        const gotBytes: number[] = [];
        tag?.ndefMessage[0].payload.forEach(num => gotBytes.push(num))
        const decodeddata = new Uint8Array(gotBytes)

        data = Ndef.text.decodePayload(decodeddata)
      }

      setStateOfScan(prevState => {
        return {
          ...prevState,
          state: "done",
          message: ""
        }
      });


    } catch (ex) {
      console.warn('Oops!', ex);
      setStateOfScan(prevState => {
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
    await SignUpOnRead(data);
  }


  useEffect(() => {
    async function checkIfEnabledAndScan() {
      if (await NfcManager.isEnabled()) {
        setStateOfScan(prevState => {
          return {
            ...prevState,
            state: "scanning",
            message: ""
          }
        });
        readNdef();
      }
      else {

        setStateOfScan(prevState => {
          return {
            ...prevState,
            state: "error",
            message: "NFC nincs bekapcsolva."
          }
        });
      }
    }

    checkIfEnabledAndScan();
    return (() => {
      NfcManager.cancelTechnologyRequest();
    })
  }, []);


  async function getCurrentLocation() {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorText(["Helymeghatározás engedélyek hiányoznak!"]);
      return null;
    }

    return await Location.getCurrentPositionAsync({});
  }

  async function SignUpOnRead(data: string) {
    setIsLoading(true)
    setErrorText([]);

    let location = null;
    if (isGPSNeeded) {
      try {
        location = await getCurrentLocation();
      } catch (error) {
        setErrorText(["Helymeghatározás ki van kapcsolva!"]);
        setIsLoading(false);
        return
      }

      if (!location) {
        setIsLoading(false);
        return
      }
    }

    const response = await fetch(apiURL + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        code: data,
        ...(location ? { latitude: location.coords.latitude, longitude: location.coords.longitude } : {})
      })
    });

    const recievedData = await response.json();

    if (!response.ok) {
      var errors: string[] = []
      if (response.status === 422) {
        if (recievedData.errors.code) {
          errors = [...errors, ...recievedData.errors.code]
        }
        if (recievedData.errors.latitude) {
          errors = [...errors, ...recievedData.errors.latitude]
        }
        if (recievedData.errors.longitude) {
          errors = [...errors, ...recievedData.errors.longitude]
        }
        if (recievedData.errors.location) {
          errors = [...errors, ...recievedData.errors.location]
        }
      }

      setErrorText(errors);

      if (response.status === 401) {
        if (router.canDismiss()) {
          router.dismissAll()
        }
        router.dismissTo('/');
      }

      setIsLoading(false)
      return;
    }

    setEventName(recievedData.eventName)
    setCatalogName(recievedData.catalogName)

    const response2 = await fetch(apiURL + "/user/mandatory/catalogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    });

    if (!response2.ok) {
      if (response2.status === 401) {
        if (router.canDismiss()) {
          router.dismissAll()
        }
        router.dismissTo('/');
      }

      setIsLoading(false);
      return;
    }

    const recievedData2 = await response2.json();
    dispatch(setMandatoryCatalogs(recievedData2));

    setIsSuccess(true);
    setIsLoading(false)
  };

  return (isFocused &&
    <SafeAreaView className='min-w-full min-h-full'>
      <PageTitle title='NFC' backButton lowerTopMargin></PageTitle>

      {stateOfScan.state === "error" &&
        <MessageBlock
          title="Hiba történt"
          message1={stateOfScan.message}
          message2={"Próbálkozzon újra"} />
      }

      {stateOfScan.state === "done" &&
        <View className=' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5'>
          {isLoading ?
            <ActivityIndicator size={"large"} color={"black"}></ActivityIndicator>
            :
            isSuccess ?
              <>
                <View className='w-11/12 mt-32 mx-auto bg-custom-primary rounded-xl p-4'>
                  <View>
                    <Image source={require("@/assets/images/tick.png")} style={styles.resultPic} />
                  </View>
                </View>
                <Text className='text-lg mx-auto'>Sikeres jelentkezés!</Text>
                <Text className='text-lg mx-auto'>{eventName} - {catalogName}</Text>
              </>
              :
              <>
                <View className='w-11/12 mt-32 mx-auto bg-custom-primary rounded-xl p-4'>
                  <View>
                    <Image source={require("@/assets/images/redX.png")} style={styles.resultPic} />
                  </View>
                </View>

                {errorText.length !== 0 && errorText.map((error, i) => <Text key={i} className="text-red-500 mx-auto">{error}</Text>)}
              </>
          }
        </View>
      }


      {stateOfScan.state === "loading" &&
        <MessageBlock
          title="Betöltés..." />
      }

      {stateOfScan.state === "scanning" &&
        <View className=' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5'>
          <Image source={require("@/assets/images/nfc-scan.png")} style={styles.NFC} />
          <Text className='text-xl mx-auto'>Olvasás...</Text>
        </View>
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  resultPic: {
    height: 60,
    width: 60,
    bottom: 0,
    left: 0,
    margin: "auto"
  },
  NFC: {
    height: 100,
    width: 100,
    bottom: 0,
    left: 0,
    margin: "auto"
  },
});