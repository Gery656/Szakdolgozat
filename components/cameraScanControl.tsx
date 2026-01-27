import { useCameraPermissions } from 'expo-camera';
import { Link } from 'expo-router';
import { Pressable, Text, View } from "react-native";

function CameraScanControl() {

    const [permission,requestPermission] = useCameraPermissions();

    const isPermissionGranted = Boolean(permission?.granted);

    return(
        <View className="bg-blue-950 rounded-3xl w-11/12 m-auto">
            <Pressable onPress={requestPermission} className='mx-auto mt-5 border-red-500 border p-3 rounded-lg bg-blue-900'>
                <Text className='text-white'>Engedély kérése</Text>
            </Pressable>
            <Link href={'/CameraHome'} asChild>
                <Pressable disabled={!isPermissionGranted} className='mx-auto my-5 border-red-500 border p-3 rounded-lg bg-blue-900'>
                    <Text className='text-white' style={[{opacity: !isPermissionGranted? 0.5 : 1}]}>Scan QR</Text>
                </Pressable>
            </Link>
        </View>
    );
}

export default CameraScanControl;