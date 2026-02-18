import BluetoothDeviceList from "@/components/bluetoothDeviceList";
import NewBluetoothDeviceButton from "@/components/newBluetoothDeviceButton";
import PadElement from "@/components/padElement";
import PageTitle from "@/components/pageTitle";
import { ScrollView } from "react-native";

export default function NewEventScreen()
{
    return(
        <ScrollView className="min-w-full min-h-full">
            
            <PageTitle title="Bluetooth eszközök" backButton={true}></PageTitle>

            <BluetoothDeviceList />

            <NewBluetoothDeviceButton/>

            <PadElement></PadElement>
        </ScrollView>
    )
}