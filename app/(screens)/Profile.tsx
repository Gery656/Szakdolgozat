import LogoutButton from "@/components/ui/logoutButton";
import PageTitle from "@/components/ui/pageTitle";
import { getUser } from "@/redux/applicationSlice";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Profile(){
    const user = useSelector(getUser);
    return(
        <View className="min-w-full min-h-full">
            <PageTitle title="Profil" backButton={true}></PageTitle>
            <Text className="mx-auto text-2xl mt-10">{user.name}</Text>
            <Text className="mx-auto text-2xl mt-2">{user.email}</Text>
            <Text className="mx-auto text-2xl mt-2">{user.identifier}</Text>
            <LogoutButton></LogoutButton>
        </View>
    )
}