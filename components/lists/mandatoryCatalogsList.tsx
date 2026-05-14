import { MandatoryCatalog } from "@/interfaces/types";
import { apiURL, getMandatoryCatalogs, getToken, setDefaultBluetoothIdentifier, setMandatoryCatalogs, setSignUpIsGpsNeeded, setSignUpMode } from "@/redux/applicationSlice";
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

    function OnPress(method: string, isGps: boolean,BLEIdentifier:string|null) {
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
                dispatch(setDefaultBluetoothIdentifier(BLEIdentifier ?? ""))
                router.push("/(screens)/ChosenSignUpMethodScreen")
            }
        }
    }

    return (isLoading ?
        <View className="w-full mt-10">
            <ActivityIndicator className="m-auto" size={"large"} color={"black"}></ActivityIndicator>
        </View>
        :
        <View className="w-11/12 mx-auto">
            {mandatoryCatalogs.length == 0 && <Text className="mx-auto mt-10">Jelenleg nincs aktív ellenőrzés!</Text>}
            {mandatoryCatalogs.map((catalog: MandatoryCatalog, i: number) => {
                var endDate = new Date(catalog.created_at);
                endDate.setHours(endDate.getHours(), endDate.getMinutes() + catalog.lengthInMin, 0, 0);

                return (
                    <Pressable key={i} className="my-2"
                        onPress={()=>{OnPress(catalog.type,catalog.isGPSNeeded,catalog.BLEIdentifier)}}>
                        <View className="w-full flex flex-row bg-custom-primary rounded-2xl shadow p-2">
                            <View className="w-5/6">
                                <View className="my-auto w-full h-fit">
                                    <Text className="text-xl">{catalog.name}</Text>
                                    <View className="flex flex-row w-full">
                                        <View>
                                            <Text className="mx-auto">Határidő: {endDate.getHours() + ":" + (endDate.getMinutes() < 10 ? "0" : "") + endDate.getMinutes()}</Text>
                                        </View>
                                    </View>
                                    <View className="flex flex-row w-full">
                                        <View>
                                            {catalog.type==="code" ? 
                                                <Image source={require("@/assets/images/passcode.png")} style={styles.typeIcon} />
                                            : catalog.type==="qr" ?
                                                <Image source={require("@/assets/images/QR.png")} style={styles.typeIcon} />
                                            : catalog.type==="nfc" ?
                                                <Image source={require("@/assets/images/nfc.png")} style={styles.typeIcon} />
                                            : catalog.type==="bluetooth" ?
                                                <Image source={require("@/assets/images/bluetooth.png")} style={styles.typeIcon} />
                                            : <></>
                                            }
                                        </View>

                                        <View>
                                            {catalog.isGPSNeeded ?
                                                <Image source={require("@/assets/images/gps.png")} style={styles.typeIcon} />
                                                :
                                                <></>
                                            }
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
    typeIcon: {
        height: 20,
        width: 20,
        bottom: 0,
        left: 0,
        margin: "auto"
    },
});