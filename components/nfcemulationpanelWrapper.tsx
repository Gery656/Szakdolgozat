import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { HCESessionProvider } from "react-native-hce";
import nfcManager from "react-native-nfc-manager";
import { NfcEmulationPanel } from "./nfcemulationpanel";

export function NfcEmulationPanelWrapper() {
    const [isNfcEnabled, setIsNfcEnabled] = useState(false);

    useEffect(() => {
        async function isEnabled() {
            setIsNfcEnabled(await nfcManager.isEnabled());
        }

        isEnabled();
    })

    return (isNfcEnabled ?

        <HCESessionProvider>
            <NfcEmulationPanel>
            </NfcEmulationPanel>
        </HCESessionProvider>
        :
        <View className='w-11/12 mx-auto mt-32 bg-custom-primary rounded-xl p-4'>
            <View className='border-b'>
                <Text className='text-xl mx-auto'>Sikertelen megosztás</Text>
            </View>
            <View className='mt-4'>
                <Text className='mx-auto'>Nfc nincs bekapcsolva</Text>
            </View>
        </View>
    )
}