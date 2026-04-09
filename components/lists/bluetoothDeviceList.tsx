import { BluetoothDevice } from "@/interfaces/types";
import { getUser, setSelectedBluetoothDevice } from "@/redux/applicationSlice";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function BluetoothDeviceList() {
    const user = useSelector(getUser);
    const dispatch = useDispatch();

    function editOnPress(id:number) {
        dispatch(setSelectedBluetoothDevice(id));
        router.push("/(screens)/UpdateBluetoothDeviceScreen");
    }

    return (
        <View className="w-11/12 mx-auto mt-4 flex flex-row flex-wrap">

            {user.bluetooth_devices.map((device: BluetoothDevice, i: number) =>
                <View key={i} className="w-1/2 p-1">
                    <View className="w-full border border-custom-secondary bg-custom-primary rounded-2xl py-1 px-2 shadow">
                        <Text className="text-xl font-bold border-b border-custom-secondary">{device.deviceName}</Text>
                        <Text className="text-lg mt-2 font-bold">UUID:</Text>
                        <Text className="text-base">{device.uuid}</Text>

                        <View className="flex flex-row">
                            <View className="w-2/3">
                                <Text className="text-lg mt-2 font-bold">Jelige:</Text>
                                <Text className="text-base">{device.code}</Text>
                            </View>
                            <TouchableOpacity
                                className="w-1/3"
                                onPress={()=>{editOnPress(device.id)}}>
                                <Image source={require('@/assets/images/edit2.png')} style={styles.image} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 23,
        width: 23,
        bottom: 0,
        left: 0,
        margin: "auto"
    },
});