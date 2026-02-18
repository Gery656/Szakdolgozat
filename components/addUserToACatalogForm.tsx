import { Pressable, Text, TextInput, View } from "react-native";

export default function AddUserToACatalogForm(){
    return(
        <View className="w-11/12 mx-auto mt-4 flex flex-row justify-between">
            <TextInput className="w-9/12 border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" />
            <Pressable>
                <View className="rounded-lg h-12 bg-custom-secondary px-2">
                    <Text className="text-white m-auto">Hozzáad</Text>
                </View>
            </Pressable>
        </View>
    )
}