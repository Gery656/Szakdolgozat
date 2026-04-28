import SignUpModeSelectForm from "@/components/forms/signUpModeSelectForm";
import PadElement from "@/components/ui/padElement";
import PageTitle from "@/components/ui/pageTitle";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ManualSignUpScreen(){
    return(
        <SafeAreaView>
            <ScrollView className="min-w-full min-h-full">
                <PageTitle title="Manuális jelentkezés" backButton={true} lowerTopMargin></PageTitle>

                <SignUpModeSelectForm />

                <PadElement></PadElement>
            </ScrollView>
        </SafeAreaView>
    )
}