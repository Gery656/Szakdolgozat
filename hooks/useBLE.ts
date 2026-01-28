/* eslint-disable no-bitwise */

import * as ExpoDevice from "expo-device";
import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";

interface BluetoothLowEnergyApi{
    requestPermissions():Promise<boolean>;
    scanForPeripherals():void;
}

function useBLE(): BluetoothLowEnergyApi{
    const bleManager = useMemo(() => new BleManager(),[]);
    const [allDevices,setAllDevices] = useState<Device[]>([]);

    const requestAndroid31Permissions= async() => {
        const bluetoothScanPermissions = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            {
                title: "Scan Permission",
                message: "App requires bluetooth scanning",
                buttonPositive:"OK"
            }
        );

        const bluetoothConnectPermissions = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            {
                title: "Connect Permission",
                message: "App requires bluetooth connecting",
                buttonPositive:"OK"
            }
        );

        const bluetoothFineLocationPermissions = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Fine Location",
                message: "App requires fine location",
                buttonPositive:"OK"
            }
        );
        return(
            bluetoothScanPermissions === "granted" &&
            bluetoothConnectPermissions === "granted" &&
            bluetoothFineLocationPermissions === "granted"
        )
    };

    const requestPermissions = async ()=>{
        if (Platform.OS === "android") {
            if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission",
                        message: "Bluetooth requires location",
                        buttonPositive:"OK"
                    }
                )

                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } else{
                const isAndroid31PermissionGranted = await requestAndroid31Permissions();

                return isAndroid31PermissionGranted;
            }
        }else {
            return true;
        }
    };
    
    const scanForPeripherals = () => {};

    return {
        scanForPeripherals,
        requestPermissions
    }
}

export default useBLE;