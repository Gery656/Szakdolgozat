import { useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

export default function SignUpQrCodeSubmitForm() {
    const [permission, requestPermission] = useCameraPermissions();

    const isPermissionGranted = Boolean(permission?.granted);

    useEffect(() => {
        async function requestTheNeededPermissions() {
            await requestPermission();
        }

        if (!isPermissionGranted) {
            requestTheNeededPermissions();
        }else{
            router.push('/(scanner)/CameraHome');
        }

    });

    return (
        <View className="bg-custom-primary mt-32 w-11/12 py-3 px-3 rounded-2xl mx-auto grid grid-flow-row">

            <Text className="text-lg mx-auto">Kamera engedélyezése szükséges</Text>

            <Pressable onPress={requestPermission} className="w-full h-16 bg-custom-secondary mt-10 rounded-lg">
                <Text className="text-[#F5F5F5] m-auto">Újra</Text>
            </Pressable>
        </View>
    )
}