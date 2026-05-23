/* eslint-disable no-bitwise */

import * as ExpoDevice from "expo-device";
import { router } from "expo-router";
import { RefObject, useMemo, useRef } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";

interface BluetoothLowEnergyApi{
    requestPermissions():Promise<boolean>;
    scanForPeripherals():void;
    allDevices:RefObject<Device[]>;
    stopScanForPeripherals():void;
}

function useBLE(): BluetoothLowEnergyApi{
    const bleManager = useMemo(() => new BleManager(),[]);
    const allDevices= useRef<Device[]>([]);

    const requestAndroid31Permissions= async() => {
        const bluetoothScanPermissions = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        );

        const bluetoothConnectPermissions = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        );

        const bluetoothFineLocationPermissions = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
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

                return (granted === PermissionsAndroid.RESULTS.GRANTED) && await bleManager.state() === "PoweredOn";
            } else{
                const isAndroid31PermissionGranted = await requestAndroid31Permissions();

                return isAndroid31PermissionGranted && await bleManager.state() === "PoweredOn";
            }
        }else {
            
            return await bleManager.state() === "PoweredOn";
        }
    };
    
    const isDuplicateDevice = (devices:Device[], nextDevice:Device) =>
        devices.findIndex((device)=>nextDevice.id === device.id) > -1;

    const scanForPeripherals = () => {
        bleManager.startDeviceScan(null,null,(error,device) =>{
            if (error) {
                Alert.alert("Bluetooth hiba","Kérjük kapcsolja be vagy engedélyezze a bluetooth használatát a beállításokban és próbálkozzon újra.")
                console.log(error);
                if (router.canGoBack()) {
                    router.back();
                }
            }

            if (device) {
                if (!isDuplicateDevice(allDevices.current,device)) {
                    allDevices.current.push(device);
                }
            }
        })
    };

    const stopScanForPeripherals = () => {
        bleManager.stopDeviceScan();
    };
    
    return {
        scanForPeripherals,
        requestPermissions,
        allDevices,
        stopScanForPeripherals
    }
}

export default useBLE;