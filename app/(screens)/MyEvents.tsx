import EventList from "@/components/eventList";
import NewBluetoothDeviceButton from "@/components/newBluetoothDeviceButton";
import NewEventButton from "@/components/newEventButton";
import PadElement from "@/components/padElement";
import PageTitle from "@/components/pageTitle";
import SeparatingLine from "@/components/separatingLine";
import StartSignUpSwitch from "@/components/startSignUpSwitch";
import { ScrollView, View } from "react-native";

export default function MyEvents()
{
    return(
        <>
        <ScrollView className="min-w-full min-h-full">
            
            <PageTitle title="Eseményeim" backButton={false}></PageTitle>

            <View className="w-11/12 h-10 mx-auto felx flex-row gap-2 mt-3">
                <NewEventButton title="Új"></NewEventButton>
                <NewBluetoothDeviceButton title="Bluetooth"></NewBluetoothDeviceButton>
            </View>

            <SeparatingLine/>

            <EventList/>

            <PadElement/>

        </ScrollView>
        
        <StartSignUpSwitch isStartPage={true}></StartSignUpSwitch>
        </>
    )
}