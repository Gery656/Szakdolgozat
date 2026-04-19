import PageTitle from '@/components/ui/pageTitle';
import useBLE from '@/hooks/useBLE';
import { apiURL, getBluetoothIdentifierToSend, getMethodToSignUp, getToken, setMandatoryCatalogs } from '@/redux/applicationSlice';
import { useIsFocused } from '@react-navigation/native';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { UUID } from 'react-native-ble-plx';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';


export default function BleHome() {

  const isFocused = useIsFocused();

  const { scanForPeripherals, allDevices, stopScanForPeripherals } = useBLE();

  const [isScanningDone, setIsScanningDone] = useState<boolean>(false);

  const { isGPSNeeded } = useSelector(getMethodToSignUp);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorText, setErrorText] = useState<string[]>([]);
  const [eventName, setEventName] = useState("");
  const [catalogName, setCatalogName] = useState("");

  const BTIdentifierToSend = useSelector(getBluetoothIdentifierToSend);
  const dispatch = useDispatch();

  const token = useSelector(getToken);

  async function getCurrentLocation() {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorText(["Helymeghatározás engedélyek hiányoznak!"]);
      return null;
    }

    return await Location.getCurrentPositionAsync({});
  }

  async function SignUpOnRead() {
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

    //TODO: The problem is HERE, allDevices is a stateful variable and I cannot read it like this at this moment.
    let uuids: UUID[] = [];
    console.log(allDevices)
    console.log(allDevices.map((device) => { device.serviceUUIDs?.map((current_uuid) => { uuids.push(current_uuid) }) }))
    console.log(uuids);

    const response = await fetch(apiURL + "/signup/bluetooth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        bluetoothDeviceIdentifier: BTIdentifierToSend,
        ...(location ? { latitude: location.coords.latitude, longitude: location.coords.longitude } : {}),
        uuids: uuids
      })
    });

    const recievedData = await response.json();

    if (!response.ok) {
      var errors: string[] = []
      if (response.status === 422) {
        if (recievedData.errors) {
          Object.values<string[]>(recievedData.errors).map((errorArray) => { errorArray.map((errorText) => errors.push(errorText)) })
          // errors = [...errors, ...recievedData.errors.bluetoothDeviceIdentifier]
        }
        // if (recievedData.errors.latitude) {
        //   errors = [...errors, ...recievedData.errors.latitude]
        // }
        // if (recievedData.errors.longitude) {
        //   errors = [...errors, ...recievedData.errors.longitude]
        // }
        // if (recievedData.errors.location) {
        //   errors = [...errors, ...recievedData.errors.location]
        // }
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

  useEffect(() => {

    scanForPeripherals();
    let timeout1 = setTimeout(() => {
      stopScanForPeripherals();
      setIsScanningDone(true);
      console.log("useEffect - "+allDevices)
      SignUpOnRead()
    }, 5000);


    return () => {
      stopScanForPeripherals();
      console.log("Return of useEffect")
      clearTimeout(timeout1);

    };
  }, []);

  return (isFocused &&
    <SafeAreaView className='min-w-full min-h-full border border-red-500'>
      <ScrollView className='min-w-full min-h-full border'>
        <PageTitle title='Bluetooth érzékelés' backButton lowerTopMargin></PageTitle>
        {!isScanningDone &&
          <View className='mt-10 flex flex-col gap-5'>
            <ActivityIndicator className='mx-auto' size={"large"} color={"blue"}></ActivityIndicator>
            <Text className='mx-auto'>Bluetooth érzékelés folyamatban...</Text>
          </View>
        }
        {isScanningDone &&
          <View className='mt-10 flex flex-col gap-5'>
            {
              isLoading ?
                <View className='flex flex-col gap-5'>
                  <ActivityIndicator className='mx-auto' size={"large"} color={"blue"}></ActivityIndicator>
                  <Text className='mx-auto'>Adatok küldése folyamatban...</Text>
                </View>
                :
                isSuccess ?
                  <View className='w-11/12 bg-blue-950 mx-auto rounded-3xl'>
                    {allDevices.map((device, i) =>
                      <View key={i} className='w-11/12 mx-auto border-b pb-1 border-red-500'>
                        <Text className='text-white mt-2'>{device.id}</Text>
                        {device.serviceUUIDs?.map((uuid, j) => <Text key={j} className='text-white mx-auto'>{uuid}</Text>)}
                        <Text className='text-white mx-auto'>{device.name}</Text>
                      </View>
                    )}
                  </View>
                  :
                  <>
                    <View className='w-11/12 mx-auto bg-custom-primary rounded-xl p-4'>
                      <View>
                        <Image source={require("@/assets/images/redX.png")} style={styles.resultPic} />
                      </View>
                    </View>
                    {errorText.length !== 0 && errorText.map((error, i) => <Text key={i} className="text-red-500 mx-auto">{error}</Text>)}
                  </>

            }
                  <View className='w-11/12 bg-blue-950 mx-auto rounded-3xl'>
                    {allDevices.map((device, i) =>
                      <View key={i} className='w-11/12 mx-auto border-b pb-1 border-red-500'>
                        <Text className='text-white mt-2'>{device.id}</Text>
                        {device.serviceUUIDs?.map((uuid, j) => <Text key={j} className='text-white mx-auto'>{uuid}</Text>)}
                        <Text className='text-white mx-auto'>{device.name}</Text>
                      </View>
                    )}
                  </View>
                  {allDevices.map((device) => device.serviceUUIDs?.map((current_uuid,i) => <Text key={i}>{current_uuid}</Text> ) )}
          </View>
        }
      </ScrollView>
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
  }
});