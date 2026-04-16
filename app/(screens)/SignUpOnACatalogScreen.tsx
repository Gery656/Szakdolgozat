import MandatoryCatalogsList from "@/components/lists/mandatoryCatalogsList";
import PageTitle from "@/components/ui/pageTitle";
import { apiURL, getToken, setMandatoryCatalogs } from "@/redux/applicationSlice";
import { router } from "expo-router";
import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function SignUpOnACatalogScreen() {
    const [refreshing, setRefreshing] = useState(false);
    const token = useSelector(getToken);
    const dispatch = useDispatch();

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
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

            setRefreshing(false);
            return;
        }

        const recievedData = await response.json();
        dispatch(setMandatoryCatalogs(recievedData));
        setRefreshing(false);
    }, []);


    return (
        <SafeAreaView>
            <ScrollView className="min-w-full min-h-full"
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                    }>
                <PageTitle title="Aktív ellenőrzések" backButton={false} lowerTopMargin></PageTitle>
                <MandatoryCatalogsList />

                {/* <SignUpModeSelectForm /> */}
            </ScrollView>
        </SafeAreaView>
    )
}