import { BluetoothDevice } from '@/interfaces/types';
import { apiURL, getSelectedEvent, getToken, getUser, setEvents, setSharedCatalog, setUser } from '@/redux/applicationSlice';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useState } from "react";
import { ActionSheetIOS, ActivityIndicator, Platform, Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';

export default function NewCatalogForm() {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState<string[]>([]);
    const [lengthInMin, setLengthInMin] = useState("");
    const [lengthInMinError, setLengthInMinError] = useState<string[]>([]);
    const [catalogType, setCatalogType] = useState("code");
    const [isGPSNeeded, setIsGPSNeeded] = useState(false);
    const [bluetooth_device_id, setBluetooth_device_id] = useState("");
    const [bluetooth_device_idError, setBluetooth_device_idError] = useState<string[]>([]);

    const [locationError, setLocationError] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const event_id = useSelector(getSelectedEvent);

    const user = useSelector(getUser);
    const token = useSelector(getToken);

    const dispatch = useDispatch();

    async function getCurrentLocation() {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setLocationError(["Helymeghatározás engedélyek hiányoznak!"]);
            return null;
        }

        return await Location.getCurrentPositionAsync({});
    }

    return (
        <View>
            <View className="bg-[#F2EAD3] mt-10 w-11/12 h-fit py-3 px-3 rounded-2xl mx-auto shadow">
                <Text className="text-lg">Ellenőrzés neve:</Text>
                <TextInput className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background"
                    onChange={(event) => setName(event.nativeEvent.text)}
                />
                {nameError.length !== 0 && nameError.map((error, i) => <Text key={i} className="text-red-500">{error}</Text>)}

                <Text className="text-lg mt-2">Hossz:</Text>
                <View className='flex flex-row gap-2'>
                    <TextInput keyboardType='numeric' className="w-10/12 border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background"
                        onChange={(event) => setLengthInMin(event.nativeEvent.text)}
                    />
                    <Text className='my-auto text-lg'>perc</Text>
                </View>
                {lengthInMinError.length !== 0 && lengthInMinError.map((error, i) => <Text key={i} className="text-red-500">{error}</Text>)}
                {Platform.OS === "ios" && <Pressable className='h-10 border bg-custom-background'
                    onPress={() => {
                        ActionSheetIOS.showActionSheetWithOptions(
                            {
                                options: ['Cancel', 'Generate number', 'Reset', 'asd'],
                                userInterfaceStyle: 'light',
                            },
                            buttonIndex => {
                                // if (buttonIndex === 0) {
                                //   // cancel action
                                // } else if (buttonIndex === 1) {
                                //   setResult(String(Math.floor(Math.random() * 100) + 1));
                                // } else if (buttonIndex === 2) {
                                //   setResult('🔮');
                                // }
                            },
                        );
                    }}></Pressable>}
                {Platform.OS === 'android'
                    ? <Text className="text-lg mt-2">Ellenőrzés típusa:</Text>
                    : <View className='flex flex-row justify-between px-5'>
                        <Text className="text-lg mt-2">Ellenőrzés típusa:</Text>
                        {catalogType === 'bluetooth' && <Text className="text-lg mt-2">Eszköz:</Text>}
                    </View>
                }
                {/* first Picker for the type, second is only visible if the type is bluetooth */}
                <View className='android:border android:border-custom-secondary rounded-lg text-black text-lg bg-custom-background ios:flex ios:flex-row'>
                    <Picker
                        style={Platform.OS === "android" ? styles.androidPickerStyle : styles.iosPickerStyle}
                        dropdownIconColor={"#000000"}
                        itemStyle={Platform.OS === "android" ? styles.androidPickerStyle : styles.iosPickerStyle}
                        selectedValue={catalogType}

                        onValueChange={(itemValue, itemIndex) => {
                            setCatalogType(itemValue)
                            if (itemValue === "bluetooth") {
                                setBluetooth_device_id(user.bluetooth_devices[0].id)
                            }
                            else {
                                setBluetooth_device_id("")
                            }
                        }
                        }>

                        <Picker.Item label="Kód" value="code" />
                        <Picker.Item label="QR" value="qr" />
                        {user.bluetooth_devices.length!==0 && <Picker.Item label="Bluetooth" value="bluetooth" />}
                        {Platform.OS === "android" && <Picker.Item label="NFC" value="nfc" />}
                    </Picker>
                    {/* the second Picker for IOS */}
                    {Platform.OS === "ios" && catalogType === "bluetooth" &&
                        <Picker
                            style={styles.iosPickerStyle}
                            dropdownIconColor={"#000000"}
                            itemStyle={styles.iosPickerStyle}
                            selectedValue={bluetooth_device_id}

                            onValueChange={(itemValue, itemIndex) =>
                                setBluetooth_device_id(itemValue)
                            }>

                            {user.bluetooth_devices.map((device: BluetoothDevice) => <Picker.Item label={device.deviceName} value={device.id} />)}

                        </Picker>}
                </View>

                {/* the second Picker for Android */}
                {Platform.OS === "android" && catalogType === "bluetooth" &&
                    <>
                        <Text className="text-lg mt-2">Eszköz:</Text>
                        <View className='android:border android:border-custom-secondary rounded-lg text-black text-lg bg-custom-background ios:flex ios:flex-row'>
                            <Picker
                                style={styles.androidPickerStyle}
                                dropdownIconColor={"#000000"}
                                itemStyle={styles.androidPickerStyle}
                                selectedValue={user.bluetooth_devices[0].id}

                                onValueChange={(itemValue, itemIndex) =>
                                    setBluetooth_device_id(itemValue)
                                }>
                                {user.bluetooth_devices.map((device: BluetoothDevice) => <Picker.Item label={device.deviceName} value={device.id} />)}

                            </Picker>
                        </View>
                    </>}

                {bluetooth_device_idError.length !== 0 && bluetooth_device_idError.map((error, i) => <Text key={i} className="text-red-500">{error}</Text>)}

                <View className='flex flex-row justify-center mt-5 mb-10 gap-2'>
                    <View>
                        <Text className='my-auto'>GPS</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isGPSNeeded ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { setIsGPSNeeded(!isGPSNeeded) }}
                        value={isGPSNeeded}
                    />
                </View>

                {locationError.length !== 0 && locationError.map((error, i) => <Text key={i} className="text-red-500 m-auto">{error}</Text>)}

                {isLoading ?
                    <View className="w-full h-16 bg-custom-secondary rounded-lg">
                        <ActivityIndicator className="m-auto" size={"small"}></ActivityIndicator>
                    </View>
                    :
                    <Pressable
                        onPress={async () => {
                            setNameError([]);
                            setLengthInMinError([]);
                            setBluetooth_device_idError([]);
                            setLocationError([]);

                            setIsLoading(true);

                            let location = null;
                            if (isGPSNeeded) {
                                try {
                                    location = await getCurrentLocation();
                                } catch (error) {
                                    setLocationError(["Helymeghatározás ki van kapcsolva!"]);
                                    setIsLoading(false);
                                    return
                                }

                                if (!location) {
                                    setIsLoading(false);
                                    return
                                }
                            }

                            let response = null;
                            try {
                                response = await fetch(apiURL + "/events/" + event_id + "/catalogs/create", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Accept": "application/json",
                                        "Authorization": "Bearer " + token
                                    },
                                    body: JSON.stringify({
                                        name: name,
                                        lengthInMin: lengthInMin,
                                        type: catalogType,
                                        isGPSNeeded: isGPSNeeded,
                                        ...(bluetooth_device_id !== "" ? { bluetooth_device_id: bluetooth_device_id } : {}),
                                        latitude: location?.coords.latitude ?? 0,
                                        longitude: location?.coords.longitude ?? 0
                                    })
                                });
                            } catch (ex) {
                                setLocationError([...locationError, "Próbálkozzon újra!"])
                                setIsLoading(false);
                                return;
                            }
                            const body = await response.json();

                            if (!response.ok) {
                                if (response.status === 422) {
                                    if (body.errors.name) {
                                        setNameError([...body.errors.name]);
                                    }
                                    if (body.errors.lengthInMin) {
                                        setLengthInMinError([...body.errors.lengthInMin]);
                                    }
                                    if (body.errors.isGPSNeeded) {
                                        setLocationError([...locationError, ...body.errors.isGPSNeeded]);
                                    }
                                    if (body.errors.bluetooth_device_id) {
                                        setBluetooth_device_idError([...body.errors.bluetooth_device_id]);
                                    }
                                    if (body.errors.latitude) {
                                        setLocationError([...locationError, ...body.errors.isGPSNeeded]);
                                    }
                                    if (body.errors.longitude) {
                                        setLocationError([...locationError, ...body.errors.isGPSNeeded]);
                                    }
                                }
                                if (response.status === 404) {
                                    setLocationError([...locationError, ...body.error])
                                }
                                if (response.status === 401) {
                                    if (router.canDismiss()) {
                                        router.dismissAll()
                                    }
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
                            dispatch(setEvents(recievedData.events));
                            dispatch(setSharedCatalog(body.id))
                            setIsLoading(false);

                            router.push("/OnSuccessfulCatalogCreation");
                        }}
                        className="w-full h-16 bg-custom-secondary mt-2 rounded-lg">
                        <Text className="text-[#F5F5F5] m-auto">Indítás</Text>
                    </Pressable>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    androidPickerStyle: {
        color: "#000000",
    },
    iosPickerStyle: {
        height: 120,
        color: "#000000",
        width: 150,
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: 16
    }
})