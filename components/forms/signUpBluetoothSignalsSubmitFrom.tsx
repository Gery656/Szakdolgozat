import useBLE from "@/hooks/useBLE";
import { router } from "expo-router";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

export default function SignUpBluetoothSignalsSubmitForm(){

  const {requestPermissions} = useBLE();
const evaluatePermissions = async () => {
    const isPermissionEnabled = await requestPermissions();
    if (isPermissionEnabled) {
      router.push('/(scanner)/BleHome');
    }
    else{
        Alert.alert('Hiányzó engedélyek vannak.')
    }
  };
    return(
        <View className="bg-custom-primary mt-32 w-11/12 py-3 px-3 rounded-2xl mx-auto grid grid-flow-row">

            <Text className="text-lg">Forrás jeligéje:</Text>
            <TextInput className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background" />

            <Pressable
             className="w-full h-16 bg-custom-secondary mt-10 rounded-lg"
             onPress={evaluatePermissions}>
                <Text className="text-[#F5F5F5] m-auto">Jelentkezés</Text>
            </Pressable>
        </View>
    )
}