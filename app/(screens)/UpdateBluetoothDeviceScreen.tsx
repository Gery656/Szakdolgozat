import UpdateBluetoothDeviceForm from "@/components/forms/updateBluetoothDeviceForm";
import PageTitle from "@/components/ui/pageTitle";
import { BluetoothDevice } from "@/interfaces/types";
import { getSelectedBluetoothDevice, getUser } from "@/redux/applicationSlice";
import { View } from "react-native";
import { useSelector } from "react-redux";

export default function UpdateBluetoothDeviceScreen()
{
    const device_id = useSelector(getSelectedBluetoothDevice);
    const user = useSelector(getUser);
    const device = user.bluetooth_devices.find((bleDevice : BluetoothDevice) => bleDevice.id === device_id);

    return(
        <View className="min-w-full min-h-full">
            
            <PageTitle title={device.deviceName} backButton={true}></PageTitle>

            <UpdateBluetoothDeviceForm />


        </View>
    )
}