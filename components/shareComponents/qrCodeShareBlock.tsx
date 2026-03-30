import { Catalog, Event } from "@/interfaces/types";
import { getEvents, getSelectedEvent, getSharedCatalog, storageURL, } from "@/redux/applicationSlice";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function QrCodeShareBlock(){
    const events = useSelector(getEvents);
    const event_id = useSelector(getSelectedEvent);
    const sharedCatalog_id = useSelector(getSharedCatalog);
    const event = events.find((event:Event)=>event.id===event_id);
    const catalog = event.catalogs.find((catalog:Catalog)=>catalog.id===sharedCatalog_id);
    return(
        <View className="mx-auto bg-custom-primary mt-20 p-5 rounded-2xl shadow">
            <Text className="text-lg mb-1">Kód:</Text> 
            <Image source={storageURL+"/"+catalog.qrFileName} style={styles.qr}></Image>
        </View>
    )
}

const styles = StyleSheet.create({
  qr: {
    height: 200,
    width: 200,
    bottom: 0,
    left: 0,
    margin:"auto"
  },
});