import NewBluetoothDeviceForm from "@/components/forms/newBluetoothDeviceForm";
import PageTitle from "@/components/ui/pageTitle";
import { View } from "react-native";

export default function NewBluetoothDeviceScreen()
{
    return(
        <View className="min-w-full min-h-full">
            
            <PageTitle title="Új bluetooth eszköz" backButton={true}></PageTitle>

            <NewBluetoothDeviceForm />


        </View>
    )
}