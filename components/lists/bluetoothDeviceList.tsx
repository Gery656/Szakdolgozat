import { Text, View } from "react-native";

export default function BluetoothDeviceList() {
    const indexes = [...new Array(7).keys()]
    return (
        <View className="w-11/12 mx-auto mt-4 flex flex-row flex-wrap">

            {indexes.map((item,i) => 
                <View key={i} className="w-1/2 p-1">
                    <View className="w-full border border-custom-secondary bg-custom-primary rounded-2xl py-1 px-2 shadow">
                        <Text className="text-xl font-bold border-b border-custom-secondary">Beacon 11111111111111111111111</Text>
                        <Text className="text-lg mt-2 font-bold">UUID:</Text>
                        <Text className="text-base">54409138-07e5-4ac5-aace-ef1904b52643</Text>
                        <Text className="text-lg mt-2 font-bold">Jelige:</Text>
                        <Text className="text-base">BEACON-1</Text>
                    </View>
                </View>
            )}

        </View>
    )
}