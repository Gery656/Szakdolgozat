import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

export default function SignUpModeSelectForm() {

    const [isEnabled,setIsEnabled] = useState(false);
    const [selectedMode,setSelectedMode] = useState("code");

    return (
        <View className="w-11/12 mx-auto mt-10 flex flex-row flex-wrap">

            <Pressable
            className="w-1/2 p-1"
            onPress={()=>{
                setSelectedMode("code");
            }}>
                <View className={selectedMode === "code"
                    ? "w-full h-44 bg-custom-primary rounded-2xl py-1 px-2 shadow border-2 border-custom-secondary"
                    : "w-full h-44 bg-custom-primary rounded-2xl py-1 px-2 shadow"}>
                    {selectedMode==="code" && <Image source={require("@/assets/images/check.png")} style={styles.check} />}
                    <Image source={require("@/assets/images/passcode.png")} style={styles.passcode} />
                    <Text className="text-base mx-auto">Kód</Text>
                </View>
            </Pressable>

            <Pressable
            className="w-1/2 p-1"
            onPress={()=>{
                setSelectedMode("qr");
            }}>
                <View className={selectedMode === "qr"
                    ? "w-full h-44 bg-custom-primary rounded-2xl py-1 px-2 shadow border-2 border-custom-secondary"
                    : "w-full h-44 bg-custom-primary rounded-2xl py-1 px-2 shadow"}>
                    {selectedMode==="qr" && <Image source={require("@/assets/images/check.png")} style={styles.check} />}
                    <Image source={require("@/assets/images/QR.png")} style={styles.pic} />
                    <Text className="text-base mx-auto">QR</Text>
                </View>
            </Pressable>

            <Pressable
            className="w-1/2 p-1"
            onPress={()=>{
                setSelectedMode("nfc");
            }}>
                <View className={selectedMode === "nfc"
                    ? "w-full h-44 bg-custom-primary rounded-2xl py-1 px-2 shadow border-2 border-custom-secondary"
                    : "w-full h-44 bg-custom-primary rounded-2xl py-1 px-2 shadow"}>
                    {selectedMode==="nfc" && <Image source={require("@/assets/images/check.png")} style={styles.check} />}
                    <Image source={require("@/assets/images/nfc.png")} style={styles.pic} />
                    <Text className="text-base mx-auto">NFC</Text>
                </View>
            </Pressable>

            <Pressable
            className="w-1/2 p-1"
            onPress={()=>{
                setSelectedMode("bluetooth");
            }}>
                <View className={selectedMode === "bluetooth"
                    ? "w-full h-44 bg-custom-primary rounded-2xl py-1 px-2 shadow border-2 border-custom-secondary"
                    : "w-full h-44 bg-custom-primary rounded-2xl py-1 px-2 shadow"}>
                    {selectedMode==="bluetooth" && <Image source={require("@/assets/images/check.png")} style={styles.check} />}
                    <Image source={require("@/assets/images/bluetooth-100.png")} style={styles.pic} />
                    <Text className="text-base mx-auto">Bluetooth</Text>
                </View>
            </Pressable>

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

            <Pressable
            className="w-full h-16 bg-custom-secondary mt-4 rounded-lg"
            onPress={()=>{
                if (selectedMode === "qr") {
                    router.push("/(scanner)/CameraHome")
                }
                else{
                    router.push({pathname:"/(screens)/ChosenSignUpMethodScreen",params:{mode: selectedMode, isGps: isEnabled ? "true" : "false"}})
                }
            }}>
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
    check: {
        height: 30,
        width: 30,
        top:5,
        left:5,
        margin: "auto",
        position:"absolute"
    },

});