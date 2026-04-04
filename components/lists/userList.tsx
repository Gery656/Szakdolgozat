import { Catalog, Event, SignedUpUser } from "@/interfaces/types";
import { getEvents, getSelectedCatalog, getSelectedEvent } from "@/redux/applicationSlice";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function UserList() {
    const events = useSelector(getEvents);
    const event_id = useSelector(getSelectedEvent);
    const catalog_id = useSelector(getSelectedCatalog);

    const event = events.find((event:Event)=>event.id===event_id);
    const catalog = event.catalogs.find((catalog:Catalog)=>catalog.id===catalog_id);
    return (
        <View className="w-full mt-5">
            {catalog.signedUp.map((user:SignedUpUser, i:number) =>
                <View key={i} className={i%2===0? "w-full flex flex-row px-2 bg-custom-primary py-1" : "w-full flex flex-row px-2 py-1"}>
                    <View className="w-1/2">
                        <Text className="text-lg">{user.name}</Text>
                        <Text>{user.email}</Text>
                        <Text>{user.identifier}</Text>
                    </View>
                    <View className="w-1/2">
                        <Text className="m-auto text-lg">{user.time}</Text>{/**2025.12.25. - 13:29 */}
                    </View>

                </View>
            )}
        </View>
    )
}