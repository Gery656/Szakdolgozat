import MissingUserList from "@/components/lists/missingUserList";
import PageTitle from "@/components/ui/pageTitle";
import { KeyboardAvoidingView, ScrollView } from "react-native";

export default function MissingUsersScreen(){
    return(
        <ScrollView>
            <KeyboardAvoidingView behavior="padding">
                <PageTitle title="Hiányzók" backButton={true}></PageTitle>
                <MissingUserList></MissingUserList>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}