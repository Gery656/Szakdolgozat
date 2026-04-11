import { Catalog, Event, MandatoryUser, SignedUpUser } from "@/interfaces/types";
import { getEvents, getSelectedCatalog, getSelectedEvent } from "@/redux/applicationSlice";
import { Image } from "expo-image";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

export default function MissingUserList() {
    const events = useSelector(getEvents);
    const event_id = useSelector(getSelectedEvent);
    const catalog_id = useSelector(getSelectedCatalog);

    const event:Event = events.find((event: Event) => event.id === event_id);
    const catalog:Catalog|undefined = event.catalogs.find((catalog:Catalog)=>catalog.id===catalog_id);

    const missingUsers = event.mandatoryTo.filter((user:MandatoryUser)=>!catalog?.signedUp.find((signedUpUser:SignedUpUser)=>signedUpUser.email === user.email))

    return (
        <View className="w-full mt-5">

            {missingUsers.length !== 0 && 
            <View className="w-11/12 my-2 mx-auto flex flex-row flex-wrap gap-1">
                <Text className="text-xl font-bold">
                    {missingUsers.length}
                </Text>
                <Text className="text-lg">hiányzó van!</Text>
            </View>
            }

            {missingUsers.map((user: MandatoryUser, i: number) =>
                <View key={i} className={i%2===0 ? "w-full flex flex-row px-2 bg-custom-primary py-1" : "w-full flex flex-row px-2 py-1"}>
                    <View className="w-3/4">
                        <Text className="text-lg">{user.name}</Text>
                        <Text>{user.email}</Text>
                        <Text>{user.identifier}</Text>
                    </View>
                    <TouchableOpacity className="w-1/4" onPress={()=>{}}>
                        {false ?
                            <ActivityIndicator className="m-auto" color={"black"} size={"small"}></ActivityIndicator>
                            :
                            <Image source={require('@/assets/images/X.png')} style={styles.image} />
                        }
                    </TouchableOpacity>
                </View>
            )}
            {missingUsers.length === 0 && <Text className="mx-auto mt-5">Nincsenek hiányzók</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
  image: {
    height: 23,
    width: 23,
    bottom: 0,
    left: 0,
    margin:"auto"
  },
});