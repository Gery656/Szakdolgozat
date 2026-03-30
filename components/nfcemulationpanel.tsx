import { Catalog, Event } from "@/interfaces/types";
import { getEvents, getSelectedEvent, getSharedCatalog } from "@/redux/applicationSlice";
import { Image } from "expo-image";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { HCESessionContext, NFCTagType4, NFCTagType4NDEFContentType } from "react-native-hce";
import { useSelector } from "react-redux";

export function NfcEmulationPanel() {
    const [canEmulate, setCanEmulate] = useState(true);
    const events = useSelector(getEvents);
    const event_id = useSelector(getSelectedEvent);
    const sharedCatalog_id = useSelector(getSharedCatalog);
    const event = events.find((event:Event)=>event.id===event_id);
    const catalog = event.catalogs.find((catalog:Catalog)=>catalog.id===sharedCatalog_id);

    const { session } = useContext(HCESessionContext);

    const startSession = async () => {
        const tag = new NFCTagType4({
            type: NFCTagType4NDEFContentType.Text,
            content: catalog.signUpCode,
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