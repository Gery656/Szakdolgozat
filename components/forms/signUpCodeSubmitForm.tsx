import { apiURL, getMethodToSignUp, getToken, setMandatoryCatalogs } from "@/redux/applicationSlice";
import * as Location from 'expo-location';
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function SignUpCodeSubmitForm() {

    const { isGPSNeeded } = useSelector(getMethodToSignUp);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorText, setErrorText] = useState<string[]>([]);
    const [code, setCode] = useState("");
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

    async function SignUpOnPress() {
        setErrorText([]);
        setIsLoading(true)

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
                code: code,
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

        setIsSuccess(true)
        setIsLoading(false)
    };

    return (isSuccess ?
        <View className='w-11/12 mt-32 mx-auto bg-custom-primary rounded-xl p-4'>
            <View className='border-b'>
                <Text className='text-xl mx-auto'>Sikeres jelentkezés!</Text>
            </View>
            <View className='mt-4'>
                <Text className='mx-auto'>Sikeresen jelentkezett a következő ellenőrzésre:</Text>
                <Text className='mx-auto'>{eventName} - {catalogName}</Text>
            </View>
        </View>
        :
        <View className="bg-custom-primary mt-32 w-11/12 py-3 px-3 rounded-2xl mx-auto grid grid-flow-row">

            <Text className="text-lg">Kód:</Text>
            <TextInput className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background"
                onChange={(event) => { setCode(event.nativeEvent.text) }}
            />
            {errorText.length !== 0 && errorText.map((error, i) => <Text key={i} className="text-red-500">{error}</Text>)}

            {isLoading ?
                <View className="w-full h-16 bg-custom-secondary mt-10 rounded-lg">
                    <ActivityIndicator className="m-auto" size={"small"}></ActivityIndicator>
                </View>
                :
                <Pressable className="w-full h-16 bg-custom-secondary mt-10 rounded-lg"
                    onPress={SignUpOnPress}>
                    <Text className="text-[#F5F5F5] m-auto">Jelentkezés</Text>
                </Pressable>
            }
        </View>
    )
}