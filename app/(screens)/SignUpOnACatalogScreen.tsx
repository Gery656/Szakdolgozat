import SignUpModeSelectForm from "@/components/forms/signUpModeSelectForm";
import PageTitle from "@/components/pageTitle";
import { View } from "react-native";

export default function SignUpOnACatalogScreen(){
    return(
        <View className="min-w-full min-h-full">
            
            <PageTitle title="Jelentkezés" backButton={false}></PageTitle>

            <SignUpModeSelectForm />

        </View>
    )
}