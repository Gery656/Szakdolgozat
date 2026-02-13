import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface NewBluetoothDeviceButtonProp{
    title:string,
}
export default function NewBluetoothDeviceButton({title}:NewBluetoothDeviceButtonProp)
{
    return(
        <Pressable>
            <View className="border border-custom-secondary rounded-3xl shadow bg-custom-primary">
                <View className="flex flex-row gap-2 px-4 py-2 m-auto">
                        <Image source={require('@/assets/images/bluetooth.png')} style={styles.image}/>
                    <Text className="text-xl">
                        {title}
                    </Text>
                </View>
            </View>
        </Pressable>
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
