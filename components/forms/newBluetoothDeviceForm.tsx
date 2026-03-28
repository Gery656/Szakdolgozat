import { apiURL, getToken, setUser } from "@/redux/applicationSlice";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function NewBluetoothDeviceForm() {
    const [deviceName,setDeviceName] = useState("");
    const [deviceNameError,setDeviceNameError] = useState<string[]>([]);
    const [uuid,setUuid] = useState("");
    const [uuidError,setUuidError] = useState<string[]>([]);
    const [code,setCode] = useState("");
    const [codeError,setCodeError] = useState<string[]>([]);

    const [isLoading,setIsLoading] = useState(false);

    const token = useSelector(getToken);
    const dispatch = useDispatch();

    return (
        <View className="bg-[#F2EAD3] mt-20 w-11/12 py-3 px-3 rounded-2xl mx-auto shadow">

            <Text className="text-lg">Eszköz neve:</Text>
            <TextInput
                className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" 
                onChange={(event)=>{setDeviceName(event.nativeEvent.text)}}
            />
            {deviceNameError.length !== 0 && deviceNameError.map((error, i) => <Text key={i} className="text-red-500">{error}</Text>)}

            <Text className="text-lg mt-2">UUID:</Text>
            <TextInput
                className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" 
                onChange={(event)=>{setUuid(event.nativeEvent.text)}}
            />
            {uuidError.length !== 0 && uuidError.map((error, i) => <Text key={i} className="text-red-500">{error}</Text>)}

            <Text className="text-lg mt-2">Jelige:</Text>
            <TextInput
                className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" 
                onChange={(event)=>{setCode(event.nativeEvent.text)}}
            />
            {codeError.length !== 0 && codeError.map((error, i) => <Text key={i} className="text-red-500">{error}</Text>)}

            {isLoading ?
                <View className="w-full h-16 bg-custom-secondary mt-10 rounded-lg">
                    <ActivityIndicator className="m-auto" size={"small"}></ActivityIndicator>
                </View>
                :
                <Pressable 
                    className="w-full h-16 bg-custom-secondary mt-10 rounded-lg"
                    onPress={async()=>{
                        setDeviceNameError([]);
                        setUuidError([]);
                        setCodeError([]);

                        setIsLoading(true);

                    const response = await fetch(apiURL + "/bluetoothDevices", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": "Bearer "+token
                        },
                        body: JSON.stringify({
                            deviceName:deviceName,
                            uuid:uuid,
                            code:code
                        })
                    });

                    const body = await response.json();

                    if (!response.ok) {
                        if (response.status === 422) {
                            if (body.errors.deviceName) {
                                setDeviceNameError([...body.errors.deviceName]);
                            }
                            if (body.errors.uuid) {
                                setUuidError([...body.errors.uuid]);
                            }
                            if (body.errors.code) {
                                setCodeError([...body.errors.code]);
                            }
                        }
                        if (response.status === 401) {
                            router.dismissTo('/');
                        }
                        setIsLoading(false);
                        return;
                    }

                    const response2 = await fetch(apiURL + "/resources", {
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
                    const recievedData = await response2.json();
                    dispatch(setUser(recievedData.user));

                    setIsLoading(false);

                    router.dismissTo("/BluetoothDevicesScreen");

                    }}
                    >
                    <Text className="text-[#F5F5F5] m-auto">Létrehozás</Text>
                </Pressable>
            }
        </View>
    )
}