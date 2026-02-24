import { Text, View } from "react-native";

export default function UserList() {

    const array = [...new Array(20).keys()]
    return (
        <View className="w-full mt-5">
            {array.map((key, i) =>
                <View key={i} className={i%2===0? "w-full flex flex-row px-2 bg-custom-primary py-1" : "w-full flex flex-row px-2 py-1"}>
                    <View className="w-1/2">
                        <Text className="text-lg">Jelentkező neve</Text>
                        <Text>jelentkező@example.com</Text>
                    </View>
                    <View className="w-1/2">
                        <Text className="m-auto text-lg"> 2025.12.25. - 13:29</Text>
                    </View>

                </View>
            )}
        </View>
    )
}