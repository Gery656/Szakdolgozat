import { Pressable, Text, TextInput, View } from "react-native";

export default function RegisterForm(){
    return(
        <View className="bg-[#F2EAD3] mt-10 w-11/12 py-3 px-3 rounded-2xl mx-auto grid grid-flow-row">
            <Text className="text-lg">Név</Text>
            <TextInput className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background"/>

            <Text className="text-lg mt-2">Email</Text>
            <TextInput className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background"/>

            <Text className="text-lg mt-2">Jelszó</Text>
            <TextInput className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background"/>

            <Text className="text-lg mt-2">Jelszó megismétlése</Text>
            <TextInput className="border border-custom-secondary rounded-lg text-black text-lg h-12 bg-custom-background"/>

            <Pressable className="w-full h-16 bg-custom-secondary mt-10 rounded-lg">
                <Text className="text-[#F5F5F5] m-auto">Regisztráció</Text>
            </Pressable>
        </View>
    )
}