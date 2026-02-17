import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface RegisterLoginProp{
    isRegisterPage:boolean
}

export default function RegisterLoginSwitch({isRegisterPage}:RegisterLoginProp){

    

    return(
        <View className="w-full h-16 mx-auto absolute bottom-0 flex flex-row ios:mb-10 android:mb-16">
            <View className="h-full w-1/2 p-2">

                <Link href={'/'} asChild>
                    <Pressable className={isRegisterPage ? "w-full h-full bg-custom-primary rounded-xl border-2 border-custom-secondary" : "w-full h-full bg-custom-primary rounded-xl"}>
                        <Text className="m-auto text-lg">Regisztráció</Text>
                    </Pressable>
                </Link>
            
            </View>
            <View className="h-full w-1/2 p-2">

                <Link href={'/login'} asChild>
                    <Pressable className={!isRegisterPage ? "w-full h-full bg-custom-primary rounded-xl border-2 border-custom-secondary" : "w-full h-full bg-custom-primary rounded-xl"}>
                        <Text className="m-auto text-lg">Bejelentkezés</Text>
                    </Pressable>
                </Link>

            </View>
        </View>
    );
}