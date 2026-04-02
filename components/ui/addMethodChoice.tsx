import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AddMethodChoice(){
    return (
    <View className="w-11/12 mx-auto border border-custom-secondary/20 rounded-2xl mt-5 ">
        <Text className="m-auto text-2xl my-2">Hozzáadás</Text>
        <View className="w-full flex flex-row">

            <View className="w-1/2 p-1">
                <TouchableOpacity className="border border-custom-secondary rounded-xl py-2">
                    <Image source={require('@/assets/images/email.png')} style={styles.image}/>
                    <Text className="text-lg mx-auto">Email</Text>
                </TouchableOpacity>
            </View>
            
            <View className="w-1/2 p-1">
                <TouchableOpacity className="border border-custom-secondary rounded-xl py-2">
                    <Image source={require('@/assets/images/identifier.png')} style={styles.image}/>
                    <Text className="text-lg mx-auto">Azonosító</Text>
                </TouchableOpacity>
            </View>

        </View>
    </View>
    )
}

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    bottom: 0,
    left: 0,
    margin:"auto",
  },
});