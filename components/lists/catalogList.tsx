import { Catalog, Event } from "@/interfaces/types";
import { getEvents } from "@/redux/applicationSlice";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

interface CatalogListProps{
    event_id:string
}

export default function CatalogList({event_id}:CatalogListProps){

    const events = useSelector(getEvents);
    const event = events.find((event:Event)=>event.id.toString()===event_id);

        return(
            <View className="w-11/12 mx-auto">
    
    
            {event.catalogs.map((catalog:Catalog,i:number) =>{
                const date = new Date(catalog.created_at);
                return(<Link
                key={i}
                href={{pathname: "/(screens)/ChosenCatalogScreen", params:{event_id: event_id,catalog_id: catalog.id}}}
                asChild>
                    <Pressable className="my-2">
                        <View className="w-full flex flex-row bg-custom-primary rounded-2xl shadow p-2">
                            <View className="w-5/6">
                                <View className="my-auto w-full h-fit">
                                    <Text className="text-xl">{catalog.name}</Text>
                                    <View className="flex flex-row w-full">
                                        <View className="w-1/2 flex flex-row gap-2">
                                            <View>
                                                <Image source={require("@/assets/images/person.png")} style={styles.personIcon}/>
                                            </View>
                                            <Text className="my-auto">{catalog.signedUp.length}</Text>
                                        </View>
                                        <View className="w-1/2">
                                            <Text className="mx-auto">{date.getFullYear() +". "+date.getMonth()+". "+date.getDay()+"."}</Text>
                                            <Text className="mx-auto">{new Date(catalog.created_at).getTime()}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View className="w-1/6">
                                <Image source={require("@/assets/images/rightArrow.png")} style={styles.image}/>
                            </View>
                        </View>
                    </Pressable>
                </Link>)}
            )}
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
      personIcon: {
        height: 13,
        width: 13,
        bottom: 0,
        left: 0,
        margin:"auto"
      },
    });