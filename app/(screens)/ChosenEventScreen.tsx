import CatalogList from "@/components/lists/catalogList";
import EditButton from "@/components/ui/editButton";
import MandatoryParticipantsButton from "@/components/ui/mandatoryParticipantsButton";
import NewButton from "@/components/ui/newButton";
import PadElement from "@/components/ui/padElement";
import PageTitle from "@/components/ui/pageTitle";
import SeparatingLine from "@/components/ui/separatingLine";
import TextBubble from "@/components/ui/textBubble";
import { Event } from "@/interfaces/types";
import { getEvents, getSelectedEvent, setSelectedCatalog } from "@/redux/applicationSlice";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ChosenEventScreen(){
    const event_id = useSelector(getSelectedEvent);
    const events = useSelector(getEvents);
    const event = events.find((event:Event)=>event.id===event_id);
    const dispatch = useDispatch();

    useFocusEffect(useCallback(() => {
        dispatch(setSelectedCatalog(null));
    }, []));

    return(
        <ScrollView className="min-w-full min-h-full">
            
            <PageTitle title={event.name} backButton={true}></PageTitle>

            <TextBubble text={event.description}/>

            <View className="w-11/12 mx-auto felx flex-row flex-wrap gap-2 mt-3">
                <EditButton title="Szerkesztés" destination={"/(screens)/NewCatalogScreen"}></EditButton>
                <MandatoryParticipantsButton title="Résztvevők" destination={"/MandatoryUsersScreen"}></MandatoryParticipantsButton>
                <NewButton title="Új" destination={"/(screens)/NewCatalogScreen"}></NewButton>
            </View>

            <SeparatingLine/>

            <CatalogList/>

            <PadElement/>

        </ScrollView>
    )
}