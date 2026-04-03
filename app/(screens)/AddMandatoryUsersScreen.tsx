import EmailAddMandatoryUsersToEventForm from "@/components/forms/emailAddMandatoryUsersToEventForm";
import PadElement from "@/components/ui/padElement";
import PageTitle from "@/components/ui/pageTitle";
import { getAddMandatoryUserMethod } from "@/redux/applicationSlice";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { useSelector } from "react-redux";

export default function AddMandatoryUsersScreen(){
    const addMethod = useSelector(getAddMandatoryUserMethod);
    return(
        <KeyboardAvoidingView behavior="padding" className="min-w-full min-h-full">
            <ScrollView>
                <PageTitle title="Résztvevők" backButton={true}/>
                {addMethod==="email" && <EmailAddMandatoryUsersToEventForm />}
                <PadElement />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}