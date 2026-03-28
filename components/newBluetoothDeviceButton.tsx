import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function NewBluetoothDeviceButton(){
    return(
        <View className="w-11/12 mx-auto my-2">
                <Link href={"/(screens)/NewBluetoothDeviceScreen"} asChild>
                  <TouchableOpacity>
                      <Image source={require('@/assets/images/plus.png')} style={styles.image}/>
                  </TouchableOpacity>
                </Link>
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