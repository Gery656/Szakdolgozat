import CatalogList from "@/components/catalogList";
import NewButton from "@/components/newButton";
import PadElement from "@/components/padElement";
import PageTitle from "@/components/pageTitle";
import SeparatingLine from "@/components/separatingLine";
import TextBubble from "@/components/textBubble";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";

export default function ChosenEventScreen(){
    const {event_id} = useLocalSearchParams();
    return(
        <ScrollView className="min-w-full min-h-full">
            
            <PageTitle title={event_id+". Példa esemény"} backButton={false}></PageTitle>

            <TextBubble text="Ez az általam készített példa esemény."/>

            <View className="w-11/12 h-10 mx-auto felx flex-row gap-2 mt-3">
                <NewButton title="Új" destination={"/(screens)/NewCatalogScreen"}></NewButton>
            </View>

            <SeparatingLine/>

            <CatalogList event_id={event_id.toString()}/>

            <PadElement/>

        </ScrollView>
    )
}