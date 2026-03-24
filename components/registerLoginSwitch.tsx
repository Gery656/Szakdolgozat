import { Link, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function RegisterLoginSwitch(){
    const currentRoute = usePathname();
    const [isRegisterPage, setIsStartPage] = useState(true);

    useEffect(()=>{
        if (currentRoute.includes("index")) {
            setIsStartPage(true);
        }
        else{
            if (currentRoute.includes("login")) {
                setIsStartPage(false);
            }
        }
    })
    

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