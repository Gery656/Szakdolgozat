import { Catalog, Event } from "@/interfaces/types";
import { getEvents, getSelectedCatalog, getSelectedEvent } from "@/redux/applicationSlice";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function CatalogInfo(){
    const events = useSelector(getEvents);
    const event_id = useSelector(getSelectedEvent);
    const catalog_id = useSelector(getSelectedCatalog);

    const event = events.find((event:Event)=>event.id===event_id);
    const catalog:Catalog = event.catalogs.find((catalog:Catalog)=>catalog.id===catalog_id);

    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const startDate = new Date(catalog.created_at);
    return(
        <View className="bg-custom-primary w-11/12 mx-auto mt-3 rounded-2xl border border-custom-secondary">
            <Pressable className={isInfoOpen ? 
                            "py-2 px-4  flex flex-row justify-between border-b border-custom-secondary"
                            : "py-2 px-4 flex flex-row justify-between" 
                            }
                            onPress={()=>{setIsInfoOpen(!isInfoOpen)}}>
                <Text className="">Információk</Text>
                {isInfoOpen ?
                    <Image source={require('@/assets/images/arrowUp.png')} style={styles.image}/>
                :   <Image source={require('@/assets/images/arrowDown.png')} style={styles.image}/>
                }
            </Pressable>
            {isInfoOpen &&
                        <View className='p-2'>
                <Text className="text-lg font-bold">Ellenőrzés típusa:</Text>
                <Text>{catalog.type === "code" ? "Kód" :
                        catalog.type === "bluetooth" ? "Bluetooth" :
                        catalog.type === "nfc" ? "NFC" :
                        catalog.type === "qr" ? "Qr" : ""  }</Text>

                <Text className="text-lg font-bold">Kezdet:</Text>
                <Text>{startDate.getFullYear() +". "+(startDate.getMonth()<10? "0":"")+startDate.getMonth()+". "+(startDate.getDate()<10? "0":"")+startDate.getDate()+"."}</Text>
                <Text>{(startDate.getHours()<10? "0":"")+startDate.getHours()+":"+(startDate.getMinutes()<10? "0":"")+startDate.getMinutes()+":"+(startDate.getSeconds()<10? "0":"")+startDate.getSeconds()}</Text>

                <Text className="text-lg font-bold">Hossza:</Text>
                <Text>{catalog.lengthInMin} perc</Text>

                <Text className="text-lg font-bold">Helyadatok ellenőrzése:</Text>
                <Text>{catalog.isGPSNeeded ? "Igen" : "Nem"}</Text>
                {catalog.isGPSNeeded == true &&
                <>
                    <Text className="text-lg font-bold">Ellenőrzés helye:</Text>
                    <Text>{catalog.latitude} magasság</Text>
                    <Text>{catalog.longitude} hosszúság</Text>
                </>
                }
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
  image: {
    height: 20,
    width: 20
  },
});