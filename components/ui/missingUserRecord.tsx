import { apiURL, getSelectedCatalog, getSelectedEvent, getToken, setEvents, setUser } from "@/redux/applicationSlice"
import { Image } from "expo-image"
import { router } from "expo-router"
import { useState } from "react"
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

interface MissingUserRecordProp{
    name:string
    email:string
    identifier:string
    isColored:boolean
    isAddButtonShown:boolean
}

export default function MissingUserRecord({name,email,identifier,isColored,isAddButtonShown}:MissingUserRecordProp) {
    const event_id = useSelector(getSelectedEvent);
    const catalog_id = useSelector(getSelectedCatalog);
    const [isLoading,setIsLoading] = useState(false);
    const token = useSelector(getToken);
    const dispatch = useDispatch();

    async function addUserWithEmailOnPress(email:string) {
        setIsLoading(true);

        const response = await fetch(apiURL + "/events/" + event_id + "/catalogs/" + catalog_id + "/addUserViaEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                email: email
            })
        });

        const body = await response.json();

        if (!response.ok) {
            setIsLoading(false); 
            return;
        }

        const response2 = await fetch(apiURL + "/resources", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        });
        if (!response2.ok) {
            if (response2.status === 401) {
                if (router.canDismiss()) {
                    router.dismissAll()
                }
                router.dismissTo('/');
            }
            setIsLoading(false);
            return;
        }
        const recievedData = await response2.json();
        dispatch(setUser(recievedData.user));
        dispatch(setEvents(recievedData.events));

        setIsLoading(false);
    }

    return (
        <View className={isColored ? "w-full flex flex-row px-2 bg-custom-primary py-1" : "w-full flex flex-row px-2 py-1"}>
            <View className={isAddButtonShown ? "w-3/4" : "w-full"}>
                <Text className="text-lg">{name}</Text>
                <Text>{email}</Text>
                <Text>{identifier}</Text>
            </View>
            
            {isAddButtonShown && 
            isLoading ?
                <View className="w-1/4">
                    <ActivityIndicator className="m-auto" color={"black"} size={"small"}></ActivityIndicator>
                </View>
                :
                <TouchableOpacity className="w-1/4" onPress={() => { addUserWithEmailOnPress(email) }}>
                    <Image source={require('@/assets/images/plus-basic.png')} style={styles.image} />
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 23,
        width: 23,
        bottom: 0,
        left: 0,
        margin: "auto"
    },
});