import { router, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function RegisterLoginSwitch(){
    const currentRoute = usePathname();
    const [isRegisterPage, setIsStartPage] = useState(true);

    useEffect(()=>{
        if (currentRoute==="/register") {
            setIsStartPage(true);
        }
        else{
            if (currentRoute === "/login") {
                setIsStartPage(false);
            }
        }
    })
    

    return(currentRoute !== "/" &&
        <View className="absolute bottom-0 bg-custom-background border-t-2 border-custom-secondary">
            <View className="w-full h-16 mx-auto flex flex-row ios:mb-10 android:mb-16">
                <View className="h-full w-1/2 p-2">
                        <Pressable
                            className={isRegisterPage ? "w-full h-full bg-custom-primary rounded-xl border-2 border-custom-secondary" : "w-full h-full bg-custom-primary rounded-xl"}
                            onPress={() => {
                                if (router.canDismiss()) {
                                    router.dismissAll();
                                }
                                router.dismissTo('/register')
                            }
                            }
                        >
                            <Text className="m-auto text-lg">Regisztráció</Text>
                        </Pressable>
            
                </View>
                <View className="h-full w-1/2 p-2">
                        <Pressable
                            className={!isRegisterPage ? "w-full h-full bg-custom-primary rounded-xl border-2 border-custom-secondary" : "w-full h-full bg-custom-primary rounded-xl"}
                            onPress={() => {
                                if (router.canDismiss()) {
                                    router.dismissAll();
                                }
                                router.dismissTo('/login')
                            }
                            }
                            >
                            <Text className="m-auto text-lg">Bejelentkezés</Text>
                        </Pressable>
                </View>
            </View>
        </View>
    );
}