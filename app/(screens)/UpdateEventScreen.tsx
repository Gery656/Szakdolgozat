import UpdateEventForm from "@/components/forms/updateEventForm";
import PageTitle from "@/components/ui/pageTitle";
import { Event } from "@/interfaces/types";
import { getEvents, getSelectedEvent } from "@/redux/applicationSlice";
import { View } from "react-native";
import { useSelector } from "react-redux";

export default function UpdateEventScreen()
{
    const event_id = useSelector(getSelectedEvent)
    const events = useSelector(getEvents);
    const event = events.find((event: Event) => event.id === event_id);

    return(
        <View className="min-w-full min-h-full">
            
            <PageTitle title={event.name} backButton={true}></PageTitle>

            <UpdateEventForm></UpdateEventForm>

        </View>
    )
}