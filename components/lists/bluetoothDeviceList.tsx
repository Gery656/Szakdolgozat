import { BluetoothDevice } from "@/interfaces/types";
import { getUser } from "@/redux/applicationSlice";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function BluetoothDeviceList() {
    const user = useSelector(getUser); 
    return (
        <View className="w-11/12 mx-auto mt-4 flex flex-row flex-wrap">

            {user.bluetooth_devices.map((device:BluetoothDevice,i:number) => 
                <View key={i} className="w-1/2 p-1">
                    <View className="w-full border border-custom-secondary bg-custom-primary rounded-2xl py-1 px-2 shadow">
                        <Text className="text-xl font-bold border-b border-custom-secondary">{device.deviceName}</Text>
                        <Text className="text-lg mt-2 font-bold">UUID:</Text>
                        <Text className="text-base">{device.uuid}</Text>
                        <Text className="text-lg mt-2 font-bold">Jelige:</Text>
                        <Text className="text-base">{device.code}</Text>
                    </View>
                </View>
            )}

        </View>
    )
}