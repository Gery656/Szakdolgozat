import MandatoryUserList from "@/components/lists/mandatoryUserList";
import AddMethodChoice from "@/components/ui/addMethodChoice";
import PageTitle from "@/components/ui/pageTitle";
import SeparatingLine from "@/components/ui/separatingLine";
import { Event } from "@/interfaces/types";
import { getEvents, getSelectedEvent } from "@/redux/applicationSlice";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";

export default function MandatoryUsersScreen(){
    const event_id = useSelector(getSelectedEvent);
    const events = useSelector(getEvents);
    const event = events.find((event:Event)=>event.id===event_id);
    return(
        <ScrollView className="min-w-full min-h-full">
            <PageTitle title="Résztvevők" backButton={true}/>

            <AddMethodChoice />

            <SeparatingLine />

            <MandatoryUserList />

        </ScrollView>
    )
}