import { apiURL, getToken } from "@/redux/applicationSlice";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function LogoutButton() {

    const token = useSelector(getToken);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    async function logout() {

        setIsLoading(true);

        const response = await fetch(apiURL + "/logout", {
            method: "DELETE",
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

        setIsLoading(false)

        if (router.canDismiss()) {
            router.dismissAll()
        }
        router.dismissTo('/');
    }

    return (isLoading ?
        <View className="w-11/12 m-auto h-16 bg-red-600 mt-10 rounded-lg">
            < ActivityIndicator className="m-auto" size={"small"} ></ActivityIndicator >
        </View >
        :
        <Pressable
            className="w-11/12 m-auto h-16 bg-red-600 mt-10 rounded-lg"
            onPress={logout}>
            <Text className="text-[#F5F5F5] m-auto">Kijelentkezés</Text>
        </Pressable>
    )
}