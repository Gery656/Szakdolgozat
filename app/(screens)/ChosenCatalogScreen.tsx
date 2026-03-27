import AddUserToACatalogForm from "@/components/forms/addUserToACatalogForm";
import UserList from "@/components/forms/userList";
import PadElement from "@/components/ui/padElement";
import PageTitle from "@/components/ui/pageTitle";
import { Catalog, Event } from "@/interfaces/types";
import { getEvents, getSelectedCatalog, getSelectedEvent } from "@/redux/applicationSlice";
import { Image } from "expo-image";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function ChosenCatalogScreen() {
    const event_id = useSelector(getSelectedEvent);
    const catalog_id = useSelector(getSelectedCatalog);
    const events = useSelector(getEvents);
    const event = events.find((event:Event)=>event.id===event_id);
    const catalog = event.catalogs.find((catalog:Catalog)=>catalog.id===catalog_id);
    
    return (
        <ScrollView className="min-w-full min-h-full">

            <PageTitle title={event.name} backButton={true}></PageTitle>


            <View className="w-11/12 mx-auto felx flex-row mt-3 justify-between">
                <View className="bg-custom-primary w-9/12 rounded-2xl shadow p-2">
                    <Text>{catalog.name}</Text>
                </View>
                <View className="bg-custom-primary rounded-2xl shadow p-2">
                    <View className="flex flex-row gap-2 m-auto">
                        <View>
                            <Image source={require("@/assets/images/person.png")} style={styles.personIcon} />
                        </View>
                        <Text className="my-auto">{catalog.signedUp.length}</Text>
                    </View>
                </View>
            </View>

            <AddUserToACatalogForm />

            <UserList/>

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