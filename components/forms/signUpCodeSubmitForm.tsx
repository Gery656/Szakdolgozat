import { Pressable, Text, TextInput, View } from "react-native";

export default function SignUpCodeSubmitForm() {
    return (
        <View className="bg-custom-primary mt-32 w-11/12 py-3 px-3 rounded-2xl mx-auto grid grid-flow-row">

            <Text className="text-lg">Kód:</Text>
            <TextInput className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" />

            <Pressable className="w-full h-16 bg-custom-secondary mt-10 rounded-lg">
                <Text className="text-[#F5F5F5] m-auto">Jelentkezés</Text>
            </Pressable>
        </View>
    )
}