import BluetoothDeviceList from "@/components/lists/bluetoothDeviceList";
import NewBluetoothDeviceButton from "@/components/newBluetoothDeviceButton";
import PadElement from "@/components/ui/padElement";
import PageTitle from "@/components/ui/pageTitle";
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