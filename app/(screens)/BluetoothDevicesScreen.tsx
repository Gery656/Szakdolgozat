import BluetoothDeviceList from "@/components/bluetoothDeviceList";
import PageTitle from "@/components/pageTitle";
import StartSignUpSwitch from "@/components/startSignUpSwitch";
import { View } from "react-native";

export default function NewEventScreen()
{
    return(
        <>
        <View className="min-w-full min-h-full">
            
            <PageTitle title="Bluetooth eszközök" backButton={true}></PageTitle>

            <BluetoothDeviceList />

        </View>
        
        <StartSignUpSwitch isStartPage={true}></StartSignUpSwitch>
        </>
    )
}