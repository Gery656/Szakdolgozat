import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function EventList(){

    const nums = [...Array(10).keys()];
    return(
        <View className="w-11/12 mx-auto">


        {nums.map((num) =>
            <Pressable key={num} className="my-2">
                <View className="w-full flex flex-row bg-custom-primary rounded-2xl shadow p-2">
                    <View className="w-5/6">
                        <View className="my-auto w-full h-fit">
                            <Text className="text-xl">Példa esemény</Text>
                            <Text className="my-2">x db ellenőrzés történt</Text>
                            <Text>Ez az általam rendezett példa esemény.</Text>
                        </View>
                    </View>
                    <View className="w-1/6">
                        <Image source={require("@/assets/images/rightArrow.png")} style={styles.image}/>
                    </View>
                </View>
            </Pressable>
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
    margin:"auto"
  },
});