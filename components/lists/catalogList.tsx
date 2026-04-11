import { Catalog, Event } from "@/interfaces/types";
import { getEvents, getSelectedEvent, setSelectedCatalog } from "@/redux/applicationSlice";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function CatalogList(){

    const events = useSelector(getEvents);
    const event_id = useSelector(getSelectedEvent);
    const event = events.find((event:Event)=>event.id===event_id);

    const dispatch = useDispatch();

        return(
            <View className="w-11/12 mx-auto">
    
    
            {event.catalogs.map((catalog:Catalog,i:number) =>{
                const date = new Date(catalog.created_at);
                return(
                    <Pressable key={i} className="my-2"
                    onPress={()=>{
                        dispatch(setSelectedCatalog(catalog.id));
                        router.push("/(screens)/ChosenCatalogScreen");
                    }}>
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
                                            <Text className="mx-auto">{date.getFullYear() +". "+(date.getMonth()+1<10? "0":"")+(date.getMonth()+1)+". "+(date.getDate()<10? "0":"")+date.getDate()+"."}</Text>
                                            <Text className="mx-auto">{(date.getHours()<10? "0":"")+date.getHours()+":"+(date.getMinutes()<10? "0":"")+date.getMinutes()+":"+(date.getSeconds()<10? "0":"")+date.getSeconds()}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View className="w-1/6">
                                <Image source={require("@/assets/images/rightArrow.png")} style={styles.image}/>
                            </View>
                        </View>
                    </Pressable>
                )}
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