import { setAddMandatoryUserMethod } from "@/redux/applicationSlice";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

export default function AddMethodChoice(){
    const dispatch = useDispatch();

    function emailOnPress(){
        dispatch(setAddMandatoryUserMethod("email"));
        router.push("/AddMandatoryUsersScreen");
    }

    function identifierOnPress(){
        dispatch(setAddMandatoryUserMethod("identifier"));
        router.push("/AddMandatoryUsersScreen");
    }


    return (
    <View className="w-11/12 mx-auto border border-custom-secondary/20 rounded-2xl mt-5 ">
        <Text className="m-auto text-2xl my-2">Hozzáadás</Text>
        <View className="w-full flex flex-row">

            <View className="w-1/2 p-1">
                <TouchableOpacity className="border border-custom-secondary rounded-xl py-2"
                onPress={emailOnPress}>
                    <Image source={require('@/assets/images/email.png')} style={styles.image}/>
                    <Text className="text-lg mx-auto">Email</Text>
                </TouchableOpacity>
            </View>
            
            <View className="w-1/2 p-1">
                <TouchableOpacity className="border border-custom-secondary rounded-xl py-2"
                onPress={identifierOnPress}>
                    <Image source={require('@/assets/images/identifier.png')} style={styles.image}/>
                    <Text className="text-lg mx-auto">Azonosító</Text>
                </TouchableOpacity>
            </View>

        </View>
    </View>
    )
}

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    bottom: 0,
    left: 0,
    margin:"auto",
  },
});