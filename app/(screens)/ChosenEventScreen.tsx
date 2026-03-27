import CatalogList from "@/components/lists/catalogList";
import NewButton from "@/components/ui/newButton";
import PadElement from "@/components/ui/padElement";
import PageTitle from "@/components/ui/pageTitle";
import SeparatingLine from "@/components/ui/separatingLine";
import TextBubble from "@/components/ui/textBubble";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";

export default function ChosenEventScreen(){
    const {event_id} = useLocalSearchParams();

    return(
        <ScrollView className="min-w-full min-h-full">
            
            <PageTitle title={event_id+". Példa esemény"} backButton={true}></PageTitle>

            <TextBubble text="Ez az általam készített példa esemény."/>

            <View className="w-11/12 h-10 mx-auto felx flex-row gap-2 mt-3">
                <NewButton title="Új" destination={{pathname:"/(screens)/NewCatalogScreen",params:{event_id:event_id}}}></NewButton>
            </View>

            <SeparatingLine/>

            <CatalogList event_id={event_id.toString()}/>

            <PadElement/>

        </ScrollView>
    )
}