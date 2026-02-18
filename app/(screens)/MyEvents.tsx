import BluetoothDeviceButton from "@/components/bluetoothDeviceButton";
import EventList from "@/components/eventList";
import NewButton from "@/components/newButton";
import PadElement from "@/components/padElement";
import PageTitle from "@/components/pageTitle";
import SeparatingLine from "@/components/separatingLine";
import { ScrollView, View } from "react-native";

export default function MyEvents()
{
    return(
        <ScrollView className="min-w-full min-h-full">
            
            <PageTitle title="Eseményeim" backButton={false}></PageTitle>

            <View className="w-11/12 h-10 mx-auto felx flex-row gap-2 mt-3">
                <NewButton title="Új" destination={'/NewEventScreen'}></NewButton>
                <BluetoothDeviceButton title="Bluetooth"></BluetoothDeviceButton>
            </View>

            <SeparatingLine/>

            <EventList/>

            <PadElement/>

        </ScrollView>
    )
}