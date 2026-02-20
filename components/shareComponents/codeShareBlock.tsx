import { Text, View } from "react-native";

export default function CodeShareBlock(){
    return(
        <View className="w-8/12 mx-auto bg-custom-primary mt-20 p-5 rounded-2xl shadow">
            <Text className="text-lg">Kód:</Text>
            <Text className="text-5xl mx-auto">123456</Text>
        </View>
    )
}