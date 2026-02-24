import EventCreationForm from "@/components/forms/eventCreationForm";
import PageTitle from "@/components/ui/pageTitle";
import { View } from "react-native";

export default function NewEventScreen()
{
    return(
        <View className="min-w-full min-h-full">
            
            <PageTitle title="Új esemény" backButton={true}></PageTitle>

            <EventCreationForm></EventCreationForm>

        </View>
    )
}