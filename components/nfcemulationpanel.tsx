import { Image } from "expo-image";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { HCESessionContext, NFCTagType4, NFCTagType4NDEFContentType } from "react-native-hce";

export function NfcEmulationPanel() {
    const [canEmulate, setCanEmulate] = useState(true);

    const { session } = useContext(HCESessionContext);

    const startSession = async () => {
        const tag = new NFCTagType4({
            type: NFCTagType4NDEFContentType.Text,
            content: 'Hello world123123',
            writable: false,
        });


        session.setApplication(tag);
        try {
            await session.setEnabled(true);
        } catch (error) {
             if (error instanceof Error) {
                console.log('An NFC error occurred:', error.message);
            } else {
                console.log('An NFC error occurred');
            }
        }
    };

    const stopSession = async () => {
        await session.setEnabled(false);
    };

    useEffect(()=>{
        startSession();
        setCanEmulate(false);

        return ()=>{stopSession();setCanEmulate(true);};
    })

    return (
            <View className="mx-auto mt-32">
                <Image source={require("@/assets/images/nfc-tag.png")} style={styles.nfcScanIcon} />
            </View>
    )
}

const styles = StyleSheet.create({
    nfcScanIcon: {
        height: 100,
        width: 100,
        bottom: 0,
        left: 0,
        margin: "auto"
    }

});