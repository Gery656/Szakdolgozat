import AddUserToACatalogForm from "@/components/forms/addUserToACatalogForm";
import UserList from "@/components/lists/userList";
import CatalogInfo from "@/components/ui/catalogInfo";
import EditButton from "@/components/ui/editButton";
import MissingButton from "@/components/ui/missingButton";
import PadElement from "@/components/ui/padElement";
import PageTitle from "@/components/ui/pageTitle";
import SeparatingLine from "@/components/ui/separatingLine";
import ShareButton from "@/components/ui/shareButton";
import { Catalog, Event } from "@/interfaces/types";
import { apiURL, getEvents, getSelectedCatalog, getSelectedEvent, getToken, setEvents, setUser } from "@/redux/applicationSlice";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function ChosenCatalogScreen() {
    const event_id = useSelector(getSelectedEvent);
    const catalog_id = useSelector(getSelectedCatalog);
    const events = useSelector(getEvents);
    const event = events.find((event: Event) => event.id === event_id);
    const catalog = event.catalogs.find((catalog: Catalog) => catalog.id === catalog_id);

    const [refreshing, setRefreshing] = useState(false);
    const token = useSelector(getToken);
    const dispatch = useDispatch();

    const onRefresh = React.useCallback(async() => {
        setRefreshing(true);
        const response = await fetch(apiURL + "/resources", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                if (router.canDismiss()) {
                    router.dismissAll()
                }
                router.dismissTo('/');
            }

            setRefreshing(false);
            return;
        }

        const recievedData = await response.json();
        dispatch(setUser(recievedData.user));
        dispatch(setEvents(recievedData.events));
        setRefreshing(false);
    }, []);

    return (
        <SafeAreaView>
            <ScrollView className="min-w-full min-h-full"
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <PageTitle title={event.name} backButton={true} lowerTopMargin></PageTitle>
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

                <CatalogInfo />
                
                <View className="w-11/12 mx-auto felx flex-row gap-2 mt-3 flex-wrap">
                    <ShareButton title="Megnyitás"></ShareButton>
                    <EditButton title="Szerkesztés" destination={"/UpdateCatalogScreen"}></EditButton>
                    <MissingButton title="Hiányzók" destination={"/MissingUsersScreen"}></MissingButton>
                </View>
                <SeparatingLine />
                <AddUserToACatalogForm />
                <UserList />
                <PadElement />
            </ScrollView>
        </SafeAreaView>
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