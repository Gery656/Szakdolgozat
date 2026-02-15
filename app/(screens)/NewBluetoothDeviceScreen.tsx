import NewBluetoothDeviceForm from "@/components/newBluetoothDeviceForm";
import PageTitle from "@/components/pageTitle";
import StartSignUpSwitch from "@/components/startSignUpSwitch";
import { View } from "react-native";

export default function NewBluetoothDeviceScreen()
{
    return(
        <>
        <View className="min-w-full min-h-full">
            
            <PageTitle title="Új bluetooth eszköz" backButton={true}></PageTitle>

            <NewBluetoothDeviceForm />


        </View>
        
        <StartSignUpSwitch isStartPage={true}></StartSignUpSwitch>
        </>
    )
}