import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface RegisterLoginProp{
    isStartPage:boolean
}

export default function StartSignUpSwitch({isStartPage}:RegisterLoginProp){

    

    return(
        <View className="absolute bottom-0 bg-custom-background border-t-2 border-custom-secondary">
            <View className="w-full h-16 mx-auto flex flex-row ios:mb-10 android:mb-16">
                <View className="h-full w-1/2 p-2">
                        <Pressable
                        onPress={()=>{
                            if (router.canDismiss()) {
                                router.dismissAll();
                                router.replace('/(screens)/MyEvents')}}
                            }
                        className={isStartPage ? "w-full h-full bg-custom-primary rounded-xl border-2 border-custom-secondary" : "w-full h-full bg-custom-primary rounded-xl"}>
                            <Text className="m-auto text-lg">Ellenőrzés</Text>
                        </Pressable>
            
                </View>
                <View className="h-full w-1/2 p-2">
                        <Pressable className={!isStartPage ? "w-full h-full bg-custom-primary rounded-xl border-2 border-custom-secondary" : "w-full h-full bg-custom-primary rounded-xl"}>
                            <Text className="m-auto text-lg">Jelentkezés</Text>
                        </Pressable>
                </View>
            </View>
        </View>
    );
}