import EventList from "@/components/forms/eventList";
import BluetoothDeviceButton from "@/components/ui/bluetoothDeviceButton";
import NewButton from "@/components/ui/newButton";
import PadElement from "@/components/ui/padElement";
import PageTitle from "@/components/ui/pageTitle";
import SeparatingLine from "@/components/ui/separatingLine";
import { getEvents, getUser } from "@/redux/applicationSlice";
import { ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function MyEvents()
{
    const userInfo = useSelector(getUser);
    const events = useSelector(getEvents);
    console.log(userInfo)
    console.log(events)

    return(
        <ScrollView className="min-w-full min-h-full">
            
            <PageTitle title="Eseményeim" backButton={false}></PageTitle>
            <Text>{JSON.stringify(userInfo)}</Text>
            <Text>{JSON.stringify(events)}</Text>

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