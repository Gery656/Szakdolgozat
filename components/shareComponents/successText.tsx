import { Text, View } from "react-native";

export default function SuccessText(){
    return(
        <View className="w-8/12 mx-auto bg-custom-primary mt-44 p-5 rounded-2xl shadow">
            <Text className="text-2xl mx-auto">Sikeres indítás</Text>
        </View>
    )
}