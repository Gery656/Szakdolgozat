import EventList from "@/components/forms/eventList";
import BluetoothDeviceButton from "@/components/ui/bluetoothDeviceButton";
import EditButton from "@/components/ui/editButton";
import NewButton from "@/components/ui/newButton";
import PadElement from "@/components/ui/padElement";
import PageTitle from "@/components/ui/pageTitle";
import SeparatingLine from "@/components/ui/separatingLine";
import { getUser, setSelectedCatalog, setSelectedEvent } from "@/redux/applicationSlice";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function MyEvents() {
    const dispatch = useDispatch();

    useFocusEffect(useCallback(() => {
        dispatch(setSelectedEvent(null));
        dispatch(setSelectedCatalog(null));
    }, []));

    const user = useSelector(getUser);

    return (
        <ScrollView className="min-w-full min-h-full">

            <PageTitle title="Eseményeim" backButton={false} isSettings={true}></PageTitle>
            <View className="w-11/12 mx-auto flex flex-row flex-wrap gap-2 mt-3">
                <BluetoothDeviceButton title="Bluetooth"></BluetoothDeviceButton>
                <EditButton title="Szerkesztés" destination={"/NewEventScreen"}></EditButton>
                <NewButton title="Új" destination={'/NewEventScreen'}></NewButton>
            </View>

            <SeparatingLine />

            <EventList />

            <PadElement />

        </ScrollView>
    )
}