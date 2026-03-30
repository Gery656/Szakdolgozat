import { Catalog, Event } from "@/interfaces/types";
import { getEvents, getSelectedEvent, getSharedCatalog } from "@/redux/applicationSlice";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function CodeShareBlock(){
    const events = useSelector(getEvents);
    const event_id = useSelector(getSelectedEvent);
    const sharedCatalog_id = useSelector(getSharedCatalog);
    const event = events.find((event:Event)=>event.id === event_id);
    const catalog = event.catalogs.find((catalog:Catalog)=>catalog.id === sharedCatalog_id);
    return(
        <View className="w-8/12 mx-auto bg-custom-primary mt-20 p-5 rounded-2xl shadow">
            <Text className="text-lg">Kód:</Text>
            <Text className="text-5xl mx-auto">{catalog.signUpCode}</Text>
        </View>
    )
}