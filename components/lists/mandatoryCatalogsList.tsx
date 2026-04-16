import { MandatoryCatalog } from "@/interfaces/types";
import { apiURL, getMandatoryCatalogs, getToken, setMandatoryCatalogs } from "@/redux/applicationSlice";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function MandatoryCatalogsList(){
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

        return(()=>{
            dispatch(setMandatoryCatalogs([]))
        })

    }, []);

    return(isLoading ?
                <View className="w-full mt-10">
                    <ActivityIndicator className="m-auto" size={"large"} color={"black"}></ActivityIndicator>
                </View>
                :
                <View className="w-11/12 mx-auto">
                    {mandatoryCatalogs.map((catalog: MandatoryCatalog, i:number) =>{
                        const date = new Date(catalog.created_at);

return(
                    <Pressable key={i} className="my-2"
                    onPress={()=>{}}>
                        <View className="w-full flex flex-row bg-custom-primary rounded-2xl shadow p-2">
                            <View className="w-5/6">
                                <View className="my-auto w-full h-fit">
                                    <Text className="text-xl">{catalog.name}</Text>
                                    <View className="flex flex-row w-full">
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