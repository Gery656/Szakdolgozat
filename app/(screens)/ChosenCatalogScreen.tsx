import AddUserToACatalogForm from "@/components/forms/addUserToACatalogForm";
import UserList from "@/components/forms/userList";
import PadElement from "@/components/ui/padElement";
import PageTitle from "@/components/ui/pageTitle";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ChosenCatalogScreen() {
    const { event_id, catalog_id } = useLocalSearchParams();
    return (
        <ScrollView className="min-w-full min-h-full">

            <PageTitle title={event_id + ". Példa esemény"} backButton={true}></PageTitle>


            <View className="w-11/12 mx-auto felx flex-row mt-3 justify-between">
                <View className="bg-custom-primary w-9/12 rounded-2xl shadow p-2">
                    <Text>{catalog_id + ". ellenőrzés"}</Text>
                </View>
                <View className="bg-custom-primary rounded-2xl shadow p-2">
                    <View className="flex flex-row gap-2 m-auto">
                        <View>
                            <Image source={require("@/assets/images/person.png")} style={styles.personIcon} />
                        </View>
                        <Text className="my-auto">{Math.floor(Math.random() * 100)}</Text>
                    </View>
                </View>
            </View>

            <AddUserToACatalogForm />

            <UserList />

            <PadElement />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    personIcon: {
        height: 13,
        width: 13,
        bottom: 0,
        left: 0,
        margin: "auto"
    },
});