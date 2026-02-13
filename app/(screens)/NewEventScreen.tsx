import EventCreationForm from "@/components/eventCreationForm";
import PageTitle from "@/components/pageTitle";
import StartSignUpSwitch from "@/components/startSignUpSwitch";
import { View } from "react-native";

export default function NewEventScreen()
{
    return(
        <>
        <View className="min-w-full min-h-full">
            
            <PageTitle title="Új esemény" backButton={true}></PageTitle>

            <EventCreationForm></EventCreationForm>


        </View>
        
        <StartSignUpSwitch isStartPage={true}></StartSignUpSwitch>
        </>
    )
}