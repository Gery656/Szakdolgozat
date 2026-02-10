import { Link } from 'expo-router';
import { Pressable, Text, View } from "react-native";
function SecureStorageControl() {

    return(
        <View className="bg-blue-950 rounded-3xl w-11/12 m-auto mt-10">
            
            <Link href={'/SecureStorageHome'} asChild>
                <Pressable className='mx-auto my-5 border-red-500 border p-3 rounded-lg bg-blue-900'>
                    <Text className='text-white'>Storage</Text>
                </Pressable>
            </Link>
        </View>
    );
}

export default SecureStorageControl;