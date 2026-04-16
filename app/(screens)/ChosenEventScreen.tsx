import CatalogList from "@/components/lists/catalogList";
import EditButton from "@/components/ui/editButton";
import MandatoryParticipantsButton from "@/components/ui/mandatoryParticipantsButton";
import NewButton from "@/components/ui/newButton";
import PadElement from "@/components/ui/padElement";
import PageTitle from "@/components/ui/pageTitle";
import SeparatingLine from "@/components/ui/separatingLine";
import TextBubble from "@/components/ui/textBubble";
import { Event } from "@/interfaces/types";
import { apiURL, getEvents, getSelectedEvent, getToken, setEvents, setSelectedCatalog, setUser } from "@/redux/applicationSlice";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function ChosenEventScreen(){
    const event_id = useSelector(getSelectedEvent);
    const events = useSelector(getEvents);
    const event = events.find((event:Event)=>event.id===event_id);
    const dispatch = useDispatch();

    useFocusEffect(useCallback(() => {
        dispatch(setSelectedCatalog(null));
    }, []));

        const [refreshing, setRefreshing] = useState(false);
        const token = useSelector(getToken);
    
        const onRefresh = React.useCallback(async() => {
            setRefreshing(true);
            const response = await fetch(apiURL + "/resources", {
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
            dispatch(setUser(recievedData.user));
            dispatch(setEvents(recievedData.events));
            setRefreshing(false);
        }, []);

    return(
        <SafeAreaView>
            <ScrollView className="min-w-full min-h-full"
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            
                <PageTitle title={event.name} backButton={true} lowerTopMargin></PageTitle>
                <TextBubble text={event.description}/>
                <View className="w-11/12 mx-auto felx flex-row flex-wrap gap-2 mt-3">
                    <EditButton title="Szerkesztés" destination={"/UpdateEventScreen"}></EditButton>
                    <MandatoryParticipantsButton title="Résztvevők" destination={"/MandatoryUsersScreen"}></MandatoryParticipantsButton>
                    <NewButton title="Új" destination={"/(screens)/NewCatalogScreen"}></NewButton>
                </View>
                <SeparatingLine/>
                <CatalogList/>
                <PadElement/>
            </ScrollView>
        </SafeAreaView>
    )
}