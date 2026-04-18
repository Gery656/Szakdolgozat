import PageTitle from '@/components/ui/pageTitle';
import { apiURL, getMethodToSignUp, getToken, setMandatoryCatalogs } from '@/redux/applicationSlice';
import { useIsFocused } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';


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

    const { isGPSNeeded } = useSelector(getMethodToSignUp);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorText, setErrorText] = useState<string[]>([]);
    const [eventName,setEventName] = useState("");
    const [catalogName,setCatalogName] = useState("");

    const token = useSelector(getToken);
    const dispatch = useDispatch();

    async function getCurrentLocation() {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorText(["Helymeghatározás engedélyek hiányoznak!"]);
            return null;
        }

        return await Location.getCurrentPositionAsync({});
    }

    async function SignUpOnScan(data:string) {
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

        // if (router.canGoBack()) {
        //       router.back();
        // }

        setIsSuccess(true)
        setIsLoading(false)
    };

  return (isFocused &&
    <SafeAreaView
      style={
        StyleSheet.absoluteFillObject
      }
    >

      {Platform.OS === 'android' ? <StatusBar hidden /> : null}

      {isPermissionGranted && !isSuccess && <>
      <CameraView
        responsiveOrientationWhenOrientationLocked
        style={
          StyleSheet.absoluteFillObject
        }
        facing='back'
        onBarcodeScanned={async({ data }) => {
          if (!QRlock.current) {
            QRlock.current = true;

            await SignUpOnScan(data);

            setTimeout(()=>{
              QRlock.current = false;
            },2000)
          }
        }}
        
      /> 
        <View className=' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5'>
          {isLoading ?
            <ActivityIndicator size={"large"} color={"white"}></ActivityIndicator>
            :
            <View className='w-60 h-60 border-8 mx-auto border-white/30 rounded-2xl' />
          }
          {errorText.length !== 0 && errorText.map((error, i) => <Text key={i} className="text-red-500 mx-auto p-1 rounded border border-red-500">{error}</Text>)}
        </View>
      </>
    }

    {isSuccess && <>
        <PageTitle title='Kamera' backButton lowerTopMargin></PageTitle>
        <View className='w-11/12 mt-32 mx-auto bg-custom-primary rounded-xl p-4'>
            <View className='border-b'>
                <Text className='text-xl mx-auto'>Sikeres jelentkezés!</Text>
            </View>
            <View className='mt-4'>
                <Text className='mx-auto'>Sikeresen jelentkezett a következő ellenőrzésre:</Text>
                <Text className='mx-auto'>{eventName} - {catalogName}</Text>
            </View>
        </View>
        </>
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
