import { MandatoryCatalog } from "@/interfaces/types";
import { apiURL, getMandatoryCatalogs, getToken, setMandatoryCatalogs, setSignUpIsGpsNeeded, setSignUpMode } from "@/redux/applicationSlice";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function MandatoryCatalogsList() {
    const [isLoading, setIsLoading] = useState(true);
    const token = useSelector(getToken);
    const mandatoryCatalogs = useSelector(getMandatoryCatalogs);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getActiveMandatoryCatalogs() {
            const response = await fetch(apiURL + "/user/mandatory/catalogs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    if (router.canDismiss()) {
                        router.dismissAll()
                    }
                    router.dismissTo('/');
                }

                setIsLoading(false);
                return;
            }

            const recievedData = await response.json();
            dispatch(setMandatoryCatalogs(recievedData));
            setIsLoading(false);
        }

        getActiveMandatoryCatalogs();

        return (() => {
            dispatch(setMandatoryCatalogs([]))
        })

    }, []);

    function OnPress(method: string, isGps: boolean) {
        dispatch(setSignUpMode(method));
        dispatch(setSignUpIsGpsNeeded(isGps));

        if (method === "qr") {
            router.push("/(scanner)/CameraHome");
        }
        else {
            if (method === "nfc") {
                router.push("/(scanner)/scan");
            }
            else {
                router.push({ pathname: "/(screens)/ChosenSignUpMethodScreen", params: { mode: method, isGps: isGps ? "true" : "false" } })
            }
        }
    }

    return (isLoading ?
        <View className="w-full mt-10">
            <ActivityIndicator className="m-auto" size={"large"} color={"black"}></ActivityIndicator>
        </View>
        :
        <View className="w-11/12 mx-auto">
            {mandatoryCatalogs.map((catalog: MandatoryCatalog, i: number) => {
                var endDate = new Date(catalog.created_at);
                endDate.setHours(endDate.getHours(), endDate.getMinutes() + catalog.lengthInMin, 0, 0);

                return (
                    <Pressable key={i} className="my-2"
                        onPress={()=>{OnPress(catalog.type,catalog.isGPSNeeded)}}>
                        <View className="w-full flex flex-row bg-custom-primary rounded-2xl shadow p-2">
                            <View className="w-5/6">
                                <View className="my-auto w-full h-fit">
                                    <Text className="text-xl">{catalog.name}</Text>
                                    <View className="flex flex-row w-full">
                                        <View>
                                            <Text className="mx-auto">Határidő: {endDate.getHours() + ":" + (endDate.getMinutes() < 10 ? "0" : "") + endDate.getMinutes()}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View className="w-1/6">
                                <Image source={require("@/assets/images/rightArrow.png")} style={styles.image} />
                            </View>
                        </View>
                    </Pressable>
                )

            })}
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
    personIcon: {
        height: 13,
        width: 13,
        bottom: 0,
        left: 0,
        margin: "auto"
    },
});