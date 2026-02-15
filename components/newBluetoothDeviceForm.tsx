import { Pressable, Text, TextInput, View } from "react-native"

export default function NewBluetoothDeviceForm() {
    return (
        <View className="bg-[#F2EAD3] mt-20 w-11/12 py-3 px-3 rounded-2xl mx-auto shadow">

            <Text className="text-lg">Eszköz neve:</Text>
            <TextInput className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" />

            <Text className="text-lg mt-2">UUID:</Text>
            <TextInput className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" />

            <Text className="text-lg mt-2">Jelige:</Text>
            <TextInput className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" />

            <Pressable className="w-full h-16 bg-custom-secondary mt-10 rounded-lg">
                <Text className="text-[#F5F5F5] m-auto">Létrehozás</Text>
            </Pressable>
        </View>
    )
}