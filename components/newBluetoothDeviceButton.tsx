import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";

export default function NewBluetoothDeviceButton(){
    return(
        <View className="w-11/12 mx-auto my-2">
                <Pressable>
                    <Image source={require('@/assets/images/plus.png')} style={styles.image}/>
                </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
  image: {
    height: 70,
    width: 70,
    bottom: 0,
    left: 0,
    margin:"auto",
  },
});