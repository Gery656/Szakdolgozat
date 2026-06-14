import LogoutButton from "@/components/ui/logoutButton";
import PageTitle from "@/components/ui/pageTitle";
import { getUser } from "@/redux/applicationSlice";
import { Linking, ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function Profile(){
    const user = useSelector(getUser);
    return(
        <SafeAreaView className="min-w-full min-h-full">
            <ScrollView className="min-w-full min-h-full bg-custom-background">
                <PageTitle title="Profil" backButton={true} lowerTopMargin></PageTitle>
                <Text className="mx-auto text-2xl mt-32">{user.name}</Text>
                <Text className="mx-auto text-2xl mt-2">{user.email}</Text>
                <Text className="mx-auto text-2xl mt-2">{user.identifier}</Text>
                <LogoutButton></LogoutButton>
                <TouchableOpacity
                    onPress={()=>{Linking.openURL('https://icons8.com/')}}
                    className="mx-auto mt-20">
                    <Text className="underline text-blue-600">Minden ikon az Icon8-tól származik</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}