import { apiURL, getSelectedEvent, getToken, setEvents, setUser } from "@/redux/applicationSlice";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface MandatoryUserRecordProp {
    name: string
    email: string
    identifier?: string
    isColored: boolean
}

export default function MandatoryUserRecord({ name, email, identifier, isColored }: MandatoryUserRecordProp) {

    const event_id = useSelector(getSelectedEvent);
    const token = useSelector(getToken);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    async function removeUserOnPress() {
        setIsLoading(true);

        const response = await fetch(apiURL + "/events/"+event_id+"/mandatory", {
            method: "DELETE",
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
            <View className="w-3/4">
                <Text className="text-lg">{name}</Text>
                <Text>{email}</Text>
                {identifier && <Text>{identifier}</Text>}
            </View>
            <TouchableOpacity className="w-1/4" onPress={removeUserOnPress}>
                {isLoading ?
                    <ActivityIndicator className="m-auto" color={"black"} size={"small"}></ActivityIndicator>
                    :
                    <Image source={require('@/assets/images/X.png')} style={styles.image} />
                }
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 20,
        width: 20,
        bottom: 0,
        left: 0,
        margin: "auto",
    },
});