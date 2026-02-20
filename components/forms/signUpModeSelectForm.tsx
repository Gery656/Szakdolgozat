import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

export default function SignUpModeSelectForm() {

    const [isEnabled,setIsEnabled] = useState(false);

    return (
        <View className="w-11/12 mx-auto mt-10 flex flex-row flex-wrap">

            <View className="w-1/2 p-1">
                <View className="w-full h-44 border border-custom-secondary bg-custom-primary rounded-2xl py-1 px-2 shadow">
                    <Image source={require("@/assets/images/passcode.png")} style={styles.passcode} />
                    <Text className="text-base mx-auto">Kód</Text>
                </View>
            </View>

            <View className="w-1/2 p-1">
                <View className="w-full h-44 border border-custom-secondary bg-custom-primary rounded-2xl py-1 px-2 shadow">
                    <Image source={require("@/assets/images/QR.png")} style={styles.pic} />
                    <Text className="text-base mx-auto">QR</Text>
                </View>
            </View>

            <View className="w-1/2 p-1">
                <View className="w-full h-44 border border-custom-secondary bg-custom-primary rounded-2xl py-1 px-2 shadow">
                    <Image source={require("@/assets/images/nfc.png")} style={styles.pic} />
                    <Text className="text-base mx-auto">NFC</Text>
                </View>
            </View>

            <View className="w-1/2 p-1">
                <View className="w-full h-44 border border-custom-secondary bg-custom-primary rounded-2xl py-1 px-2 shadow">
                    <Image source={require("@/assets/images/bluetooth-100.png")} style={styles.pic} />
                    <Text className="text-base mx-auto">Bluetooth</Text>
                </View>
            </View>

            <View className="mt-2 w-full h-16 border border-custom-secondary bg-custom-primary rounded-2xl py-4 px-2 shadow flex flex-row justify-between">
                <View>
                    <Text className="text-lg my-auto px-2">GPS</Text>
                </View>
                <View className="">
                    <Switch
                        className="my-auto"
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { setIsEnabled(!isEnabled) }}
                        value={isEnabled}
                    />
                </View>
            </View>

            <Pressable className="w-full h-16 bg-custom-secondary mt-4 rounded-lg">
                <Text className="text-[#F5F5F5] m-auto">Jelentkezés</Text>
            </Pressable>

        </View>
    )
}
const styles = StyleSheet.create({
    passcode: {
        height: 50,
        width: 50,
        bottom: 0,
        left: 0,
        margin: "auto"
    },
    pic: {
        height: 100,
        width: 100,
        bottom: 0,
        left: 0,
        margin: "auto"
    },
});