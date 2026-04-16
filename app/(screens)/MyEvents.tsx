import EventList from "@/components/forms/eventList";
import BluetoothDeviceButton from "@/components/ui/bluetoothDeviceButton";
import NewButton from "@/components/ui/newButton";
import PadElement from "@/components/ui/padElement";
import PageTitle from "@/components/ui/pageTitle";
import SeparatingLine from "@/components/ui/separatingLine";
import { setSelectedCatalog, setSelectedEvent } from "@/redux/applicationSlice";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

export default function MyEvents() {
    const dispatch = useDispatch();

    useFocusEffect(useCallback(() => {
        dispatch(setSelectedEvent(null));
        dispatch(setSelectedCatalog(null));
    }, []));

    return (
        <SafeAreaView className="">
            <ScrollView className="min-w-full min-h-full bg-custom-background">
                <PageTitle title="Eseményeim" backButton={false} isSettings={true} lowerTopMargin></PageTitle>
                <View className="w-11/12 mx-auto flex flex-row flex-wrap gap-2 mt-3">
                    <NewButton title="Új" destination={'/NewEventScreen'}></NewButton>
                    <BluetoothDeviceButton title="Bluetooth"></BluetoothDeviceButton>
                </View>
                <SeparatingLine />
                <EventList />
                <PadElement />
            </ScrollView>
        </SafeAreaView>
    )
}