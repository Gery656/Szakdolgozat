import NewCatalogForm from "@/components/forms/newCatalogForm";
import PageTitle from "@/components/ui/pageTitle";
import { KeyboardAvoidingView, ScrollView } from "react-native";

export default function NewCatalogScreen() {

    return (
        <KeyboardAvoidingView className="min-w-full min-h-full" behavior="padding">
            <ScrollView className="min-w-full min-h-full">
                <PageTitle title="Új ellenőrzés" backButton={true}></PageTitle>
                <NewCatalogForm />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}