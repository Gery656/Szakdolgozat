import { Event } from "@/interfaces/types";
import { getEvents, setSelectedEvent } from "@/redux/applicationSlice";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function EventList(){
    const events = useSelector(getEvents);
    const dispatch = useDispatch();
    return(
        <View className="w-11/12 mx-auto">

        {events.map((event : Event, i:number) =>

                <Pressable
                key={i}
                onPress={()=>{
                    dispatch(setSelectedEvent(event.id));
                    router.push("/(screens)/ChosenEventScreen");
                }}
                className="my-2">
                    <View className="w-full flex flex-row bg-custom-primary rounded-2xl shadow p-2">
                        <View className="w-5/6">
                            <View className="my-auto w-full h-fit">
                                <Text className="text-xl">{event.name}</Text>
                                <Text className="my-2">{(event.catalogs).length} db ellenőrzés történt</Text>
                                <Text>{event.description.split(' ').slice(0,10).join(' ')} ...</Text>
                            </View>
                        </View>
                        <View className="w-1/6">
                            <Image source={require("@/assets/images/rightArrow.png")} style={styles.image}/>
                        </View>
                    </View>
                </Pressable>
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
});